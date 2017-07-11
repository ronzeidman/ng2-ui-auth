import {Observable} from 'rxjs/Observable';
import {RequestMethod, Response} from '@angular/http';

export interface IPopupOptions {
    width?: number;
    height?: number;
    left?: number;
    top?: number;
    visibleToolbar?: boolean;
}
export interface IOauth1Options {
    url?: string;
    name?: string;
    popupOptions?: IPopupOptions;
    redirectUri?: string;
    authorizationEndpoint?: string;
    oauthType?: string;
    exchangeForToken?: boolean | ((options: {
        code?: string;
        state?: string;
    }, userData?: any) => Observable<Response>);
    method?: string | RequestMethod;
}
export interface IOauth2Options extends IOauth1Options {
    state?: string | (() => string);
    responseType?: string;
    responseParams?: {
        code?: string;
        clientId?: string;
        redirectUri?: string;
    };
    clientId?: string;
    scopeDelimiter?: string;
    scopePrefix?: string;
    requiredUrlParams?: string[];
    optionalUrlParams?: string[];
    scope?: string[] | string;
    display?: string;
}
export interface IProviders {
    [provider: string]: IOauth2Options;
}
export declare abstract class CustomConfig {
    tokenRoot: string;
    cordova: boolean;
    baseUrl: string;
    loginUrl: string;
    signupUrl: string;
    unlinkUrl: string;
    tokenName: string;
    tokenSeparator: string;
    tokenPrefix: string;
    authToken: string;
    authHeader: string;
    storageType: 'localStorage' | 'sessionStorage' | 'cookie' | 'sessionCookie';
    providers: IProviders;
    defaultHeaders: {
        [name: string]: string;
    };
    withCredentials: boolean;
    autoRefreshToken: boolean;
    refreshUrl: string;
    refreshBeforeExpiration: number;
    tryTokenRefreshIfUnauthorized: boolean;
    resolveToken: (response: Response) => string;
}
export declare class ConfigService {
    constructor(config?: CustomConfig);
    withCredentials: boolean;
    tokenRoot: any;
    baseUrl: string;
    loginUrl: string;
    signupUrl: string;
    unlinkUrl: string;
    refreshUrl: string;
    tokenName: string;
    tokenSeparator: string;
    tokenPrefix: string;
    authHeader: string;
    authToken: string;
    storageType: 'localStorage' | 'sessionStorage' | 'cookie' | 'sessionCookie';
    defaultHeaders: any;
    autoRefreshToken: boolean;
    refreshBeforeExpiration: number;
    tryTokenRefreshIfUnauthorized: boolean;
    cordova: boolean;
    resolveToken: (response: Object | Response) => any;
    providers: IProviders;
    getHttpHost(path?: string): string;
    isCordovaApp(): boolean;
}
