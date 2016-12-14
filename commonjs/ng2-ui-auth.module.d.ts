import { CustomConfig, ConfigService } from './config.service';
import { SharedService } from './shared.service';
import { JwtHttp } from './jwt-http.service';
import { ModuleWithProviders } from '@angular/core';
import { Http } from '@angular/http';
import { Type } from '@angular/core/src/type';
export { LocalService } from './local.service';
export { Oauth2Service } from './oauth2.service';
export { Oauth1Service } from './oauth1.service';
export { PopupService } from './popup.service';
export { OauthService } from './oauth.service';
export { JwtHttp } from './jwt-http.service';
export { SharedService } from './shared.service';
export { StorageService } from './storage.service';
export { AuthService } from './auth.service';
export { ConfigService, CustomConfig } from './config.service';
export declare class Ng2UiAuthModule {
    static forRoot(config: Type<CustomConfig>, httpProvider?: {
        provide: typeof JwtHttp;
        useClass: typeof JwtHttp;
        deps: (typeof Http | typeof ConfigService | typeof SharedService)[];
    }): ModuleWithProviders;
    static getWithConfig(config: Type<CustomConfig>): ModuleWithProviders;
}
