import { Response, RequestOptionsArgs } from '@angular/http';
import { Shared } from './shared';
import { Local } from './local';
import { Oauth } from './oauth';
import { Popup } from './popup';
import { Oauth2 } from './oauth2';
import { Oauth1 } from './oauth1';
import { Storage } from './storage';
import { ICustomConfig, Config } from './config';
import { Observable } from 'rxjs/Observable';
import { JwtHttp } from './jwtHttp';
export declare const NG2_UI_AUTH_PROVIDERS: (config: ICustomConfig) => ({
    provide: typeof Config;
    useValue: Config;
} | typeof Storage | typeof Shared | typeof JwtHttp | typeof Oauth | typeof Popup | typeof Oauth1 | typeof Oauth2 | typeof Local | typeof Auth)[];
export declare class Auth {
    private shared;
    private local;
    private oauth;
    constructor(shared: Shared, local: Local, oauth: Oauth);
    login(user: any, opts?: RequestOptionsArgs): Observable<Response>;
    signup(user: any, opts?: RequestOptionsArgs): Observable<Response>;
    logout(): Observable<void>;
    authenticate(name: string, userData?: any): Observable<Response>;
    link(name: string, userData?: any): Observable<Response>;
    unlink(provider: string, opts: RequestOptionsArgs): Observable<Response>;
    isAuthenticated(): boolean;
    getToken(): string;
    setToken(token: string): void;
    removeToken(): void;
    getPayload(): any;
    setStorageType(type: string): void;
    getExpirationDate(): Date;
}
