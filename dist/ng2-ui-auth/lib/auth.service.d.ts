import { Observable } from 'rxjs';
import { LocalService } from './local.service';
import { OauthService } from './oauth.service';
import { SharedService } from './shared.service';
import { StorageType } from './storage-type.enum';
export declare class AuthService {
    private shared;
    private local;
    private oauth;
    constructor(shared: SharedService, local: LocalService, oauth: OauthService);
    login<T extends string | object = any>(user: string | object, url?: string): Observable<T>;
    signup<T = any>(user: string | object, url?: string): Observable<T>;
    logout(): Observable<void>;
    authenticate<T extends object | string = any>(name: string, userData?: any): Observable<T>;
    link<T extends object | string = any>(name: string, userData?: any): Observable<T>;
    unlink<T = any>(provider: string, url?: string): Observable<T>;
    isAuthenticated(): boolean;
    getToken(): string | null;
    setToken(token: string | object): void;
    removeToken(): void;
    getPayload(): any;
    setStorageType(type: StorageType): boolean;
    getExpirationDate(): Date | null;
}
