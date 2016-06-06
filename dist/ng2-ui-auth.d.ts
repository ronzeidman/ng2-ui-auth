declare module "config" {
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
        storageType?: string;
        providers?: IProviders;
        defaultHeaders?: {
            [name: string]: string;
        };
    }
    export class Config implements ICustomConfig {
        constructor(config?: ICustomConfig);
        tokenRoot: any;
        cordova: boolean;
        baseUrl: string;
        loginUrl: string;
        signupUrl: string;
        unlinkUrl: string;
        tokenName: string;
        tokenSeparator: string;
        tokenPrefix: string;
        authHeader: string;
        authToken: string;
        storageType: string;
        defaultHeaders: any;
        providers: IProviders;
    }
}
declare module "storage" {
    import { Config } from "config";
    export class Storage {
        private config;
        private store;
        private isStorageAvailable;
        constructor(config: Config);
        get(key: string): any;
        set(key: string, value: string): any;
        remove(key: string): any;
    }
}
declare module "shared" {
    import { Observable } from 'rxjs/Observable';
    import { Response } from '@angular/http';
    import { Config } from "config";
    import { Storage } from "storage";
    export class Shared {
        private storage;
        private config;
        tokenName: string;
        constructor(storage: Storage, config: Config);
        getToken(): any;
        getPayload(): any;
        setToken(response: string | Response): void;
        removeToken(): void;
        isAuthenticated(): boolean;
        getExpirationDate(): Date;
        logout(): Observable<any>;
        setStorageType(type: any): void;
    }
}
declare module "utils" {
    export function extend<T, S>(dst: T, src: S): T & S;
    export function joinUrl(baseUrl: string, url: string): any;
    export function merge(obj1: any, obj2: any): {};
    export function camelCase(name: any): any;
}
declare module "local" {
    import { Shared } from "shared";
    import { Config } from "config";
    import { Http, RequestOptionsArgs, Response } from '@angular/http';
    import { Observable } from 'rxjs/Observable';
    import 'rxjs/add/operator/map';
    export class Local {
        private http;
        private shared;
        private config;
        constructor(http: Http, shared: Shared, config: Config);
        login(user: any, opts?: RequestOptionsArgs): Observable<Response>;
        signup(user: any, opts?: RequestOptionsArgs): Observable<Response>;
    }
}
declare module "popup" {
    import { Observable } from 'rxjs/Observable';
    import { Config, IPopupOptions } from "config";
    import 'rxjs/add/observable/interval';
    import 'rxjs/add/observable/fromEvent';
    import 'rxjs/add/operator/concatMap';
    import 'rxjs/add/operator/take';
    import 'rxjs/add/operator/takeWhile';
    export class Popup {
        private config;
        url: string;
        popupWindow: Window;
        private static prepareOptions(options);
        private static stringifyOptions(options);
        private static parseQueryString(joinedKeyValue);
        constructor(config: Config);
        open(url: string, name: string, options: IPopupOptions): this;
        eventListener(redirectUri: string): Observable<{}>;
        pollPopup(): Observable<{}>;
    }
}
declare module "oauth1" {
    import { Popup } from "popup";
    import { Http, Response } from '@angular/http';
    import { Config, IOauth1Options } from "config";
    import { Observable } from 'rxjs/Observable';
    import 'rxjs/add/operator/concatMap';
    export class Oauth1 {
        private http;
        private popup;
        private config;
        private static base;
        private defaults;
        constructor(http: Http, popup: Popup, config: Config);
        open(options?: IOauth1Options, userData?: any): Observable<Response>;
        private exchangeForToken(oauthData, userData?);
        private buildQueryString(obj);
    }
}
declare module "oauth2" {
    import { Http } from '@angular/http';
    import { Observable } from 'rxjs/Observable';
    import { Config, IOauth2Options } from "config";
    import { Popup } from "popup";
    import { Storage } from "storage";
    import 'rxjs/add/operator/concatMap';
    export class Oauth2 {
        private http;
        private popup;
        private storage;
        private config;
        private static base;
        private defaults;
        constructor(http: Http, popup: Popup, storage: Storage, config: Config);
        open(options: IOauth2Options, userData?: any): Observable<{}>;
        private exchangeForToken(oauthData, userData?);
        private buildQueryString();
    }
}
declare module "oauth" {
    import { Injector } from '@angular/core';
    import { Shared } from "shared";
    import { Http, Response, RequestOptionsArgs } from '@angular/http';
    import { Config } from "config";
    import { Observable } from 'rxjs/Observable';
    import 'rxjs/add/operator/map';
    export class Oauth {
        private http;
        private injector;
        private shared;
        private config;
        constructor(http: Http, injector: Injector, shared: Shared, config: Config);
        authenticate(name: string, userData?: any): Observable<Response>;
        unlink(provider: string, opts: RequestOptionsArgs): Observable<Response>;
    }
}
declare module "jwtHttp" {
    import { Http, Response, RequestOptionsArgs, Request, RequestOptions, ConnectionBackend } from '@angular/http';
    import { Observable } from 'rxjs/Observable';
    import { Config } from "config";
    import { Shared } from "shared";
    export class JwtHttp extends Http {
        private _shared;
        private _config;
        constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, _shared: Shared, _config: Config);
        request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
        get(url: string, options?: RequestOptionsArgs): Observable<Response>;
        post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
        put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
        delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
        patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
        head(url: string, options?: RequestOptionsArgs): Observable<Response>;
        private setHeaders(obj);
    }
}
declare module "auth" {
    import { Provider } from '@angular/core';
    import { Response, RequestOptionsArgs } from '@angular/http';
    import { Shared } from "shared";
    import { Local } from "local";
    import { Oauth } from "oauth";
    import { ICustomConfig } from "config";
    import { Observable } from 'rxjs/Observable';
    export function NG2_UI_AUTH_PROVIDERS(config: ICustomConfig): Array<Provider>;
    export class Auth {
        private shared;
        private local;
        private oauth;
        constructor(shared: Shared, local: Local, oauth: Oauth);
        login(user: any, opts?: RequestOptionsArgs): Observable<Response>;
        signup(user: any, opts?: RequestOptionsArgs): Observable<Response>;
        logout(): Observable<void>;
        authenticate(name: string, userData?: any): Observable<Response>;
        link(name: string, userData?: any): Observable<Response>;
        unlink(provider: string, opts: RequestOptionsArgs): Observable<Response>;
        isAuthenticated(): boolean;
        getToken(): string;
        setToken(token: string): void;
        removeToken(): void;
        getPayload(): any;
        setStorageType(type: string): void;
        getExpirationDate(): Date;
    }
}
declare module "export" {
    export { Auth, NG2_UI_AUTH_PROVIDERS } from "auth";
    export { Config } from "config";
    export { Shared } from "shared";
    export { JwtHttp } from "jwtHttp";
}
