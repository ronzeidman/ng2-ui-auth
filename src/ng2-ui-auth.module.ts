/**
 * Created by Ron on 25/12/2015.
 */
import { ConfigService, IPartialConfigOptions, CONFIG_OPTIONS, IProviders } from './config.service';
import { SharedService } from './shared.service';
import { OauthService } from './oauth.service';
import { PopupService } from './popup.service';
import { Oauth1Service } from './oauth1.service';
import { Oauth2Service } from './oauth2.service';
import { LocalService } from './local.service';
import { AuthService } from './auth.service';
import { JwtInterceptor } from './interceptor.service';
import { StorageService, BrowserStorageService } from './storage.service';
import { InjectionToken, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { StorageType } from './storage-type.enum';

@NgModule({ imports: [HttpClientModule] })
export class Ng2UiAuthModule {
    static forRoot(configOptions?: IPartialConfigOptions, defaultJwtInterceptor = true): ModuleWithProviders {
        return {
            ngModule: Ng2UiAuthModule,
            providers: [
                ...configOptions ? [{ provide: CONFIG_OPTIONS, useValue: configOptions }] : [],
                { provide: ConfigService, useClass: ConfigService, deps: [CONFIG_OPTIONS] },
                { provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService] },
                { provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService] },
                ...defaultJwtInterceptor ? [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, deps: [SharedService, ConfigService] }] : [],
                { provide: OauthService, useClass: OauthService, deps: [HttpClient, SharedService, ConfigService, PopupService] },
                { provide: PopupService, useClass: PopupService, deps: [ConfigService] },
                { provide: LocalService, useClass: LocalService, deps: [HttpClient, SharedService, ConfigService] },
                { provide: AuthService, useClass: AuthService, deps: [SharedService, LocalService, OauthService] },
            ],
        };
    }
}

export {
    LocalService,
    Oauth2Service,
    Oauth1Service,
    PopupService,
    OauthService,
    SharedService,
    StorageService, BrowserStorageService,
    AuthService,
    ConfigService, IPartialConfigOptions,
    JwtInterceptor,
    CONFIG_OPTIONS,
    IProviders,
    StorageType,
};