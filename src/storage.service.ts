import { Injectable } from '@angular/core';
import { ConfigService, IConfigOptions } from './config.service';

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
    private store: { [key: string]: string } = {};
    private isStorageAvailable: boolean;

    constructor(private config: ConfigService) {
        super();
        this.isStorageAvailable = this.checkIsStorageAvailable(config.options);
        if (!this.isStorageAvailable) {
            console.warn(config.options.storageType + ' is not available.');
        }
    }

    public get(key: string) {
        return this.config.options.storageType === 'none'
            ? null
            : this.isStorageAvailable
                ? this.config.options.storageType === 'cookie' || this.config.options.storageType === 'sessionCookie'
                    ? this.getCookie(key)
                    : window[this.config.options.storageType].getItem(key)
                : this.store[key];
    }

    public set(key: string, value: string, date: string) {
        if (this.config.options.storageType === 'none') {
            return;
        }
        this.isStorageAvailable
            ? this.config.options.storageType === 'cookie' || this.config.options.storageType === 'sessionCookie'
                ? this.setCookie(key, value, this.config.options.storageType === 'cookie' ? date : '')
                : window[this.config.options.storageType].setItem(key, value)
            : this.store[key] = value;
    }

    public remove(key: string) {
        if (this.config.options.storageType === 'none') {
            return;
        }
        this.isStorageAvailable
            ? this.config.options.storageType === 'cookie' || this.config.options.storageType === 'sessionCookie'
                ? this.removeCookie(key)
                : window[this.config.options.storageType].removeItem(key)
            : delete this.store[key];
    }

    private checkIsStorageAvailable(options: IConfigOptions) {
        if (options.storageType === 'none') {
            return true;
        }
        if (options.storageType === 'cookie' || options.storageType === 'sessionCookie') {
            return this.isCookieStorageAvailable();
        }
        try {
            const supported = window && options.storageType in window && window[options.storageType] !== null;

            if (supported) {
                const key = Math.random().toString(36).substring(7);
                window[options.storageType].setItem(key, '');
                window[options.storageType].removeItem(key);
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
