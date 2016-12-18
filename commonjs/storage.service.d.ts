import {ConfigService} from './config.service';
export declare class StorageService {
    private config;
    private store;
    private isStorageAvailable;
    constructor(config: ConfigService);
    get(key: string): any;
    set(key: string, value: string): any;
    remove(key: string): any;
}
