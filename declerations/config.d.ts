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
    type?: string;
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
export interface ICustomConfig {
    tokenRoot?: string;
    cordova?: boolean;
    baseUrl?: string;
    loginUrl?: string;
    signupUrl?: string;
    unlinkUrl?: string;
    tokenName?: string;
    tokenSeparator?: string;
    tokenPrefix?: string;
    authToken?: string;
    authHeader?: string;
    storageType?: string;
    providers?: IProviders;
    defaultHeaders?: {
        [name: string]: string;
    };
    withCredentials?: boolean;
    autoRefreshToken?: boolean;
    refreshUrl?: string;
}
export declare class Config implements ICustomConfig {
    constructor(config?: ICustomConfig);
    withCredentials: boolean;
    tokenRoot: any;
    cordova: boolean;
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
    providers: IProviders;
}
