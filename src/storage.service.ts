import { Injectable } from '@angular/core';
import { ConfigService, IConfigOptions } from './config.service';
import { StorageType, MEMMORY, COOKIE, SESSION_COOKIE, LOCAL_STORAGE, SESSION_STORAGE, NONE } from './storage-type.enum';

export abstract class StorageService {
    abstract updateStorageType(storageType: StorageType): boolean;

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
    private storageType: StorageType = MEMMORY;

    constructor(private config: ConfigService) {
        super();
        if (!this.updateStorageType(config.options.storageType)) {
            console.warn(config.options.storageType + ' is not available.');
        }
    }

    public updateStorageType(storageType: StorageType) {
        const isStorageAvailable = this.checkIsStorageAvailable(storageType);
        if (!isStorageAvailable) {
            return false;
        }
        this.storageType = storageType;
        return true;
    }

    public get(key: string) {
        switch (this.storageType) {
            case COOKIE:
            case SESSION_COOKIE:
                return this.getCookie(key);
            case LOCAL_STORAGE:
            case SESSION_STORAGE:
                return window[this.storageType].getItem(key);
            case MEMMORY:
                return this.store[key];
            case NONE:
            default:
                return null;
        }
    }

    public set(key: string, value: string, date: string) {
        switch (this.storageType) {
            case COOKIE:
            case SESSION_COOKIE:
                this.setCookie(key, value, this.storageType === COOKIE ? date : '');
                break;
            case LOCAL_STORAGE:
            case SESSION_STORAGE:
                window[this.storageType].setItem(key, value);
                break;
            case MEMMORY:
                this.store[key] = value;
                break;
            case NONE:
            default:
                break;
        }
    }

    public remove(key: string) {
        switch (this.storageType) {
            case COOKIE:
            case SESSION_COOKIE:
                this.removeCookie(key);
                break;
            case LOCAL_STORAGE:
            case SESSION_STORAGE:
                window[this.storageType].removeItem(key);
                break;
            case MEMMORY:
                delete this.store[key];
                break;
            case NONE:
            default:
                break;
        }
    }

    private checkIsStorageAvailable(storageType: StorageType) {
        switch (storageType) {
            case COOKIE:
            case SESSION_COOKIE:
                return this.isCookieStorageAvailable();
            case LOCAL_STORAGE:
            case SESSION_STORAGE:
                return this.isWindowStorageAvailable(storageType);
            case NONE:
            case MEMMORY:
                return true;
            default:
                return false;
        }
    }

    private isWindowStorageAvailable(storageType: typeof SESSION_STORAGE | typeof LOCAL_STORAGE) {
        try {
            const supported = window && storageType in window && window[storageType] !== null;

            if (supported) {
                const key = Math.random().toString(36).substring(7);
                window[storageType].setItem(key, '');
                window[storageType].removeItem(key);
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
