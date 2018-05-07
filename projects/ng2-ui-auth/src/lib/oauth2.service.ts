import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopupService } from './popup.service';
import { ConfigService } from './config.service';
import { IOauth2Options } from './config-interfaces';
import { Observable, of } from 'rxjs';
import { buildQueryString, joinUrl, getWindowOrigin } from './utils';
import { switchMap } from 'rxjs/operators';
import { IOauthService } from './oauth-service';

@Injectable()
export class Oauth2Service implements IOauthService {
  constructor(private http: HttpClient, private popup: PopupService, private config: ConfigService) {}

  open<T extends object | string = any>(oauthOptions: IOauth2Options, userData: object): Observable<T> {
    const authorizationData = this.getAuthorizationData(oauthOptions);
    const url = [oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?');
    return this.popup.open(url, oauthOptions, this.config.options.cordova).pipe(
      switchMap((oauthData: any) => {
        // when no server URL provided, return popup params as-is.
        // this is for a scenario when someone wishes to opt out from
        // satellizer's magic by doing authorization code exchange and
        // saving a token manually.
        if (oauthOptions.responseType === 'token' || !oauthOptions.url) {
          return of(oauthData);
        }

        if (oauthData.state && oauthData.state !== authorizationData.state) {
          throw new Error('OAuth "state" mismatch');
        }
        return this.exchangeForToken<T>(oauthOptions, authorizationData, oauthData, userData);
      })
    );
  }

  private exchangeForToken<T>(options: IOauth2Options, authorizationData: object, oauthData: object, userData: object) {
    const body = { authorizationData, oauthData, userData };
    const { baseUrl, withCredentials } = this.config.options;
    const { url, method = 'POST' } = options;
    const exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
    return this.http.request<T>(method, exchangeForTokenUrl, { body, withCredentials });
  }

  private getAuthorizationData(options: IOauth2Options) {
    const {
      responseType = 'code',
      clientId,
      redirectUri = getWindowOrigin() || '',
      scopeDelimiter = ',',
      scope,
      state,
      additionalUrlParams
    } = options;
    const resolvedState = typeof state === 'function' ? state() : state;
    return [
      ['response_type', responseType],
      ['client_id', clientId],
      ['redirect_uri', redirectUri],
      ...(state ? [['state', resolvedState]] : []),
      ...(scope ? [['scope', scope.join(scopeDelimiter)]] : []),
      ...(additionalUrlParams
        ? Object.keys(additionalUrlParams).map(key => {
            const value: string | (() => string) | null | undefined = (additionalUrlParams as any)[key];
            if (typeof value === 'string') {
              return [key, value];
            } else if (typeof value === 'function') {
              return [key, value()];
            } else if (value === null) {
              return [key, ''];
            }
            return ['', ''];
          })
        : [])
    ]
      .filter(_ => !!_[0])
      .reduce((acc, next) => ({ ...acc, [next[0]]: next[1] }), {} as { [key: string]: string });
  }
}
