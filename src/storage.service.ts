import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';

export abstract class StorageService {
    abstract get(key: string): string;

    abstract set(key: string, value: string, date: string): void;

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
        return this.isStorageAvailable
            ? this.config.storageType === 'cookie' || this.config.storageType === 'sessionCookie'
                ? this.getCookie(key)
                : window[this.config.storageType].getItem(key)
            : this.store[key];
    }

    set(key: string, value: string, date: string) {
        this.isStorageAvailable
            ? this.config.storageType === 'cookie' || this.config.storageType === 'sessionCookie'
            ? this.setCookie(key, value, this.config.storageType === 'cookie' ? date : '')
            : window[this.config.storageType].setItem(key, value)
            : this.store[key] = value;
    }

    remove(key: string) {
        this.isStorageAvailable
            ? this.config.storageType === 'cookie' || this.config.storageType === 'sessionCookie'
            ? this.removeCookie(key)
            : window[this.config.storageType].removeItem(key)
            : delete this.store[key];
    }

    private checkIsStorageAvailable(config: ConfigService) {
        if (config.storageType === 'cookie' || config.storageType === 'sessionCookie') {
            return this.isCookieStorageAvailable();
        }
        try {
            const supported = window && config.storageType in window && window[config.storageType] !== null;

            if (supported) {
                const key = Math.random().toString(36).substring(7);
                window[this.config.storageType].setItem(key, '');
                window[this.config.storageType].removeItem(key);
            }

            return supported;
        } catch (e) {
            return false;
        }
    }

    private isCookieStorageAvailable() {
        try {
            const supported = document && 'cookie' in document;

            if (supported) {
                const key = Math.random().toString(36).substring(7);
                this.setCookie(key, 'test', new Date(Date.now() + 60 * 1000).toUTCString());
                const value = this.getCookie(key);
                this.removeCookie(key);
                return value === 'test';
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    private setCookie(key: string, value: string, expires = '', path = '/') {
        document.cookie = `${key}=${value}${expires ? `; expires=${expires}` : ''}; path=${path}`;
    }

    private removeCookie(key: string, path = '/') {
        this.setCookie(key, '', new Date(0).toUTCString(), path);
    }

    private getCookie(key: string) {
        return document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1');
    }
}
