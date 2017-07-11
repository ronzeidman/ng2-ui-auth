import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import {ConfigService} from './config.service';
import {StorageService} from './storage.service';

export declare class SharedService {
    private storage;
    private config;
    tokenName: string;
    constructor(storage: StorageService, config: ConfigService);
    getToken(): string;
    getPayload(token?: string): any;
    setToken(response: string | Response | Object): void;
    removeToken(): void;
    isAuthenticated(token?: string): boolean;
    getExpirationDate(token?: string): Date;
    logout(): Observable<any>;
    setStorageType(type: 'localStorage' | 'sessionStorage' | 'cookie' | 'sessionCookie'): void;
}
