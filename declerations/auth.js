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
    return [{ provide: config_1.Config, useValue: new config_1.Config(config) },
        storage_1.Storage, shared_1.Shared, jwtHttp_1.JwtHttp, oauth_1.Oauth, popup_1.Popup, oauth1_1.Oauth1, oauth2_1.Oauth2, local_1.Local, Auth
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