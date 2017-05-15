import {ConfigService} from './config.service';

export declare abstract class StorageService {
    abstract get(key: string): string;
    abstract set(key: string, value: string): void;
    abstract remove(key: string): void;
}
export declare class BrowserStorageService extends StorageService {
    private config;
    private store;
    private isStorageAvailable;
    constructor(config: ConfigService);
    get(key: string): any;
    set(key: string, value: string): void;
    remove(key: string): void;
    private checkIsStorageAvailable(config);
}
