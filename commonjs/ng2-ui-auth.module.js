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
var config_service_1 = require('./config.service');
var shared_service_1 = require('./shared.service');
var jwt_http_service_1 = require('./jwt-http.service');
var oauth_service_1 = require('./oauth.service');
var popup_service_1 = require('./popup.service');
var oauth1_service_1 = require('./oauth1.service');
var oauth2_service_1 = require('./oauth2.service');
var local_service_1 = require('./local.service');
var auth_service_1 = require('./auth.service');
var storage_service_1 = require('./storage.service');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var local_service_2 = require('./local.service');
exports.LocalService = local_service_2.LocalService;
var oauth2_service_2 = require('./oauth2.service');
exports.Oauth2Service = oauth2_service_2.Oauth2Service;
var oauth1_service_2 = require('./oauth1.service');
exports.Oauth1Service = oauth1_service_2.Oauth1Service;
var popup_service_2 = require('./popup.service');
exports.PopupService = popup_service_2.PopupService;
var oauth_service_2 = require('./oauth.service');
exports.OauthService = oauth_service_2.OauthService;
var jwt_http_service_2 = require('./jwt-http.service');
exports.JwtHttp = jwt_http_service_2.JwtHttp;
var shared_service_2 = require('./shared.service');
exports.SharedService = shared_service_2.SharedService;
var storage_service_2 = require('./storage.service');
exports.StorageService = storage_service_2.StorageService;
var auth_service_2 = require('./auth.service');
exports.AuthService = auth_service_2.AuthService;
var config_service_2 = require('./config.service');
exports.ConfigService = config_service_2.ConfigService;
exports.CustomConfig = config_service_2.CustomConfig;
var Ng2UiAuthModule = (function () {
    function Ng2UiAuthModule() {
    }
    Ng2UiAuthModule.forRoot = function (config, httpProvider) {
        if (httpProvider === void 0) { httpProvider = {
            provide: jwt_http_service_1.JwtHttp, useClass: jwt_http_service_1.JwtHttp, deps: [http_1.Http, shared_service_1.SharedService, config_service_1.ConfigService]
        }; }
        return {
            ngModule: Ng2UiAuthModule,
            providers: [
                { provide: config_service_1.CustomConfig, useClass: config },
                { provide: config_service_1.ConfigService, useClass: config_service_1.ConfigService, deps: [config_service_1.CustomConfig] },
                { provide: storage_service_1.StorageService, useClass: storage_service_1.StorageService, deps: [config_service_1.ConfigService] },
                { provide: shared_service_1.SharedService, useClass: shared_service_1.SharedService, deps: [storage_service_1.StorageService, config_service_1.ConfigService] },
                httpProvider,
                { provide: oauth_service_1.OauthService, useClass: oauth_service_1.OauthService, deps: [jwt_http_service_1.JwtHttp, core_1.Injector, shared_service_1.SharedService, config_service_1.ConfigService] },
                { provide: popup_service_1.PopupService, useClass: popup_service_1.PopupService, deps: [config_service_1.ConfigService] },
                { provide: oauth1_service_1.Oauth1Service, useClass: oauth1_service_1.Oauth1Service, deps: [jwt_http_service_1.JwtHttp, popup_service_1.PopupService, config_service_1.ConfigService] },
                { provide: oauth2_service_1.Oauth2Service, useClass: oauth2_service_1.Oauth2Service, deps: [jwt_http_service_1.JwtHttp, popup_service_1.PopupService, storage_service_1.StorageService, config_service_1.ConfigService] },
                { provide: local_service_1.LocalService, useClass: local_service_1.LocalService, deps: [jwt_http_service_1.JwtHttp, shared_service_1.SharedService, config_service_1.ConfigService] },
                { provide: auth_service_1.AuthService, useClass: auth_service_1.AuthService, deps: [shared_service_1.SharedService, local_service_1.LocalService, oauth_service_1.OauthService] },]
        };
    };
    Ng2UiAuthModule = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpModule]
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2UiAuthModule);
    return Ng2UiAuthModule;
}());
exports.Ng2UiAuthModule = Ng2UiAuthModule;
//# sourceMappingURL=ng2-ui-auth.module.js.map