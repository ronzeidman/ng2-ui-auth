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
import {ModuleWithProviders, Type} from '@angular/core';

export declare class Ng2UiAuthModule {
    static forRootWithCustomHttp(config: Type<CustomConfig>, httpProvider: any): ModuleWithProviders;
    static forRoot(config: Type<CustomConfig>): ModuleWithProviders;
}
export { LocalService, Oauth2Service, Oauth1Service, PopupService, OauthService, JwtHttp, SharedService, StorageService, BrowserStorageService, AuthService, ConfigService, CustomConfig };
