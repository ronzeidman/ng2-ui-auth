import { Config } from './config';
export declare class Storage {
    private config;
    private store;
    private isStorageAvailable;
    constructor(config: Config);
    get(key: string): any;
    set(key: string, value: string): any;
    remove(key: string): any;
}
