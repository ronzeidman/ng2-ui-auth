import { InjectionToken } from '@angular/core';
import { IConfigOptions, IPartialConfigOptions, IProviders } from './config-interfaces';
import { StorageType } from './storage-type.enum';
export declare const CONFIG_OPTIONS: InjectionToken<any>;
export declare class ConfigService {
    options: {
        withCredentials: boolean;
        tokenRoot: any;
        baseUrl: string;
        loginUrl: string;
        signupUrl: string;
        unlinkUrl: string;
        tokenName: string;
        tokenSeparator: string;
        tokenPrefix: string;
        authHeader: string;
        authToken: string;
        storageType: StorageType;
        cordova: any;
        resolveToken: (response: any, config: IConfigOptions) => any;
        providers: {};
    };
    constructor(options: IPartialConfigOptions);
    updateProviders(providers: IProviders): void;
    mergeWithDefaultProviders(): void;
}
