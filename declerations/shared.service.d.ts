import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import {ConfigService} from './config.service';
import {StorageService} from './storage.service';
export declare class SharedService {
    private storage;
    private config;
    tokenName: string;
    constructor(storage: StorageService, config: ConfigService);
    getToken(): any;
    getPayload(): any;
    setToken(response: string | Response): void;
    removeToken(): void;
    isAuthenticated(): boolean;
    getExpirationDate(): Date;
    logout(): Observable<any>;
    setStorageType(type: any): void;
}
