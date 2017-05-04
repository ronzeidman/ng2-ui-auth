import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';

export abstract class StorageService {
    abstract get(key: string): string;
    abstract set(key: string, value: string): void;
    abstract remove(key: string): void;
}

/**
 * Created by Ron on 17/12/2015.
 */
@Injectable()
export class BrowserStorageService extends StorageService {
    private store = {};
    private isStorageAvailable: boolean;
    constructor(private config: ConfigService) {
        super();
        this.isStorageAvailable = this.checkIsStorageAvailable(config);
        if (!this.isStorageAvailable) {
            console.warn(config.storageType + ' is not available.');
        }
    }
    get(key: string) {
        return this.isStorageAvailable ? window[this.config.storageType].getItem(key) : this.store[key];
    }
    set(key: string, value: string) {
        this.isStorageAvailable ? window[this.config.storageType].setItem(key, value) : this.store[key] = value;
    }
    remove(key: string) {
        this.isStorageAvailable ? window[this.config.storageType].removeItem(key) : delete this.store[key];
    }

    private checkIsStorageAvailable(config) {
        try {
            let supported = config.storageType in window && window[config.storageType] !== null;

            if (supported) {
                let key = Math.random().toString(36).substring(7);
                (<any>window[this.config.storageType]).setItem(key, '');
                (<any>window[this.config.storageType]).removeItem(key);
            }

            return supported;
        } catch (e) {
            return false;
        }
    }
}
