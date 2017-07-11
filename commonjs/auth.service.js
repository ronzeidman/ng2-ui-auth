import {Injectable} from '@angular/core';
import {SharedService} from './shared.service';
import {LocalService} from './local.service';
import {OauthService} from './oauth.service';

var AuthService = (function () {
    function AuthService(shared, local, oauth) {
        this.shared = shared;
        this.local = local;
        this.oauth = oauth;
    }
    AuthService.prototype.login = function (user, opts) {
        return this.local.login(user, opts);
    };
    AuthService.prototype.signup = function (user, opts) {
        return this.local.signup(user, opts);
    };
    AuthService.prototype.logout = function () {
        return this.shared.logout();
    };
    AuthService.prototype.authenticate = function (name, userData) {
        return this.oauth.authenticate(name, userData);
    };
    AuthService.prototype.link = function (name, userData) {
        return this.oauth.authenticate(name, userData);
    };
    AuthService.prototype.unlink = function (provider, opts) {
        return this.oauth.unlink(provider, opts);
    };
    AuthService.prototype.isAuthenticated = function () {
        return this.shared.isAuthenticated();
    };
    AuthService.prototype.getToken = function () {
        return this.shared.getToken();
    };
    AuthService.prototype.setToken = function (token) {
        this.shared.setToken(token);
    };
    AuthService.prototype.removeToken = function () {
        this.shared.removeToken();
    };
    AuthService.prototype.getPayload = function () {
        return this.shared.getPayload();
    };
    AuthService.prototype.setStorageType = function (type) {
        this.shared.setStorageType(type);
    };
    AuthService.prototype.getExpirationDate = function () {
        return this.shared.getExpirationDate();
    };
    AuthService.decorators = [
        { type: Injectable },
    ];
    AuthService.ctorParameters = function () { return [
        { type: SharedService, },
        { type: LocalService, },
        { type: OauthService, },
    ]; };
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map