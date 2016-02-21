import { Observable } from 'rxjs/Observable';
import { Response } from 'angular2/http';
import { Config } from './config';
import { Storage } from './storage';
export declare class Shared {
    private storage;
    private config;
    tokenName: string;
    constructor(storage: Storage, config: Config);
    getToken(): any;
    getPayload(): any;
    setToken(response: string | Response): void;
    removeToken(): void;
    isAuthenticated(): boolean;
    getExpirationDate(): Date;
    logout(): Observable<any>;
    setStorageType(type: any): void;
}
