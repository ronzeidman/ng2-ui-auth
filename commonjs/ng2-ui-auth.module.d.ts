import { CustomConfig } from './config.service';
import { ModuleWithProviders } from '@angular/core';
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
    static getWithConfig(config: Type<CustomConfig>): ModuleWithProviders;
    static forRoot(config: Type<CustomConfig>, httpProvider?: any): ModuleWithProviders;
}
