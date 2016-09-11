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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var shared_1 = require('./shared');
var local_1 = require('./local');
var oauth_1 = require('./oauth');
var popup_1 = require('./popup');
var oauth2_1 = require('./oauth2');
var oauth1_1 = require('./oauth1');
var storage_1 = require('./storage');
var config_1 = require('./config');
var jwtHttp_1 = require('./jwtHttp');
function NG2_UI_AUTH_PROVIDERS(config) {
    return [{ provide: config_1.Config, useFactory: function () { return new config_1.Config(config); } },
        { provide: storage_1.Storage, useFactory: function (providedConfig) { return new storage_1.Storage(providedConfig); }, deps: [config_1.Config] },
        { provide: shared_1.Shared, useFactory: function (storage, providedConfig) { return new shared_1.Shared(storage, providedConfig); }, deps: [storage_1.Storage, config_1.Config] },
        { provide: jwtHttp_1.JwtHttp, useFactory: function (xhrBackend, requestOptions, shared, config, router) { return new jwtHttp_1.JwtHttp(xhrBackend, requestOptions, shared, config); }, deps: [http_1.XHRBackend, http_1.RequestOptions, shared_1.Shared, config_1.Config] },
        { provide: oauth_1.Oauth, useFactory: function (http, injector, shared, providedConfig) { return new oauth_1.Oauth(http, injector, shared, providedConfig); }, deps: [jwtHttp_1.JwtHttp, core_1.Injector, shared_1.Shared, config_1.Config] },
        { provide: popup_1.Popup, useFactory: function (providedConfig) { return new popup_1.Popup(providedConfig); }, deps: [config_1.Config] },
        { provide: oauth1_1.Oauth1, useFactory: function (http, popup, providedConfig) { return new oauth1_1.Oauth1(http, popup, providedConfig); }, deps: [jwtHttp_1.JwtHttp, popup_1.Popup, config_1.Config] },
        { provide: oauth2_1.Oauth2, useFactory: function (http, popup, storage, providedConfig) { return new oauth2_1.Oauth2(http, popup, storage, providedConfig); }, deps: [jwtHttp_1.JwtHttp, popup_1.Popup, storage_1.Storage, config_1.Config] },
        { provide: local_1.Local, useFactory: function (http, shared, providedConfig) { return new local_1.Local(http, shared, providedConfig); }, deps: [jwtHttp_1.JwtHttp, shared_1.Shared, config_1.Config] },
        { provide: Auth, useFactory: function (shared, local, oauth) { return new Auth(shared, local, oauth); }, deps: [shared_1.Shared, local_1.Local, oauth_1.Oauth] },
    ];
}
exports.NG2_UI_AUTH_PROVIDERS = NG2_UI_AUTH_PROVIDERS;
var Auth = (function () {
    function Auth(shared, local, oauth) {
        this.shared = shared;
        this.local = local;
        this.oauth = oauth;
    }
    Auth.prototype.login = function (user, opts) {
        return this.local.login(user, opts);
    };
    Auth.prototype.signup = function (user, opts) {
        return this.local.signup(user, opts);
    };
    Auth.prototype.logout = function () {
        return this.shared.logout();
    };
    Auth.prototype.authenticate = function (name, userData) {
        return this.oauth.authenticate(name, userData);
    };
    Auth.prototype.link = function (name, userData) {
        return this.oauth.authenticate(name, userData);
    };
    Auth.prototype.unlink = function (provider, opts) {
        return this.oauth.unlink(provider, opts);
    };
    Auth.prototype.isAuthenticated = function () {
        return this.shared.isAuthenticated();
    };
    Auth.prototype.getToken = function () {
        return this.shared.getToken();
    };
    Auth.prototype.setToken = function (token) {
        this.shared.setToken(token);
    };
    Auth.prototype.removeToken = function () {
        this.shared.removeToken();
    };
    Auth.prototype.getPayload = function () {
        return this.shared.getPayload();
    };
    Auth.prototype.setStorageType = function (type) {
        this.shared.setStorageType(type);
    };
    Auth.prototype.getExpirationDate = function () {
        return this.shared.getExpirationDate();
    };
    Auth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [shared_1.Shared, local_1.Local, oauth_1.Oauth])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map