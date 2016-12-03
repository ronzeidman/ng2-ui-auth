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
var oauth1_service_1 = require('./oauth1.service');
var oauth2_service_1 = require('./oauth2.service');
var shared_service_1 = require('./shared.service');
var utils_1 = require('./utils');
var config_service_1 = require('./config.service');
require('rxjs/add/operator/do');
var jwt_http_service_1 = require('./jwt-http.service');
var OauthService = (function () {
    function OauthService(http, injector, shared, config) {
        this.http = http;
        this.injector = injector;
        this.shared = shared;
        this.config = config;
    }
    OauthService.prototype.authenticate = function (name, userData) {
        var _this = this;
        var provider = this.config.providers[name].oauthType === '1.0' ? this.injector.get(oauth1_service_1.Oauth1Service) : this.injector.get(oauth2_service_1.Oauth2Service);
        return provider.open(this.config.providers[name], userData || {})
            .do(function (response) {
            if (_this.config.providers[name].url) {
                _this.shared.setToken(response);
            }
        });
    };
    OauthService.prototype.unlink = function (provider, opts) {
        opts = opts || {};
        var url = opts.url ? opts.url : utils_1.joinUrl(this.config.baseUrl, this.config.unlinkUrl);
        opts.body = JSON.stringify({ provider: provider }) || opts.body;
        opts.method = opts.method || 'POST';
        return this.http.request(url, opts);
    };
    OauthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [jwt_http_service_1.JwtHttp, core_1.Injector, shared_service_1.SharedService, config_service_1.ConfigService])
    ], OauthService);
    return OauthService;
}());
exports.OauthService = OauthService;
//# sourceMappingURL=oauth.service.js.map