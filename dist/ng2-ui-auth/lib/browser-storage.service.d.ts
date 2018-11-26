import { StorageService } from './storage-service';
import { StorageType } from './storage-type.enum';
import { ConfigService } from './config.service';
export declare class BrowserStorageService extends StorageService {
    private config;
    private store;
    private storageType;
    constructor(config: ConfigService);
    updateStorageType(storageType: StorageType): boolean;
    get(key: string): string;
    set(key: string, value: string, date: string): void;
    remove(key: string): void;
    private checkIsStorageAvailable;
    private isWindowStorageAvailable;
    private isCookieStorageAvailable;
    private setCookie;
    private removeCookie;
    private getCookie;
}
