import {Injectable, Injector} from '@angular/core';
import {Response, RequestOptionsArgs, XHRBackend, RequestOptions} from '@angular/http';
import {Shared} from './shared';
import {Local} from './local';
import {Oauth} from './oauth';
import {Popup} from './popup';
import {Oauth2} from './oauth2';
import {Oauth1} from './oauth1';
import {Storage} from './storage';
import {ICustomConfig, Config} from './config';
import {Observable} from 'rxjs/Observable';
import {JwtHttp} from './jwtHttp';

/**
 * Created by Ron on 17/12/2015.
 */

export function NG2_UI_AUTH_PROVIDERS(config: ICustomConfig): Array<any> {
    return [{provide: Config, useFactory: () => { return new Config(config);}},
            {provide: Storage, useFactory: (providedConfig) => { return new Storage(providedConfig);}, deps: [Config]},
            {provide: Shared,  useFactory: (storage, providedConfig) => { return new Shared(storage, providedConfig);}, deps: [Storage, Config]},
            {provide: JwtHttp, useFactory: (xhrBackend, requestOptions, shared, config, router) => new JwtHttp(xhrBackend, requestOptions, shared, config), deps: [XHRBackend, RequestOptions, Shared, Config]},
            {provide: Oauth,  useFactory: (http, injector, shared, providedConfig) => { return new Oauth(http, injector, shared, providedConfig);}, deps: [JwtHttp, Injector, Shared, Config]} ,
            {provide: Popup,  useFactory: (providedConfig) => { return new Popup(providedConfig);}, deps: [Config]},
            {provide: Oauth1,  useFactory: (http, popup, providedConfig) => { return new Oauth1(http, popup, providedConfig);}, deps: [JwtHttp, Popup, Config]} ,
            {provide: Oauth2,  useFactory: (http, popup, storage, providedConfig) => { return new Oauth2(http, popup, storage, providedConfig);}, deps: [JwtHttp, Popup, Storage, Config]} ,
            {provide: Local,  useFactory: (http, shared, providedConfig) => { return new Local(http, shared, providedConfig);}, deps: [JwtHttp, Shared, Config]} ,
            {provide: Auth,  useFactory: (shared, local, oauth) => { return new Auth(shared, local, oauth);}, deps: [Shared, Local, Oauth]} ,
        ];
}

@Injectable()
export class Auth {
    constructor(private shared: Shared,
                private local: Local,
                private oauth: Oauth) {}
    login(user, opts?: RequestOptionsArgs): Observable<Response> {
        return this.local.login(user, opts);
    }
    signup(user, opts?: RequestOptionsArgs): Observable<Response>  {
        return this.local.signup(user, opts);
    }
    logout(): Observable<void> {
        return this.shared.logout();
    }
    authenticate(name: string, userData?: any): Observable<Response> {
        return this.oauth.authenticate(name, userData);
    }
    link(name: string, userData?: any): Observable<Response> {
        return this.oauth.authenticate(name, userData);
    }
    unlink(provider: string, opts: RequestOptionsArgs): Observable<Response> {
        return this.oauth.unlink(provider, opts);
    }
    isAuthenticated(): boolean {
        return this.shared.isAuthenticated();
    }
    getToken(): string {
        return this.shared.getToken();
    }
    setToken(token: string): void {
        this.shared.setToken(token);
    }
    removeToken(): void {
        this.shared.removeToken();
    }
    getPayload(): any {
        return this.shared.getPayload();
    }
    setStorageType(type: string): void {
        this.shared.setStorageType(type);
    }
    getExpirationDate(): Date {
        return this.shared.getExpirationDate();
    }
}
