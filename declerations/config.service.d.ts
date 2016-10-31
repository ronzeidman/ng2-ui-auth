import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
export interface IPopupOptions {
    width?: number;
    height?: number;
    left?: number;
    top?: number;
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
}
export interface IOauth2Options extends IOauth1Options {
    state?: string | (() => string);
    defaultUrlParams?: string[];
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
    scope?: string[];
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
    storageType: string;
    providers: IProviders;
    defaultHeaders: {
        [name: string]: string;
    };
    withCredentials: boolean;
    autoRefreshToken: boolean;
    refreshUrl: string;
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
    storageType: string;
    defaultHeaders: any;
    autoRefreshToken: boolean;
    cordova: boolean;
    resolveToken: (response: Response) => any;
    providers: IProviders;
}
