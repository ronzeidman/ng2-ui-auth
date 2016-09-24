import { Response, RequestOptionsArgs } from '@angular/http';
import { SharedService } from './shared.service';
import { LocalService } from './local.service';
import { OauthService } from './oauth.service';
import { Observable } from 'rxjs/Observable';
export declare class AuthService {
    private shared;
    private local;
    private oauth;
    constructor(shared: SharedService, local: LocalService, oauth: OauthService);
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
