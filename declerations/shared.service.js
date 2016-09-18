"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Observable_1 = require('rxjs/Observable');
var core_1 = require('@angular/core');
var config_service_1 = require('./config.service');
var storage_service_1 = require('./storage.service');
var SharedService = (function () {
    function SharedService(storage, config) {
        this.storage = storage;
        this.config = config;
        this.tokenName = this.config.tokenPrefix ? [this.config.tokenPrefix, this.config.tokenName].join(this.config.tokenSeparator) : this.config.tokenName;
    }
    SharedService.prototype.getToken = function () {
        return this.storage.get(this.tokenName);
    };
    SharedService.prototype.getPayload = function () {
        var token = this.getToken();
        if (token && token.split('.').length === 3) {
            try {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(decodeURIComponent(encodeURIComponent(window.atob(base64))));
            }
            catch (e) {
                return undefined;
            }
        }
    };
    SharedService.prototype.setToken = function (response) {
        if (!response) {
            console.warn('Can\'t set token without passing a value');
            return;
        }
        var token;
        if (typeof response === 'string') {
            token = response;
        }
        else {
            var accessToken = response && response.json() && (response.json().access_token || response.json().token);
            var tokenObject = void 0;
            if (accessToken) {
                if (typeof accessToken === 'object' && typeof accessToken.data === 'object') {
                    tokenObject = accessToken;
                }
                else if (typeof accessToken === 'string') {
                    token = accessToken;
                }
            }
            if (!token && tokenObject) {
                var tokenRootData = this.config.tokenRoot &&
                    this.config.tokenRoot.split('.').reduce(function (o, x) {
                        return o[x];
                    }, tokenObject.data);
                token = tokenRootData ? tokenRootData[this.config.tokenName] : tokenObject.data[this.config.tokenName];
            }
            if (!token) {
                var tokenPath = this.config.tokenRoot ? this.config.tokenRoot + '.' + this.config.tokenName : this.config.tokenName;
                console.warn('Expecting a token named "' + tokenPath);
                return;
            }
        }
        this.storage.set(this.tokenName, token);
    };
    SharedService.prototype.removeToken = function () {
        this.storage.remove(this.tokenName);
    };
    SharedService.prototype.isAuthenticated = function () {
        var token = this.getToken();
        if (token) {
            if (token.split('.').length === 3) {
                try {
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    var exp = JSON.parse(window.atob(base64)).exp;
                    if (exp) {
                        var isExpired = Math.round(new Date().getTime() / 1000) >= exp;
                        if (isExpired) {
                            this.storage.remove(this.tokenName);
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                }
                catch (e) {
                    return true;
                }
            }
            return true;
        }
        return false;
    };
    SharedService.prototype.getExpirationDate = function () {
        var payload = this.getPayload();
        if (payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
            var date = new Date(0);
            date.setUTCSeconds(payload.exp);
            return date;
        }
        return null;
    };
    SharedService.prototype.logout = function () {
        this.storage.remove(this.tokenName);
        return Observable_1.Observable.create(function (observer) {
            observer.next();
            observer.complete();
        });
    };
    SharedService.prototype.setStorageType = function (type) {
        this.config.storageType = type;
    };
    SharedService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [storage_service_1.StorageService, config_service_1.ConfigService])
    ], SharedService);
    return SharedService;
}());
exports.SharedService = SharedService;
//# sourceMappingURL=shared.service.js.map