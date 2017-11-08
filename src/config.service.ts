import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * Created by Ron on 17/12/2015.
 */

export const CONFIG_OPTIONS = new InjectionToken<any>('config.options');

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
    redirectUri?: string;
    popupOptions?: IPopupOptions;
    authorizationEndpoint?: string;
    oauthType?: '1.0';
    method?: string;
}

export interface IOauth2Options {
    url?: string;
    name?: string;
    redirectUri?: string;
    popupOptions?: IPopupOptions;
    authorizationEndpoint?: string;
    oauthType?: '2.0';
    method?: string;
    responseType?: string;
    clientId?: string;
    additionalUrlParams?: {
        [paramName: string]: string | (() => string) | null | undefined;
    };
    scopeDelimiter?: string;
    scope?: string[];
    state?: string | (() => string);
}

export interface IProviders {
    [provider: string]: IOauth2Options | IOauth1Options;
}

export interface IConfigOptions {
    tokenRoot: string | null;
    cordova: boolean | null;
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
    withCredentials: boolean;
    resolveToken: (response: any, config: IConfigOptions) => string;
}

export interface IPartialConfigOptions { // = Partial<IConfigOptions
    tokenRoot?: string | null;
    cordova?: boolean | null;
    baseUrl?: string;
    loginUrl?: string;
    signupUrl?: string;
    unlinkUrl?: string;
    tokenName?: string;
    tokenSeparator?: string;
    tokenPrefix?: string;
    authToken?: string;
    authHeader?: string;
    storageType?: 'localStorage' | 'sessionStorage' | 'cookie' | 'sessionCookie';
    providers?: IProviders;
    withCredentials?: boolean;
    resolveToken?: (response: any, config: IConfigOptions) => string;
}

export const defaultOptions: IConfigOptions = {
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
    storageType: 'localStorage',
    cordova: null,
    resolveToken: (response: any, config: IConfigOptions) => {
        const accessToken: string | { [key: string]: string } | null | undefined = response &&
            (response.access_token || response.token || response.data);
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
        const tokenRootData = config.tokenRoot && config.tokenRoot
            .split('.')
            .reduce(
            (o: any, x: any) => {
                return o[x];
            },
            accessToken);
        const token = tokenRootData ? tokenRootData[config.tokenName] : accessToken[config.tokenName];
        if (token) {
            return token;
        }
        // const tokenPath = this.tokenRoot ? this.tokenRoot + '.' + this.tokenName : this.tokenName;
        // console.warn('Expecting a token named "' + tokenPath);
        return null;
    },
    providers: {
        facebook: {
            name: 'facebook',
            url: '/auth/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            additionalUrlParams: {
                display: 'popup',
            },
            scope: ['email'],
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: { width: 580, height: 400 },
        },
        google: {
            name: 'google',
            url: '/auth/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            additionalUrlParams: {
                'display': 'popup',
                'prompt': undefined,
                'login_hint': undefined,
                'access_type': undefined,
                'include_granted_scopes': undefined,
                'openid.realm': undefined,
                'hd': undefined,
            },
            scope: ['openid', 'profile', 'email'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 452, height: 633 },
            state: () => encodeURIComponent(Math.random().toString(36).substr(2)),
        },
        github: {
            name: 'github',
            url: '/auth/github',
            authorizationEndpoint: 'https://github.com/login/oauth/authorize',
            scope: ['user:email'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 1020, height: 618 },
        },
        instagram: {
            name: 'instagram',
            url: '/auth/instagram',
            authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
            scope: ['basic'],
            scopeDelimiter: '+',
            oauthType: '2.0',
        },
        linkedin: {
            name: 'linkedin',
            url: '/auth/linkedin',
            authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
            scope: ['r_emailaddress'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 527, height: 582 },
            state: 'STATE',
        },
        twitter: {
            name: 'twitter',
            url: '/auth/twitter',
            authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
            oauthType: '1.0',
            popupOptions: { width: 495, height: 645 },
        },
        twitch: {
            name: 'twitch',
            url: '/auth/twitch',
            authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
            scope: ['user_read'],
            scopeDelimiter: ' ',
            additionalUrlParams: {
                display: 'popup',
            },
            oauthType: '2.0',
            popupOptions: { width: 500, height: 560 },
        },
        live: {
            name: 'live',
            url: '/auth/live',
            authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
            additionalUrlParams: {
                display: 'popup',
            },
            scope: ['wl.emails'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 500, height: 560 },
        },
        yahoo: {
            name: 'yahoo',
            url: '/auth/yahoo',
            authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
            scope: [],
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: { width: 559, height: 519 },
        },
        bitbucket: {
            name: 'bitbucket',
            url: '/auth/bitbucket',
            authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
            scope: ['email'],
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: { width: 1028, height: 529 },
        },
        spotify: {
            name: 'spotify',
            url: '/auth/spotify',
            authorizationEndpoint: 'https://accounts.spotify.com/authorize',
            scope: ['', 'user-read-email'],
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: { width: 500, height: 530 },
            state: () => encodeURIComponent(Math.random().toString(36).substr(2)),
        },
    },
};

@Injectable()
export class ConfigService {
    public options: IConfigOptions;

    constructor(@Inject(CONFIG_OPTIONS) options: IPartialConfigOptions) {
        this.options = {
            ...defaultOptions,
            ...options,
            providers: {
                ...options.providers,
                ...Object
                    .keys(defaultOptions.providers)
                    .concat(Object.keys(options.providers || {}))
                    .map((key) => options.providers && options.providers[key]
                        ? { [key]: { ...defaultOptions.providers[key], ...options.providers[key] } }
                        : { [key]: defaultOptions.providers[key] })
                    .reduce((acc, next) => ({ ...acc, ...next }), {}),
            },
        } as IConfigOptions;
    }
}
