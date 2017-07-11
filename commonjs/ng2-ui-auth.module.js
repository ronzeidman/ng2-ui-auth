import {ConfigService, CustomConfig} from './config.service';
import {SharedService} from './shared.service';
import {JwtHttp} from './jwt-http.service';
import {OauthService} from './oauth.service';
import {PopupService} from './popup.service';
import {Oauth1Service} from './oauth1.service';
import {Oauth2Service} from './oauth2.service';
import {LocalService} from './local.service';
import {AuthService} from './auth.service';
import {BrowserStorageService, StorageService} from './storage.service';
import {Injector, NgModule} from '@angular/core';
import {Http, HttpModule} from '@angular/http';

var Ng2UiAuthModule = (function () {
    function Ng2UiAuthModule() {
    }
    Ng2UiAuthModule.forRootWithCustomHttp = function (config, httpProvider) {
        return {
            ngModule: Ng2UiAuthModule,
            providers: [
                { provide: CustomConfig, useClass: config },
                { provide: ConfigService, useClass: ConfigService, deps: [CustomConfig] },
                { provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService] },
                { provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService] },
                httpProvider,
                { provide: OauthService, useClass: OauthService, deps: [JwtHttp, Injector, SharedService, ConfigService] },
                { provide: PopupService, useClass: PopupService, deps: [ConfigService] },
                { provide: Oauth1Service, useClass: Oauth1Service, deps: [JwtHttp, PopupService, ConfigService] },
                { provide: Oauth2Service, useClass: Oauth2Service, deps: [JwtHttp, PopupService, StorageService, ConfigService] },
                { provide: LocalService, useClass: LocalService, deps: [JwtHttp, SharedService, ConfigService] },
                { provide: AuthService, useClass: AuthService, deps: [SharedService, LocalService, OauthService] },
            ]
        };
    };
    Ng2UiAuthModule.forRoot = function (config) {
        return {
            ngModule: Ng2UiAuthModule,
            providers: [
                { provide: CustomConfig, useClass: config },
                { provide: ConfigService, useClass: ConfigService, deps: [CustomConfig] },
                { provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService] },
                { provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService] },
                { provide: JwtHttp, useClass: JwtHttp, deps: [Http, SharedService, ConfigService] },
                { provide: OauthService, useClass: OauthService, deps: [JwtHttp, Injector, SharedService, ConfigService] },
                { provide: PopupService, useClass: PopupService, deps: [ConfigService] },
                { provide: Oauth1Service, useClass: Oauth1Service, deps: [JwtHttp, PopupService, ConfigService] },
                { provide: Oauth2Service, useClass: Oauth2Service, deps: [JwtHttp, PopupService, StorageService, ConfigService] },
                { provide: LocalService, useClass: LocalService, deps: [JwtHttp, SharedService, ConfigService] },
                { provide: AuthService, useClass: AuthService, deps: [SharedService, LocalService, OauthService] },
            ]
        };
    };
    Ng2UiAuthModule.decorators = [
        { type: NgModule, args: [{
                    imports: [HttpModule]
                },] },
    ];
    Ng2UiAuthModule.ctorParameters = function () { return []; };
    return Ng2UiAuthModule;
}());
export { Ng2UiAuthModule };
export { LocalService, Oauth2Service, Oauth1Service, PopupService, OauthService, JwtHttp, SharedService, StorageService, BrowserStorageService, AuthService, ConfigService, CustomConfig };
//# sourceMappingURL=ng2-ui-auth.module.js.map