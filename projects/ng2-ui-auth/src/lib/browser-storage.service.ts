import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { StorageType } from './storage-type.enum';
import { ConfigService } from './config.service';

@Injectable()
export class BrowserStorageService extends StorageService {
  private store: { [key: string]: string } = {};
  private storageType = StorageType.MEMORY;

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
      case StorageType.COOKIE:
      case StorageType.SESSION_COOKIE:
        return this.getCookie(key);
      case StorageType.LOCAL_STORAGE:
      case StorageType.SESSION_STORAGE:
        return window[this.storageType].getItem(key);
      case StorageType.MEMORY:
        return this.store[key];
      case StorageType.NONE:
      default:
        return null;
    }
  }

  public set(key: string, value: string, date: string) {
    switch (this.storageType) {
      case StorageType.COOKIE:
      case StorageType.SESSION_COOKIE:
        this.setCookie(key, value, this.storageType === StorageType.COOKIE ? date : '');
        break;
      case StorageType.LOCAL_STORAGE:
      case StorageType.SESSION_STORAGE:
        window[this.storageType].setItem(key, value);
        break;
      case StorageType.MEMORY:
        this.store[key] = value;
        break;
      case StorageType.NONE:
      default:
        break;
    }
  }

  public remove(key: string) {
    switch (this.storageType) {
      case StorageType.COOKIE:
      case StorageType.SESSION_COOKIE:
        this.removeCookie(key);
        break;
      case StorageType.LOCAL_STORAGE:
      case StorageType.SESSION_STORAGE:
        window[this.storageType].removeItem(key);
        break;
      case StorageType.MEMORY:
        delete this.store[key];
        break;
      case StorageType.NONE:
      default:
        break;
    }
  }

  private checkIsStorageAvailable(storageType: StorageType) {
    switch (storageType) {
      case StorageType.COOKIE:
      case StorageType.SESSION_COOKIE:
        return this.isCookieStorageAvailable();
      case StorageType.LOCAL_STORAGE:
      case StorageType.SESSION_STORAGE:
        return this.isWindowStorageAvailable(storageType);
      case StorageType.NONE:
      case StorageType.MEMORY:
        return true;
      default:
        return false;
    }
  }

  private isWindowStorageAvailable(storageType: StorageType.SESSION_STORAGE | StorageType.LOCAL_STORAGE) {
    try {
      const supported = window && storageType in window && window[storageType] !== null;

      if (supported) {
        const key = Math.random()
          .toString(36)
          .substring(7);
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
        const key = Math.random()
          .toString(36)
          .substring(7);
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
