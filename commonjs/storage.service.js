var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';

var StorageService = (function () {
    function StorageService() {
    }
    return StorageService;
}());
export { StorageService };
var BrowserStorageService = (function (_super) {
    __extends(BrowserStorageService, _super);
    function BrowserStorageService(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.store = {};
        _this.isStorageAvailable = _this.checkIsStorageAvailable(config);
        if (!_this.isStorageAvailable) {
            console.warn(config.storageType + ' is not available.');
        }
        return _this;
    }
    BrowserStorageService.prototype.get = function (key) {
        return this.isStorageAvailable
            ? this.config.storageType === 'cookie' || this.config.storageType === 'sessionCookie'
                ? this.getCookie(key)
                : window[this.config.storageType].getItem(key)
            : this.store[key];
    };
    BrowserStorageService.prototype.set = function (key, value, date) {
        this.isStorageAvailable
            ? this.config.storageType === 'cookie' || this.config.storageType === 'sessionCookie'
                ? this.setCookie(key, value, this.config.storageType === 'cookie' ? date : '')
                : window[this.config.storageType].setItem(key, value)
            : this.store[key] = value;
    };
    BrowserStorageService.prototype.remove = function (key) {
        this.isStorageAvailable
            ? this.config.storageType === 'cookie' || this.config.storageType === 'sessionCookie'
                ? this.removeCookie(key)
                : window[this.config.storageType].removeItem(key)
            : delete this.store[key];
    };
    BrowserStorageService.prototype.checkIsStorageAvailable = function (config) {
        if (config.storageType === 'cookie' || config.storageType === 'sessionCookie') {
            return this.isCookieStorageAvailable();
        }
        try {
            var supported = window && config.storageType in window && window[config.storageType] !== null;
            if (supported) {
                var key = Math.random().toString(36).substring(7);
                window[this.config.storageType].setItem(key, '');
                window[this.config.storageType].removeItem(key);
            }
            return supported;
        }
        catch (e) {
            return false;
        }
    };
    BrowserStorageService.prototype.isCookieStorageAvailable = function () {
        try {
            var supported = document && 'cookie' in document;
            if (supported) {
                var key = Math.random().toString(36).substring(7);
                this.setCookie(key, 'test', new Date(Date.now() + 60 * 1000).toUTCString());
                var value = this.getCookie(key);
                this.removeCookie(key);
                return value === 'test';
            }
            return false;
        }
        catch (e) {
            return false;
        }
    };
    BrowserStorageService.prototype.setCookie = function (key, value, expires, path) {
        if (expires === void 0) { expires = ''; }
        if (path === void 0) { path = '/'; }
        document.cookie = key + "=" + value + (expires ? "; expires=" + expires : '') + "; path=" + path;
    };
    BrowserStorageService.prototype.removeCookie = function (key, path) {
        if (path === void 0) { path = '/'; }
        this.setCookie(key, '', new Date(0).toUTCString(), path);
    };
    BrowserStorageService.prototype.getCookie = function (key) {
        return document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$"), '$1');
    };
    BrowserStorageService.decorators = [
        { type: Injectable },
    ];
    BrowserStorageService.ctorParameters = function () { return [
        { type: ConfigService, },
    ]; };
    return BrowserStorageService;
}(StorageService));
export { BrowserStorageService };
//# sourceMappingURL=storage.service.js.map