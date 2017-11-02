/**
 * Created by Ron on 25/12/2015.
 */
import { CustomConfig, ConfigService } from './config.service';
import { SharedService } from './shared.service';
import { OauthService } from './oauth.service';
import { PopupService } from './popup.service';
import { Oauth1Service } from './oauth1.service';
import { Oauth2Service } from './oauth2.service';
import { LocalService } from './local.service';
import { AuthService } from './auth.service';
import { JwtInterceptor } from './interceptor.service';
import { StorageService, BrowserStorageService } from './storage.service';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({})
export class Ng2UiAuthModule {
    static forRoot(config: Type<CustomConfig>): ModuleWithProviders {
        return {
            ngModule: Ng2UiAuthModule,
            providers: [
                HttpClientModule,
                { provide: CustomConfig, useClass: config },
                { provide: ConfigService, useClass: ConfigService, deps: [CustomConfig] },
                { provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService] },
                { provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService] },
                { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                { provide: OauthService, useClass: OauthService, deps: [SharedService, ConfigService] },
                { provide: PopupService, useClass: PopupService, deps: [ConfigService] },
                { provide: Oauth1Service, useClass: Oauth1Service, deps: [PopupService, ConfigService] },
                { provide: Oauth2Service, useClass: Oauth2Service, deps: [PopupService, StorageService, ConfigService] },
                { provide: LocalService, useClass: LocalService, deps: [SharedService, ConfigService] },
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
    ConfigService, CustomConfig,
    JwtInterceptor,
};