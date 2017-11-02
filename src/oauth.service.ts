import { Injectable, Provider, ReflectiveInjector } from '@angular/core';
import { Oauth1Service } from './oauth1.service';
import { Oauth2Service } from './oauth2.service';
import { SharedService } from './shared.service';
import { joinUrl } from './utils';
import { ConfigService, IOauth1Options } from './config.service';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';

/**
 * Created by Ron on 17/12/2015.
 */

@Injectable()
export class OauthService {
    constructor(
        private http: HttpClient,
        private shared: SharedService,
        private config: ConfigService) { }
    authenticate<T>(name: string, userData?: any): Observable<T> {
        const provider: { open<T>(options?: any, userData?: any): Observable<T> } = this.config.providers[name].oauthType === '1.0'
            ? ReflectiveInjector.resolveAndCreate([Oauth1Service]).get(Oauth1Service)
            : ReflectiveInjector.resolveAndCreate([Oauth2Service]).get(Oauth2Service);
        return provider.open<T>(this.config.providers[name], userData || {})
            .pipe(tap(response => {
                // this is for a scenario when someone wishes to opt out from
                // satellizer's magic by doing authorization code exchange and
                // saving a token manually.
                if (this.config.providers[name].url) {
                    this.shared.setToken(response);
                }
            }));
    }
    unlink<T>(provider: string, url = joinUrl(this.config.baseUrl, this.config.unlinkUrl), method = 'POST') {
        return this.http.request<T>(method, url, { body: { provider } });
    }
}
