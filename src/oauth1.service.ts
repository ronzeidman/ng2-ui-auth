import { IOauthService } from './oauth-service.interface';
import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';
import { joinUrl, buildQueryString } from './utils';
import { ConfigService, IOauth1Options } from './config.service';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

/**
 * Created by Ron on 17/12/2015.
 */
@Injectable()
export class Oauth1Service implements IOauthService {

    constructor(
        private http: HttpClient,
        private popup: PopupService,
        private config: ConfigService,
    ) { }

    open<T extends object | string = any>(oauthOptions: IOauth1Options, userData: object): Observable<T> {
        const serverUrl = this.config.options.baseUrl
            ? joinUrl(this.config.options.baseUrl, oauthOptions.url)
            : oauthOptions.url;

        return this.http.post<object>(serverUrl, oauthOptions).pipe(
            switchMap((authorizationData) => this.popup.open(
                [oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'),
                oauthOptions,
                this.config.options.cordova,
            ), (authorizationData, oauthData) => ({ authorizationData, oauthData })),
            switchMap(({ authorizationData, oauthData }) => this.exchangeForToken<T>(oauthOptions, authorizationData, oauthData, userData)),
        );
    }

    private exchangeForToken<T>(oauthOptions: IOauth1Options, authorizationData: object, oauthData: object, userData: object) {
        const body = { authorizationData, oauthData, userData };
        const { withCredentials, baseUrl } = this.config.options;
        const { method = 'POST', url } = oauthOptions;
        const exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
        return this.http.request<T>(method, exchangeForTokenUrl, { body, withCredentials })
    }
}
