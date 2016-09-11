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
var config_1 = require('./config');
var utils_1 = require('./utils');
require('rxjs/add/operator/do');
var jwtHttp_1 = require('./jwtHttp');
function getFullOpts(user, userOpts) {
    var opts = userOpts || {};
    if (user) {
        opts.body = typeof user === 'string' ? user : JSON.stringify(user);
    }
    opts.method = opts.method || 'POST';
    return opts;
}
var Local = (function () {
    function Local(http, shared, config) {
        this.http = http;
        this.shared = shared;
        this.config = config;
    }
    Local.prototype.login = function (user, opts) {
        var _this = this;
        var fullOpts = getFullOpts(user, opts);
        var url = fullOpts.url ? fullOpts.url : utils_1.joinUrl(this.config.baseUrl, this.config.loginUrl);
        return this.http.request(url, fullOpts)
            .do(function (response) { return _this.shared.setToken(response); });
    };
    Local.prototype.signup = function (user, opts) {
        var fullOpts = getFullOpts(user, opts);
        var url = fullOpts.url ? fullOpts.url : utils_1.joinUrl(this.config.baseUrl, this.config.signupUrl);
        return this.http.request(url, getFullOpts(user, fullOpts));
    };
    Local = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [jwtHttp_1.JwtHttp, shared_1.Shared, config_1.Config])
    ], Local);
    return Local;
}());
exports.Local = Local;
//# sourceMappingURL=local.js.map