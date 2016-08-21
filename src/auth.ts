import {Injectable} from '@angular/core';
import {Response, RequestOptionsArgs} from '@angular/http';
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
    return [{provide: Config, useValue: new Config(config)},
        Storage, Shared, JwtHttp, Oauth, Popup, Oauth1, Oauth2, Local, Auth
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
