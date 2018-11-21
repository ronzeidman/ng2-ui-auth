import { Inject, Injectable, InjectionToken } from '@angular/core';
import { IConfigOptions, IPartialConfigOptions, IProviders } from './config-interfaces';
import { defaultProviders } from './config-providers';
import { StorageType } from './storage-type.enum';

export const CONFIG_OPTIONS = new InjectionToken<any>('config.options');
@Injectable()
export class ConfigService {
  public options = {
    withCredentials: false,
    tokenRoot: null,
    baseUrl: '/',
    loginUrl: '/auth/login',
    signupUrl: '/auth/signup',
    unlinkUrl: '/auth/unlink/',
    tokenName: 'token',
    tokenSeparator: '_',
    tokenPrefix: 'ng2-ui-auth',
    authHeader: 'Authorization',
    authToken: 'Bearer',
    storageType: StorageType.LOCAL_STORAGE,
    cordova: undefined,
    resolveToken: (response: any, config: IConfigOptions) => {
      const accessToken: string | { [key: string]: string } | null | undefined =
        response && (response.access_token || response.token || response.data);
      if (!accessToken) {
        // console.warn('No token found');
        return null;
      }
      if (typeof accessToken === 'string') {
        return accessToken;
      }
      if (typeof accessToken !== 'object') {
        // console.warn('No token found');
        return null;
      }
      const tokenRootData =
        config.tokenRoot &&
        config.tokenRoot.split('.').reduce((o: any, x: any) => {
          return o[x];
        }, accessToken);
      const token = tokenRootData ? tokenRootData[config.tokenName] : accessToken[config.tokenName];
      if (token) {
        return token;
      }
      // const tokenPath = this.tokenRoot ? this.tokenRoot + '.' + this.tokenName : this.tokenName;
      // console.warn('Expecting a token named "' + tokenPath);
      return null;
    },
    providers: {}
  };

  constructor(@Inject(CONFIG_OPTIONS) options: IPartialConfigOptions) {
    this.options = {
      ...this.options,
      ...options
    };
    this.mergeWithDefaultProviders();
  }

  updateProviders(providers: IProviders) {
    this.options.providers = {
      ...(this.options.providers || {}),
      ...providers
    };
    this.mergeWithDefaultProviders();
  }

  mergeWithDefaultProviders() {
    Object.keys(this.options.providers).forEach(key => {
      if (key in defaultProviders) {
        this.options.providers[key] = {
          ...defaultProviders[key],
          ...this.options.providers[key]
        };
      }
    });
  }
}
