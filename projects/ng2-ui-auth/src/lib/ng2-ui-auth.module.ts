import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IConfigOptions, IPartialConfigOptions } from './config-interfaces';
import { CONFIG_OPTIONS, ConfigService } from './config.service';
import { StorageService } from './storage-service';
import { BrowserStorageService } from './browser-storage.service';
import { SharedService } from './shared.service';
import { JwtInterceptor } from './interceptor.service';
import { OauthService } from './oauth.service';
import { HttpClient } from '@angular/common/http';
import { PopupService } from './popup.service';
import { LocalService } from './local.service';
import { AuthService } from './auth.service';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  exports: []
})
export class Ng2UiAuthModule {
  static forRoot(configOptions?: IPartialConfigOptions, defaultJwtInterceptor = true): ModuleWithProviders {
    return {
      ngModule: Ng2UiAuthModule,
      providers: [
        ...(configOptions ? [{ provide: CONFIG_OPTIONS, useValue: configOptions }] : []),
        { provide: ConfigService, useClass: ConfigService, deps: [CONFIG_OPTIONS] },
        { provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService] },
        { provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService] },
        { provide: LocalService, useClass: LocalService, deps: [HttpClient, SharedService, ConfigService] },
        { provide: PopupService, useClass: PopupService, deps: [ConfigService] },
        { provide: OauthService, useClass: OauthService, deps: [HttpClient, SharedService, ConfigService, PopupService] },
        { provide: AuthService, useClass: AuthService, deps: [SharedService, LocalService, OauthService] },
        ...(defaultJwtInterceptor
          ? [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, deps: [SharedService, ConfigService] }]
          : [])
      ]
    };
  }
}
