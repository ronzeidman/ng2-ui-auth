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
var shared_service_1 = require('./shared.service');
var config_service_1 = require('./config.service');
var utils_1 = require('./utils');
require('rxjs/add/operator/do');
var jwt_http_service_1 = require('./jwt-http.service');
function getFullOpts(user, userOpts) {
    var opts = userOpts || {};
    if (user) {
        opts.body = typeof user === 'string' ? user : JSON.stringify(user);
    }
    opts.method = opts.method || 'POST';
    return opts;
}
var LocalService = (function () {
    function LocalService(http, shared, config) {
        this.http = http;
        this.shared = shared;
        this.config = config;
    }
    LocalService.prototype.login = function (user, opts) {
        var _this = this;
        var fullOpts = getFullOpts(user, opts);
        var url = fullOpts.url ? fullOpts.url : utils_1.joinUrl(this.config.baseUrl, this.config.loginUrl);
        return this.http.request(url, fullOpts)
            .do(function (response) { return _this.shared.setToken(response); });
    };
    LocalService.prototype.signup = function (user, opts) {
        var fullOpts = getFullOpts(user, opts);
        var url = fullOpts.url ? fullOpts.url : utils_1.joinUrl(this.config.baseUrl, this.config.signupUrl);
        return this.http.request(url, getFullOpts(user, fullOpts));
    };
    LocalService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [jwt_http_service_1.JwtHttp, shared_service_1.SharedService, config_service_1.ConfigService])
    ], LocalService);
    return LocalService;
}());
exports.LocalService = LocalService;
//# sourceMappingURL=local.service.js.map