System.register(['rxjs', 'angular2/core', './config', './storage'], function(exports_1) {
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
    var rxjs_1, core_1, config_1, storage_1;
    var Shared;
    return {
        setters:[
            function (rxjs_1_1) {
                rxjs_1 = rxjs_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (storage_1_1) {
                storage_1 = storage_1_1;
            }],
        execute: function() {
            Shared = (function () {
                function Shared(storage, config) {
                    this.storage = storage;
                    this.config = config;
                    this.tokenName = this.config.tokenPrefix ? [this.config.tokenPrefix, this.config.tokenName].join('_') : this.config.tokenName;
                }
                Shared.prototype.getToken = function () {
                    return this.storage.get(this.tokenName);
                };
                Shared.prototype.getPayload = function () {
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
                Shared.prototype.setToken = function (response) {
                    if (!response) {
                        return console.warn('Can\'t set token without passing a value');
                    }
                    var token;
                    if (typeof response === 'string') {
                        token = response;
                    }
                    else {
                        var accessToken = response && response.json() && (response.json().access_token || response.json().token);
                        var tokenObject;
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
                            return console.warn('Expecting a token named "' + tokenPath);
                        }
                    }
                    this.storage.set(this.tokenName, token);
                };
                Shared.prototype.removeToken = function () {
                    this.storage.remove(this.tokenName);
                };
                Shared.prototype.isAuthenticated = function () {
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
                Shared.prototype.getExpirationDate = function () {
                    var payload = this.getPayload();
                    if (payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
                        var date = new Date(0);
                        date.setUTCSeconds(payload.exp);
                        return date;
                    }
                    return null;
                };
                Shared.prototype.logout = function () {
                    this.storage.remove(this.tokenName);
                    return rxjs_1.Observable.create(function (observer) {
                        observer.next();
                        observer.complete();
                    });
                };
                Shared.prototype.setStorageType = function (type) {
                    this.config.storageType = type;
                };
                Shared = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [storage_1.Storage, config_1.Config])
                ], Shared);
                return Shared;
            }());
            exports_1("Shared", Shared);
        }
    }
});
//# sourceMappingURL=shared.js.map