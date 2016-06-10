import { Provider } from '@angular/core';
import { Response, RequestOptionsArgs } from '@angular/http';
import { Shared } from './shared';
import { Local } from './local';
import { Oauth } from './oauth';
import { ICustomConfig } from './config';
import { Observable } from 'rxjs/Observable';
export declare function NG2_UI_AUTH_PROVIDERS(config: ICustomConfig): Array<Provider>;
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
