(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('ng2-ui-auth', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common/http'], factory) :
    (factory((global['ng2-ui-auth'] = {}),global.ng.core,global.rxjs,global.rxjs.operators,global.ng.common.http));
}(this, (function (exports,core,rxjs,operators,http) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Created by Ron on 17/12/2015.
     * @param {?} baseUrl
     * @param {?} url
     * @return {?}
     */
    function joinUrl(baseUrl, url) {
        if (/^(?:[a-z]+:)?\/\//i.test(url)) {
            return url;
        }
        /** @type {?} */
        var joined = [baseUrl, url].join('/');
        return joined
            .replace(/[\/]+/g, '/')
            .replace(/\/\?/g, '?')
            .replace(/\/\#/g, '#')
            .replace(/\:\//g, '://');
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function buildQueryString(obj) {
        return Object.keys(obj)
            .map(function (key) { return (!!obj[key] ? encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) : key); })
            .join('&');
    }
    /**
     * @param {?=} w
     * @return {?}
     */
    function getWindowOrigin(w) {
        if (!w && typeof window !== 'undefined') {
            w = window;
        }
        try {
            if (!w || !w.location) {
                return null;
            }
            if (!w.location.origin) {
                return w.location.protocol + "//" + w.location.hostname + (w.location.port ? ':' + w.location.port : '');
            }
            return w.location.origin;
        }
        catch (error) {
            return null;
            // ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
            // error instanceof DOMException && error.name === 'SecurityError'
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var defaultProviders = {
        facebook: {
            name: 'facebook',
            url: '/auth/facebook',
            redirectUri: getWindowOrigin() + "/",
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            additionalUrlParams: {
                display: 'popup'
            },
            scope: ['email'],
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: { width: 580, height: 400 }
        },
        google: {
            name: 'google',
            url: '/auth/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            additionalUrlParams: {
                display: 'popup',
                prompt: undefined,
                login_hint: undefined,
                access_type: undefined,
                include_granted_scopes: undefined,
                'openid.realm': undefined,
                hd: undefined
            },
            scope: ['openid', 'profile', 'email'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 452, height: 633 },
            state: function () {
                return encodeURIComponent(Math.random()
                    .toString(36)
                    .substr(2));
            }
        },
        github: {
            name: 'github',
            url: '/auth/github',
            authorizationEndpoint: 'https://github.com/login/oauth/authorize',
            scope: ['user:email'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 1020, height: 618 }
        },
        instagram: {
            name: 'instagram',
            url: '/auth/instagram',
            authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
            scope: ['basic'],
            scopeDelimiter: '+',
            oauthType: '2.0'
        },
        linkedin: {
            name: 'linkedin',
            url: '/auth/linkedin',
            authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
            scope: ['r_emailaddress'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 527, height: 582 },
            state: 'STATE'
        },
        twitter: {
            name: 'twitter',
            url: '/auth/twitter',
            authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
            oauthType: '1.0',
            popupOptions: { width: 495, height: 645 }
        },
        twitch: {
            name: 'twitch',
            url: '/auth/twitch',
            authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
            scope: ['user_read'],
            scopeDelimiter: ' ',
            additionalUrlParams: {
                display: 'popup'
            },
            oauthType: '2.0',
            popupOptions: { width: 500, height: 560 }
        },
        live: {
            name: 'live',
            url: '/auth/live',
            authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
            additionalUrlParams: {
                display: 'popup'
            },
            scope: ['wl.emails'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 500, height: 560 }
        },
        yahoo: {
            name: 'yahoo',
            url: '/auth/yahoo',
            authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
            scope: [],
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: { width: 559, height: 519 }
        },
        bitbucket: {
            name: 'bitbucket',
            url: '/auth/bitbucket',
            authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
            redirectUri: getWindowOrigin() + "/",
            scope: ['email'],
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: { width: 1028, height: 529 }
        },
        spotify: {
            name: 'spotify',
            url: '/auth/spotify',
            authorizationEndpoint: 'https://accounts.spotify.com/authorize',
            scope: ['', 'user-read-email'],
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: { width: 500, height: 530 },
            state: function () {
                return encodeURIComponent(Math.random()
                    .toString(36)
                    .substr(2));
            }
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var StorageType = {
        NONE: 'none',
        MEMORY: 'memory',
        LOCAL_STORAGE: 'localStorage',
        SESSION_STORAGE: 'sessionStorage',
        COOKIE: 'cookie',
        SESSION_COOKIE: 'sessionCookie',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CONFIG_OPTIONS = new core.InjectionToken('config.options');
    var ConfigService = /** @class */ (function () {
        function ConfigService(options) {
            this.options = {
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
                resolveToken: function (response, config) {
                    /** @type {?} */
                    var accessToken = response && (response.access_token || response.token || response.data);
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
                    /** @type {?} */
                    var tokenRootData = config.tokenRoot &&
                        config.tokenRoot.split('.').reduce(function (o, x) {
                            return o[x];
                        }, accessToken);
                    /** @type {?} */
                    var token = tokenRootData ? tokenRootData[config.tokenName] : accessToken[config.tokenName];
                    if (token) {
                        return token;
                    }
                    // const tokenPath = this.tokenRoot ? this.tokenRoot + '.' + this.tokenName : this.tokenName;
                    // console.warn('Expecting a token named "' + tokenPath);
                    return null;
                },
                providers: {}
            };
            this.options = __assign({}, this.options, options);
            this.mergeWithDefaultProviders();
        }
        /**
         * @param {?} providers
         * @return {?}
         */
        ConfigService.prototype.updateProviders = /**
         * @param {?} providers
         * @return {?}
         */
            function (providers) {
                this.options.providers = __assign({}, (this.options.providers || {}), providers);
                this.mergeWithDefaultProviders();
            };
        /**
         * @return {?}
         */
        ConfigService.prototype.mergeWithDefaultProviders = /**
         * @return {?}
         */
            function () {
                var _this = this;
                Object.keys(this.options.providers).forEach(function (key) {
                    if (key in defaultProviders) {
                        _this.options.providers[key] = __assign({}, defaultProviders[key], _this.options.providers[key]);
                    }
                });
            };
        ConfigService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ConfigService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [CONFIG_OPTIONS,] }] }
            ];
        };
        return ConfigService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ StorageService = /** @class */ (function () {
        function StorageService() {
        }
        return StorageService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BrowserStorageService = /** @class */ (function (_super) {
        __extends(BrowserStorageService, _super);
        function BrowserStorageService(config) {
            var _this = _super.call(this) || this;
            _this.config = config;
            _this.store = {};
            _this.storageType = StorageType.MEMORY;
            if (!_this.updateStorageType(config.options.storageType)) {
                console.warn(config.options.storageType + ' is not available.');
            }
            return _this;
        }
        /**
         * @param {?} storageType
         * @return {?}
         */
        BrowserStorageService.prototype.updateStorageType = /**
         * @param {?} storageType
         * @return {?}
         */
            function (storageType) {
                /** @type {?} */
                var isStorageAvailable = this.checkIsStorageAvailable(storageType);
                if (!isStorageAvailable) {
                    return false;
                }
                this.storageType = storageType;
                return true;
            };
        /**
         * @param {?} key
         * @return {?}
         */
        BrowserStorageService.prototype.get = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                switch (this.storageType) {
                    case StorageType.COOKIE:
                    case StorageType.SESSION_COOKIE:
                        return this.getCookie(key);
                    case StorageType.LOCAL_STORAGE:
                    case StorageType.SESSION_STORAGE:
                        return window[this.storageType].getItem(key);
                    case StorageType.MEMORY:
                        return this.store[key];
                    case StorageType.NONE:
                    default:
                        return null;
                }
            };
        /**
         * @param {?} key
         * @param {?} value
         * @param {?} date
         * @return {?}
         */
        BrowserStorageService.prototype.set = /**
         * @param {?} key
         * @param {?} value
         * @param {?} date
         * @return {?}
         */
            function (key, value, date) {
                switch (this.storageType) {
                    case StorageType.COOKIE:
                    case StorageType.SESSION_COOKIE:
                        this.setCookie(key, value, this.storageType === StorageType.COOKIE ? date : '');
                        break;
                    case StorageType.LOCAL_STORAGE:
                    case StorageType.SESSION_STORAGE:
                        window[this.storageType].setItem(key, value);
                        break;
                    case StorageType.MEMORY:
                        this.store[key] = value;
                        break;
                    case StorageType.NONE:
                    default:
                        break;
                }
            };
        /**
         * @param {?} key
         * @return {?}
         */
        BrowserStorageService.prototype.remove = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                switch (this.storageType) {
                    case StorageType.COOKIE:
                    case StorageType.SESSION_COOKIE:
                        this.removeCookie(key);
                        break;
                    case StorageType.LOCAL_STORAGE:
                    case StorageType.SESSION_STORAGE:
                        window[this.storageType].removeItem(key);
                        break;
                    case StorageType.MEMORY:
                        delete this.store[key];
                        break;
                    case StorageType.NONE:
                    default:
                        break;
                }
            };
        /**
         * @private
         * @param {?} storageType
         * @return {?}
         */
        BrowserStorageService.prototype.checkIsStorageAvailable = /**
         * @private
         * @param {?} storageType
         * @return {?}
         */
            function (storageType) {
                switch (storageType) {
                    case StorageType.COOKIE:
                    case StorageType.SESSION_COOKIE:
                        return this.isCookieStorageAvailable();
                    case StorageType.LOCAL_STORAGE:
                    case StorageType.SESSION_STORAGE:
                        return this.isWindowStorageAvailable(storageType);
                    case StorageType.NONE:
                    case StorageType.MEMORY:
                        return true;
                    default:
                        return false;
                }
            };
        /**
         * @private
         * @param {?} storageType
         * @return {?}
         */
        BrowserStorageService.prototype.isWindowStorageAvailable = /**
         * @private
         * @param {?} storageType
         * @return {?}
         */
            function (storageType) {
                try {
                    /** @type {?} */
                    var supported = window && storageType in window && window[storageType] !== null;
                    if (supported) {
                        /** @type {?} */
                        var key = Math.random()
                            .toString(36)
                            .substring(7);
                        window[storageType].setItem(key, '');
                        window[storageType].removeItem(key);
                    }
                    return supported;
                }
                catch (e) {
                    return false;
                }
            };
        /**
         * @private
         * @return {?}
         */
        BrowserStorageService.prototype.isCookieStorageAvailable = /**
         * @private
         * @return {?}
         */
            function () {
                try {
                    /** @type {?} */
                    var supported = document && 'cookie' in document;
                    if (supported) {
                        /** @type {?} */
                        var key = Math.random()
                            .toString(36)
                            .substring(7);
                        this.setCookie(key, 'test', new Date(Date.now() + 60 * 1000).toUTCString());
                        /** @type {?} */
                        var value = this.getCookie(key);
                        this.removeCookie(key);
                        return value === 'test';
                    }
                    return false;
                }
                catch (e) {
                    return false;
                }
            };
        /**
         * @private
         * @param {?} key
         * @param {?} value
         * @param {?=} expires
         * @param {?=} path
         * @return {?}
         */
        BrowserStorageService.prototype.setCookie = /**
         * @private
         * @param {?} key
         * @param {?} value
         * @param {?=} expires
         * @param {?=} path
         * @return {?}
         */
            function (key, value, expires, path) {
                if (expires === void 0) {
                    expires = '';
                }
                if (path === void 0) {
                    path = '/';
                }
                document.cookie = key + "=" + value + (expires ? "; expires=" + expires : '') + "; path=" + path;
            };
        /**
         * @private
         * @param {?} key
         * @param {?=} path
         * @return {?}
         */
        BrowserStorageService.prototype.removeCookie = /**
         * @private
         * @param {?} key
         * @param {?=} path
         * @return {?}
         */
            function (key, path) {
                if (path === void 0) {
                    path = '/';
                }
                this.setCookie(key, '', new Date(0).toUTCString(), path);
            };
        /**
         * @private
         * @param {?} key
         * @return {?}
         */
        BrowserStorageService.prototype.getCookie = /**
         * @private
         * @param {?} key
         * @return {?}
         */
            function (key) {
                return document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$"), '$1');
            };
        BrowserStorageService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        BrowserStorageService.ctorParameters = function () {
            return [
                { type: ConfigService }
            ];
        };
        return BrowserStorageService;
    }(StorageService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SharedService = /** @class */ (function () {
        function SharedService(storage, config) {
            this.storage = storage;
            this.config = config;
            this.tokenName = this.config.options.tokenPrefix
                ? [this.config.options.tokenPrefix, this.config.options.tokenName].join(this.config.options.tokenSeparator)
                : this.config.options.tokenName;
        }
        /**
         * @return {?}
         */
        SharedService.prototype.getToken = /**
         * @return {?}
         */
            function () {
                return this.storage.get(this.tokenName);
            };
        /**
         * @param {?=} token
         * @return {?}
         */
        SharedService.prototype.getPayload = /**
         * @param {?=} token
         * @return {?}
         */
            function (token) {
                if (token === void 0) {
                    token = this.getToken();
                }
                if (token && token.split('.').length === 3) {
                    try {
                        /** @type {?} */
                        var base64Url = token.split('.')[1];
                        /** @type {?} */
                        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        return JSON.parse(this.b64DecodeUnicode(base64));
                    }
                    catch (e) {
                        return undefined;
                    }
                }
            };
        /**
         * @param {?} response
         * @return {?}
         */
        SharedService.prototype.setToken = /**
         * @param {?} response
         * @return {?}
         */
            function (response) {
                if (!response) {
                    // console.warn('Can\'t set token without passing a value');
                    return;
                }
                /** @type {?} */
                var token;
                if (typeof response === 'string') {
                    token = response;
                }
                else {
                    token = this.config.options.resolveToken(response, this.config.options);
                }
                if (token) {
                    /** @type {?} */
                    var expDate = this.getExpirationDate(token);
                    this.storage.set(this.tokenName, token, expDate ? expDate.toUTCString() : '');
                }
            };
        /**
         * @return {?}
         */
        SharedService.prototype.removeToken = /**
         * @return {?}
         */
            function () {
                this.storage.remove(this.tokenName);
            };
        /**
         * @param {?=} token
         * @return {?}
         */
        SharedService.prototype.isAuthenticated = /**
         * @param {?=} token
         * @return {?}
         */
            function (token) {
                if (token === void 0) {
                    token = this.getToken();
                }
                // a token is present
                if (token) {
                    // token with a valid JWT format XXX.YYY.ZZZ
                    if (token.split('.').length === 3) {
                        // could be a valid JWT or an access token with the same format
                        try {
                            /** @type {?} */
                            var base64Url = token.split('.')[1];
                            /** @type {?} */
                            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                            /** @type {?} */
                            var exp = JSON.parse(this.b64DecodeUnicode(base64)).exp;
                            // jwt with an optional expiration claims
                            if (exp) {
                                /** @type {?} */
                                var isExpired = Math.round(new Date().getTime() / 1000) >= exp;
                                if (isExpired) {
                                    // fail: Expired token
                                    this.storage.remove(this.tokenName);
                                    return false;
                                }
                                else {
                                    // pass: Non-expired token
                                    return true;
                                }
                            }
                        }
                        catch (e) {
                            // pass: Non-JWT token that looks like JWT
                            return true;
                        }
                    }
                    // pass: All other tokens
                    return true;
                }
                // lail: No token at all
                return false;
            };
        /**
         * @param {?=} token
         * @return {?}
         */
        SharedService.prototype.getExpirationDate = /**
         * @param {?=} token
         * @return {?}
         */
            function (token) {
                if (token === void 0) {
                    token = this.getToken();
                }
                /** @type {?} */
                var payload = this.getPayload(token);
                if (payload && payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
                    /** @type {?} */
                    var date = new Date(0);
                    date.setUTCSeconds(payload.exp);
                    return date;
                }
                return null;
            };
        /**
         * @return {?}
         */
        SharedService.prototype.logout = /**
         * @return {?}
         */
            function () {
                var _this = this;
                return rxjs.Observable.create(function (observer) {
                    _this.storage.remove(_this.tokenName);
                    observer.next();
                    observer.complete();
                });
            };
        /**
         * @param {?} type
         * @return {?}
         */
        SharedService.prototype.setStorageType = /**
         * @param {?} type
         * @return {?}
         */
            function (type) {
                return this.storage.updateStorageType(type);
            };
        /**
         * @private
         * @param {?} str
         * @return {?}
         */
        SharedService.prototype.b64DecodeUnicode = /**
         * @private
         * @param {?} str
         * @return {?}
         */
            function (str) {
                return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }).join(''));
            };
        SharedService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        SharedService.ctorParameters = function () {
            return [
                { type: StorageService },
                { type: ConfigService }
            ];
        };
        return SharedService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var JwtInterceptor = /** @class */ (function () {
        function JwtInterceptor(shared, config) {
            this.shared = shared;
            this.config = config;
        }
        /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
        JwtInterceptor.prototype.intercept = /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
            function (req, next) {
                var _a;
                var _b = this.config.options, authHeader = _b.authHeader, authToken = _b.authToken;
                /** @type {?} */
                var token = this.shared.getToken();
                /** @type {?} */
                var isAuthenticated = this.shared.isAuthenticated();
                /** @type {?} */
                var newReq = isAuthenticated && !req.headers.has(authHeader) ? req.clone({ setHeaders: (_a = {}, _a[authHeader] = authToken + " " + token, _a) }) : req;
                return next.handle(newReq);
            };
        JwtInterceptor.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        JwtInterceptor.ctorParameters = function () {
            return [
                { type: SharedService },
                { type: ConfigService }
            ];
        };
        return JwtInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PopupService = /** @class */ (function () {
        function PopupService() {
        }
        /**
         * @param {?} url
         * @param {?} options
         * @param {?=} cordova
         * @return {?}
         */
        PopupService.prototype.open = /**
         * @param {?} url
         * @param {?} options
         * @param {?=} cordova
         * @return {?}
         */
            function (url, options, cordova) {
                if (cordova === void 0) {
                    cordova = this.isCordovaApp();
                }
                /** @type {?} */
                var stringifiedOptions = this.stringifyOptions(this.prepareOptions(options.popupOptions));
                /** @type {?} */
                var windowName = cordova ? '_blank' : options.name;
                /** @type {?} */
                var popupWindow = typeof window !== 'undefined' ? window.open(url, windowName, stringifiedOptions) : null;
                if (popupWindow) {
                    if (popupWindow.focus) {
                        popupWindow.focus();
                    }
                    return rxjs.of(popupWindow);
                }
                return rxjs.empty();
            };
        /**
         * @param {?} popupWindow
         * @param {?=} cordova
         * @param {?=} redirectUri
         * @return {?}
         */
        PopupService.prototype.waitForClose = /**
         * @param {?} popupWindow
         * @param {?=} cordova
         * @param {?=} redirectUri
         * @return {?}
         */
            function (popupWindow, cordova, redirectUri) {
                if (cordova === void 0) {
                    cordova = this.isCordovaApp();
                }
                if (redirectUri === void 0) {
                    redirectUri = getWindowOrigin();
                }
                return cordova ? this.eventListener(popupWindow, redirectUri) : this.pollPopup(popupWindow, redirectUri);
            };
        /**
         * @private
         * @param {?} popupWindow
         * @param {?=} redirectUri
         * @return {?}
         */
        PopupService.prototype.eventListener = /**
         * @private
         * @param {?} popupWindow
         * @param {?=} redirectUri
         * @return {?}
         */
            function (popupWindow, redirectUri) {
                var _this = this;
                if (redirectUri === void 0) {
                    redirectUri = getWindowOrigin();
                }
                if (!popupWindow) {
                    throw new Error('Popup was not created');
                }
                return rxjs.merge(rxjs.fromEvent(popupWindow, 'exit').pipe(operators.delay(100), operators.map(function () {
                    throw new Error('Authentication Canceled');
                })), rxjs.fromEvent(popupWindow, 'loadstart')).pipe(operators.switchMap(function (event) {
                    if (!popupWindow || popupWindow.closed) {
                        return rxjs.Observable.throw(new Error('Authentication Canceled'));
                    }
                    if (event.url.indexOf(redirectUri) !== 0) {
                        return rxjs.empty();
                    }
                    /** @type {?} */
                    var parser = document.createElement('a');
                    parser.href = event.url;
                    if (parser.search || parser.hash) {
                        /** @type {?} */
                        var queryParams = parser.search.substring(1).replace(/\/$/, '');
                        /** @type {?} */
                        var hashParams = parser.hash.substring(1).replace(/\/$/, '');
                        /** @type {?} */
                        var hash = _this.parseQueryString(hashParams);
                        /** @type {?} */
                        var qs = _this.parseQueryString(queryParams);
                        /** @type {?} */
                        var allParams = __assign({}, qs, hash);
                        popupWindow.close();
                        if (allParams.error) {
                            throw allParams.error;
                        }
                        else {
                            return rxjs.of(allParams);
                        }
                    }
                    return rxjs.empty();
                }), operators.take(1));
            };
        /**
         * @private
         * @param {?} popupWindow
         * @param {?=} redirectUri
         * @return {?}
         */
        PopupService.prototype.pollPopup = /**
         * @private
         * @param {?} popupWindow
         * @param {?=} redirectUri
         * @return {?}
         */
            function (popupWindow, redirectUri) {
                var _this = this;
                if (redirectUri === void 0) {
                    redirectUri = getWindowOrigin();
                }
                return rxjs.interval(50).pipe(operators.switchMap(function () {
                    if (!popupWindow || popupWindow.closed) {
                        return rxjs.throwError(new Error('Authentication Canceled'));
                    }
                    /** @type {?} */
                    var popupWindowOrigin = getWindowOrigin(popupWindow);
                    if (popupWindowOrigin &&
                        (redirectUri.indexOf(popupWindowOrigin) === 0 || popupWindowOrigin.indexOf(redirectUri) === 0) &&
                        (popupWindow.location.search || popupWindow.location.hash)) {
                        /** @type {?} */
                        var queryParams = popupWindow.location.search.substring(1).replace(/\/$/, '');
                        /** @type {?} */
                        var hashParams = popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                        /** @type {?} */
                        var hash = _this.parseQueryString(hashParams);
                        /** @type {?} */
                        var qs = _this.parseQueryString(queryParams);
                        popupWindow.close();
                        /** @type {?} */
                        var allParams = __assign({}, qs, hash);
                        if (allParams.error) {
                            throw allParams.error;
                        }
                        else {
                            return rxjs.of(allParams);
                        }
                    }
                    return rxjs.empty();
                }), operators.take(1));
            };
        /**
         * @private
         * @param {?=} options
         * @return {?}
         */
        PopupService.prototype.prepareOptions = /**
         * @private
         * @param {?=} options
         * @return {?}
         */
            function (options) {
                options = options || {};
                /** @type {?} */
                var width = options.width || 500;
                /** @type {?} */
                var height = options.height || 500;
                return __assign({ width: width,
                    height: height, left: window.screenX + (window.outerWidth - width) / 2, top: window.screenY + (window.outerHeight - height) / 2.5, toolbar: options.visibleToolbar ? 'yes' : 'no' }, options);
            };
        /**
         * @private
         * @param {?} options
         * @return {?}
         */
        PopupService.prototype.stringifyOptions = /**
         * @private
         * @param {?} options
         * @return {?}
         */
            function (options) {
                return Object.keys(options)
                    .map(function (key) { return (options[key] === null || options[key] === undefined ? key : key + '=' + options[key]); })
                    .join(',');
            };
        /**
         * @private
         * @param {?} joinedKeyValue
         * @return {?}
         */
        PopupService.prototype.parseQueryString = /**
         * @private
         * @param {?} joinedKeyValue
         * @return {?}
         */
            function (joinedKeyValue) {
                /** @type {?} */
                var key;
                /** @type {?} */
                var value;
                return joinedKeyValue.split('&').reduce(function (obj, keyValue) {
                    if (keyValue) {
                        value = keyValue.split('=');
                        key = decodeURIComponent(value[0]);
                        obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
                    }
                    return obj;
                }, ( /** @type {?} */({})));
            };
        /**
         * @private
         * @return {?}
         */
        PopupService.prototype.isCordovaApp = /**
         * @private
         * @return {?}
         */
            function () {
                return typeof cordova === 'object' || (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
            };
        PopupService.decorators = [
            { type: core.Injectable }
        ];
        return PopupService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Oauth1Service = /** @class */ (function () {
        function Oauth1Service(http$$1, popup, config) {
            this.http = http$$1;
            this.popup = popup;
            this.config = config;
        }
        /**
         * @template T
         * @param {?} oauthOptions
         * @param {?} userData
         * @return {?}
         */
        Oauth1Service.prototype.open = /**
         * @template T
         * @param {?} oauthOptions
         * @param {?} userData
         * @return {?}
         */
            function (oauthOptions, userData) {
                var _this = this;
                /** @type {?} */
                var serverUrl = this.config.options.baseUrl ? joinUrl(this.config.options.baseUrl, oauthOptions.url) : oauthOptions.url;
                return this.popup.open('about:blank', oauthOptions, this.config.options.cordova).pipe(operators.switchMap(function (popupWindow) {
                    return _this.http.post(serverUrl, oauthOptions).pipe(operators.tap(function (authorizationData) {
                        return popupWindow
                            ? popupWindow.location.replace([oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'))
                            : undefined;
                    }), operators.switchMap(function (authorizationData) {
                        return _this.popup
                            .waitForClose(popupWindow, _this.config.options.cordova, oauthOptions.redirectUri)
                            .pipe(operators.map(function (oauthData) { return ({ authorizationData: authorizationData, oauthData: oauthData }); }));
                    }));
                }), operators.switchMap(function (_a) {
                    var authorizationData = _a.authorizationData, oauthData = _a.oauthData;
                    return _this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
                }));
            };
        /**
         * @private
         * @template T
         * @param {?} oauthOptions
         * @param {?} authorizationData
         * @param {?} oauthData
         * @param {?} userData
         * @return {?}
         */
        Oauth1Service.prototype.exchangeForToken = /**
         * @private
         * @template T
         * @param {?} oauthOptions
         * @param {?} authorizationData
         * @param {?} oauthData
         * @param {?} userData
         * @return {?}
         */
            function (oauthOptions, authorizationData, oauthData, userData) {
                /** @type {?} */
                var body = { oauthOptions: oauthOptions, authorizationData: authorizationData, oauthData: oauthData, userData: userData };
                var _a = this.config.options, withCredentials = _a.withCredentials, baseUrl = _a.baseUrl;
                var _b = oauthOptions.method, method = _b === void 0 ? 'POST' : _b, url = oauthOptions.url;
                /** @type {?} */
                var exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
                return this.http.request(method, exchangeForTokenUrl, { body: body, withCredentials: withCredentials });
            };
        Oauth1Service.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Oauth1Service.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: PopupService },
                { type: ConfigService }
            ];
        };
        return Oauth1Service;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Oauth2Service = /** @class */ (function () {
        function Oauth2Service(http$$1, popup, config) {
            this.http = http$$1;
            this.popup = popup;
            this.config = config;
        }
        /**
         * @template T
         * @param {?} oauthOptions
         * @param {?} userData
         * @return {?}
         */
        Oauth2Service.prototype.open = /**
         * @template T
         * @param {?} oauthOptions
         * @param {?} userData
         * @return {?}
         */
            function (oauthOptions, userData) {
                var _this = this;
                /** @type {?} */
                var authorizationData = this.getAuthorizationData(oauthOptions);
                /** @type {?} */
                var url = [oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?');
                return this.popup.open(url, oauthOptions, this.config.options.cordova).pipe(operators.switchMap(function (window) {
                    return window ? _this.popup.waitForClose(window, _this.config.options.cordova, oauthOptions.redirectUri) : rxjs.empty();
                }), operators.switchMap(function (oauthData) {
                    // when no server URL provided, return popup params as-is.
                    // this is for a scenario when someone wishes to opt out from
                    // satellizer's magic by doing authorization code exchange and
                    // saving a token manually.
                    if (oauthOptions.responseType === 'token' || !oauthOptions.url) {
                        return rxjs.of(oauthData);
                    }
                    if (oauthData.state && oauthData.state !== authorizationData.state) {
                        throw new Error('OAuth "state" mismatch');
                    }
                    return _this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
                }));
            };
        /**
         * @private
         * @template T
         * @param {?} options
         * @param {?} authorizationData
         * @param {?} oauthData
         * @param {?} userData
         * @return {?}
         */
        Oauth2Service.prototype.exchangeForToken = /**
         * @private
         * @template T
         * @param {?} options
         * @param {?} authorizationData
         * @param {?} oauthData
         * @param {?} userData
         * @return {?}
         */
            function (options, authorizationData, oauthData, userData) {
                /** @type {?} */
                var body = { authorizationData: authorizationData, oauthData: oauthData, userData: userData };
                var _a = this.config.options, baseUrl = _a.baseUrl, withCredentials = _a.withCredentials;
                var url = options.url, _b = options.method, method = _b === void 0 ? 'POST' : _b;
                /** @type {?} */
                var exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
                return this.http.request(method, exchangeForTokenUrl, { body: body, withCredentials: withCredentials });
            };
        /**
         * @private
         * @param {?} options
         * @return {?}
         */
        Oauth2Service.prototype.getAuthorizationData = /**
         * @private
         * @param {?} options
         * @return {?}
         */
            function (options) {
                var _a = options.responseType, responseType = _a === void 0 ? 'code' : _a, clientId = options.clientId, _b = options.redirectUri, redirectUri = _b === void 0 ? getWindowOrigin() || '' : _b, _c = options.scopeDelimiter, scopeDelimiter = _c === void 0 ? ',' : _c, scope = options.scope, state = options.state, additionalUrlParams = options.additionalUrlParams;
                /** @type {?} */
                var resolvedState = typeof state === 'function' ? state() : state;
                return __spread([
                    ['response_type', responseType],
                    ['client_id', clientId],
                    ['redirect_uri', redirectUri]
                ], (state ? [['state', resolvedState]] : []), (scope ? [['scope', scope.join(scopeDelimiter)]] : []), (additionalUrlParams
                    ? Object.keys(additionalUrlParams).map(function (key) {
                        /** @type {?} */
                        var value = (( /** @type {?} */(additionalUrlParams)))[key];
                        if (typeof value === 'string') {
                            return [key, value];
                        }
                        else if (typeof value === 'function') {
                            return [key, value()];
                        }
                        else if (value === null) {
                            return [key, ''];
                        }
                        return ['', ''];
                    })
                    : [])).filter(function (_) { return !!_[0]; })
                    .reduce(function (acc, next) {
                    var _a;
                    return (__assign({}, acc, (_a = {}, _a[next[0]] = next[1], _a)));
                }, ( /** @type {?} */({})));
            };
        Oauth2Service.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Oauth2Service.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: PopupService },
                { type: ConfigService }
            ];
        };
        return Oauth2Service;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OauthService = /** @class */ (function () {
        function OauthService(http$$1, shared, config, popup) {
            this.http = http$$1;
            this.shared = shared;
            this.config = config;
            this.popup = popup;
            this.depProviders = [
                { provide: http.HttpClient, useValue: this.http },
                { provide: PopupService, useValue: this.popup },
                { provide: ConfigService, useValue: this.config }
            ];
            this.deps = [http.HttpClient, PopupService, ConfigService];
        }
        /**
         * @template T
         * @param {?} name
         * @param {?=} userData
         * @return {?}
         */
        OauthService.prototype.authenticate = /**
         * @template T
         * @param {?} name
         * @param {?=} userData
         * @return {?}
         */
            function (name, userData) {
                var _this = this;
                /** @type {?} */
                var provider = this.config.options.providers[name].oauthType === '1.0'
                    ? core.Injector.create(__spread(this.depProviders, [{ provide: Oauth1Service, deps: this.deps }])).get(Oauth1Service)
                    : core.Injector.create(__spread(this.depProviders, [{ provide: Oauth2Service, deps: this.deps }])).get(Oauth2Service);
                return provider.open(this.config.options.providers[name], userData || {}).pipe(operators.tap(function (response) {
                    // this is for a scenario when someone wishes to opt out from
                    // satellizer's magic by doing authorization code exchange and
                    // saving a token manually.
                    if (_this.config.options.providers[name].url) {
                        _this.shared.setToken(response);
                    }
                }));
            };
        /**
         * @template T
         * @param {?} provider
         * @param {?=} url
         * @param {?=} method
         * @return {?}
         */
        OauthService.prototype.unlink = /**
         * @template T
         * @param {?} provider
         * @param {?=} url
         * @param {?=} method
         * @return {?}
         */
            function (provider, url, method) {
                if (url === void 0) {
                    url = joinUrl(this.config.options.baseUrl, this.config.options.unlinkUrl);
                }
                if (method === void 0) {
                    method = 'POST';
                }
                return this.http.request(method, url, { body: { provider: provider } });
            };
        OauthService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        OauthService.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: SharedService },
                { type: ConfigService },
                { type: PopupService }
            ];
        };
        return OauthService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LocalService = /** @class */ (function () {
        function LocalService(http$$1, shared, config) {
            this.http = http$$1;
            this.shared = shared;
            this.config = config;
        }
        /**
         * @template T
         * @param {?} user
         * @param {?=} url
         * @return {?}
         */
        LocalService.prototype.login = /**
         * @template T
         * @param {?} user
         * @param {?=} url
         * @return {?}
         */
            function (user, url) {
                var _this = this;
                return this.http
                    .post(url || joinUrl(this.config.options.baseUrl, this.config.options.loginUrl), user)
                    .pipe(operators.tap(function (data) { return _this.shared.setToken(data); }));
            };
        /**
         * @template T
         * @param {?} user
         * @param {?=} url
         * @return {?}
         */
        LocalService.prototype.signup = /**
         * @template T
         * @param {?} user
         * @param {?=} url
         * @return {?}
         */
            function (user, url) {
                return this.http.post(url || joinUrl(this.config.options.baseUrl, this.config.options.signupUrl), user);
            };
        LocalService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        LocalService.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: SharedService },
                { type: ConfigService }
            ];
        };
        return LocalService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AuthService = /** @class */ (function () {
        function AuthService(shared, local, oauth) {
            this.shared = shared;
            this.local = local;
            this.oauth = oauth;
        }
        /**
         * @template T
         * @param {?} user
         * @param {?=} url
         * @return {?}
         */
        AuthService.prototype.login = /**
         * @template T
         * @param {?} user
         * @param {?=} url
         * @return {?}
         */
            function (user, url) {
                return this.local.login(user, url);
            };
        /**
         * @template T
         * @param {?} user
         * @param {?=} url
         * @return {?}
         */
        AuthService.prototype.signup = /**
         * @template T
         * @param {?} user
         * @param {?=} url
         * @return {?}
         */
            function (user, url) {
                return this.local.signup(user, url);
            };
        /**
         * @return {?}
         */
        AuthService.prototype.logout = /**
         * @return {?}
         */
            function () {
                return this.shared.logout();
            };
        /**
         * @template T
         * @param {?} name
         * @param {?=} userData
         * @return {?}
         */
        AuthService.prototype.authenticate = /**
         * @template T
         * @param {?} name
         * @param {?=} userData
         * @return {?}
         */
            function (name, userData) {
                return this.oauth.authenticate(name, userData);
            };
        /**
         * @template T
         * @param {?} name
         * @param {?=} userData
         * @return {?}
         */
        AuthService.prototype.link = /**
         * @template T
         * @param {?} name
         * @param {?=} userData
         * @return {?}
         */
            function (name, userData) {
                return this.oauth.authenticate(name, userData);
            };
        /**
         * @template T
         * @param {?} provider
         * @param {?=} url
         * @return {?}
         */
        AuthService.prototype.unlink = /**
         * @template T
         * @param {?} provider
         * @param {?=} url
         * @return {?}
         */
            function (provider, url) {
                return this.oauth.unlink(provider, url);
            };
        /**
         * @return {?}
         */
        AuthService.prototype.isAuthenticated = /**
         * @return {?}
         */
            function () {
                return this.shared.isAuthenticated();
            };
        /**
         * @return {?}
         */
        AuthService.prototype.getToken = /**
         * @return {?}
         */
            function () {
                return this.shared.getToken();
            };
        /**
         * @param {?} token
         * @return {?}
         */
        AuthService.prototype.setToken = /**
         * @param {?} token
         * @return {?}
         */
            function (token) {
                this.shared.setToken(token);
            };
        /**
         * @return {?}
         */
        AuthService.prototype.removeToken = /**
         * @return {?}
         */
            function () {
                this.shared.removeToken();
            };
        /**
         * @return {?}
         */
        AuthService.prototype.getPayload = /**
         * @return {?}
         */
            function () {
                return this.shared.getPayload();
            };
        /**
         * @param {?} type
         * @return {?}
         */
        AuthService.prototype.setStorageType = /**
         * @param {?} type
         * @return {?}
         */
            function (type) {
                return this.shared.setStorageType(type);
            };
        /**
         * @return {?}
         */
        AuthService.prototype.getExpirationDate = /**
         * @return {?}
         */
            function () {
                return this.shared.getExpirationDate();
            };
        AuthService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        AuthService.ctorParameters = function () {
            return [
                { type: SharedService },
                { type: LocalService },
                { type: OauthService }
            ];
        };
        return AuthService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Ng2UiAuthModule = /** @class */ (function () {
        function Ng2UiAuthModule() {
        }
        /**
         * @param {?=} configOptions
         * @param {?=} defaultJwtInterceptor
         * @return {?}
         */
        Ng2UiAuthModule.forRoot = /**
         * @param {?=} configOptions
         * @param {?=} defaultJwtInterceptor
         * @return {?}
         */
            function (configOptions, defaultJwtInterceptor) {
                if (defaultJwtInterceptor === void 0) {
                    defaultJwtInterceptor = true;
                }
                return {
                    ngModule: Ng2UiAuthModule,
                    providers: __spread((configOptions ? [{ provide: CONFIG_OPTIONS, useValue: configOptions }] : []), [
                        { provide: ConfigService, useClass: ConfigService, deps: [CONFIG_OPTIONS] },
                        { provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService] },
                        { provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService] },
                        { provide: LocalService, useClass: LocalService, deps: [http.HttpClient, SharedService, ConfigService] },
                        { provide: PopupService, useClass: PopupService, deps: [ConfigService] },
                        { provide: OauthService, useClass: OauthService, deps: [http.HttpClient, SharedService, ConfigService, PopupService] },
                        { provide: AuthService, useClass: AuthService, deps: [SharedService, LocalService, OauthService] }
                    ], (defaultJwtInterceptor
                        ? [{ provide: http.HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, deps: [SharedService, ConfigService] }]
                        : []))
                };
            };
        Ng2UiAuthModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [http.HttpClientModule],
                        declarations: [],
                        exports: []
                    },] }
        ];
        return Ng2UiAuthModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.Ng2UiAuthModule = Ng2UiAuthModule;
    exports.LocalService = LocalService;
    exports.Oauth2Service = Oauth2Service;
    exports.Oauth1Service = Oauth1Service;
    exports.PopupService = PopupService;
    exports.OauthService = OauthService;
    exports.SharedService = SharedService;
    exports.StorageService = StorageService;
    exports.BrowserStorageService = BrowserStorageService;
    exports.AuthService = AuthService;
    exports.ConfigService = ConfigService;
    exports.JwtInterceptor = JwtInterceptor;
    exports.CONFIG_OPTIONS = CONFIG_OPTIONS;
    exports.StorageType = StorageType;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLXVpLWF1dGgudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vbmcyLXVpLWF1dGgvbGliL3V0aWxzLnRzIiwibmc6Ly9uZzItdWktYXV0aC9saWIvY29uZmlnLXByb3ZpZGVycy50cyIsIm5nOi8vbmcyLXVpLWF1dGgvbGliL3N0b3JhZ2UtdHlwZS5lbnVtLnRzIiwibmc6Ly9uZzItdWktYXV0aC9saWIvY29uZmlnLnNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL2xpYi9zdG9yYWdlLXNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL2xpYi9icm93c2VyLXN0b3JhZ2Uuc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvbGliL3NoYXJlZC5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9saWIvaW50ZXJjZXB0b3Iuc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvbGliL3BvcHVwLnNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL2xpYi9vYXV0aDEuc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvbGliL29hdXRoMi5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9saWIvb2F1dGguc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvbGliL2xvY2FsLnNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL2xpYi9hdXRoLnNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL2xpYi9uZzItdWktYXV0aC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqb2luVXJsKGJhc2VVcmw6IHN0cmluZywgdXJsOiBzdHJpbmcpIHtcclxuICBpZiAoL14oPzpbYS16XSs6KT9cXC9cXC8vaS50ZXN0KHVybCkpIHtcclxuICAgIHJldHVybiB1cmw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBqb2luZWQgPSBbYmFzZVVybCwgdXJsXS5qb2luKCcvJyk7XHJcblxyXG4gIHJldHVybiBqb2luZWRcclxuICAgIC5yZXBsYWNlKC9bXFwvXSsvZywgJy8nKVxyXG4gICAgLnJlcGxhY2UoL1xcL1xcPy9nLCAnPycpXHJcbiAgICAucmVwbGFjZSgvXFwvXFwjL2csICcjJylcclxuICAgIC5yZXBsYWNlKC9cXDpcXC8vZywgJzovLycpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRRdWVyeVN0cmluZyhvYmo6IG9iamVjdCkge1xyXG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopXHJcbiAgICAubWFwKGtleSA9PiAoISFvYmpba2V5XSA/IGAke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke2VuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSl9YCA6IGtleSkpXHJcbiAgICAuam9pbignJicpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2luZG93T3JpZ2luKHc/OiBXaW5kb3cpIHtcclxuICBpZiAoIXcgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIHcgPSB3aW5kb3c7XHJcbiAgfVxyXG4gIHRyeSB7XHJcbiAgICBpZiAoIXcgfHwgIXcubG9jYXRpb24pIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoIXcubG9jYXRpb24ub3JpZ2luKSB7XHJcbiAgICAgIHJldHVybiBgJHt3LmxvY2F0aW9uLnByb3RvY29sfS8vJHt3LmxvY2F0aW9uLmhvc3RuYW1lfSR7dy5sb2NhdGlvbi5wb3J0ID8gJzonICsgdy5sb2NhdGlvbi5wb3J0IDogJyd9YDtcclxuICAgIH1cclxuICAgIHJldHVybiB3LmxvY2F0aW9uLm9yaWdpbjtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgICAvLyBpZ25vcmUgRE9NRXhjZXB0aW9uOiBCbG9ja2VkIGEgZnJhbWUgd2l0aCBvcmlnaW4gZnJvbSBhY2Nlc3NpbmcgYSBjcm9zcy1vcmlnaW4gZnJhbWUuXHJcbiAgICAvLyBlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSAnU2VjdXJpdHlFcnJvcidcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZ2V0V2luZG93T3JpZ2luIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IElQcm92aWRlcnMgfSBmcm9tICcuLi9wdWJsaWNfYXBpJztcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0UHJvdmlkZXJzOiBJUHJvdmlkZXJzID0ge1xyXG4gIGZhY2Vib29rOiB7XHJcbiAgICBuYW1lOiAnZmFjZWJvb2snLFxyXG4gICAgdXJsOiAnL2F1dGgvZmFjZWJvb2snLFxyXG4gICAgcmVkaXJlY3RVcmk6IGAke2dldFdpbmRvd09yaWdpbigpfS9gLFxyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3YyLjUvZGlhbG9nL29hdXRoJyxcclxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgZGlzcGxheTogJ3BvcHVwJ1xyXG4gICAgfSxcclxuICAgIHNjb3BlOiBbJ2VtYWlsJ10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQwMCB9XHJcbiAgfSxcclxuICBnb29nbGU6IHtcclxuICAgIG5hbWU6ICdnb29nbGUnLFxyXG4gICAgdXJsOiAnL2F1dGgvZ29vZ2xlJyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoJyxcclxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgZGlzcGxheTogJ3BvcHVwJyxcclxuICAgICAgcHJvbXB0OiB1bmRlZmluZWQsXHJcbiAgICAgIGxvZ2luX2hpbnQ6IHVuZGVmaW5lZCxcclxuICAgICAgYWNjZXNzX3R5cGU6IHVuZGVmaW5lZCxcclxuICAgICAgaW5jbHVkZV9ncmFudGVkX3Njb3BlczogdW5kZWZpbmVkLFxyXG4gICAgICAnb3BlbmlkLnJlYWxtJzogdW5kZWZpbmVkLFxyXG4gICAgICBoZDogdW5kZWZpbmVkXHJcbiAgICB9LFxyXG4gICAgc2NvcGU6IFsnb3BlbmlkJywgJ3Byb2ZpbGUnLCAnZW1haWwnXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0NTIsIGhlaWdodDogNjMzIH0sXHJcbiAgICBzdGF0ZTogKCkgPT5cclxuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KFxyXG4gICAgICAgIE1hdGgucmFuZG9tKClcclxuICAgICAgICAgIC50b1N0cmluZygzNilcclxuICAgICAgICAgIC5zdWJzdHIoMilcclxuICAgICAgKVxyXG4gIH0sXHJcbiAgZ2l0aHViOiB7XHJcbiAgICBuYW1lOiAnZ2l0aHViJyxcclxuICAgIHVybDogJy9hdXRoL2dpdGh1YicsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgvYXV0aG9yaXplJyxcclxuICAgIHNjb3BlOiBbJ3VzZXI6ZW1haWwnXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiAxMDIwLCBoZWlnaHQ6IDYxOCB9XHJcbiAgfSxcclxuICBpbnN0YWdyYW06IHtcclxuICAgIG5hbWU6ICdpbnN0YWdyYW0nLFxyXG4gICAgdXJsOiAnL2F1dGgvaW5zdGFncmFtJyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLmluc3RhZ3JhbS5jb20vb2F1dGgvYXV0aG9yaXplJyxcclxuICAgIHNjb3BlOiBbJ2Jhc2ljJ10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJysnLFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJ1xyXG4gIH0sXHJcbiAgbGlua2VkaW46IHtcclxuICAgIG5hbWU6ICdsaW5rZWRpbicsXHJcbiAgICB1cmw6ICcvYXV0aC9saW5rZWRpbicsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vdWFzL29hdXRoMi9hdXRob3JpemF0aW9uJyxcclxuICAgIHNjb3BlOiBbJ3JfZW1haWxhZGRyZXNzJ10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTI3LCBoZWlnaHQ6IDU4MiB9LFxyXG4gICAgc3RhdGU6ICdTVEFURSdcclxuICB9LFxyXG4gIHR3aXR0ZXI6IHtcclxuICAgIG5hbWU6ICd0d2l0dGVyJyxcclxuICAgIHVybDogJy9hdXRoL3R3aXR0ZXInLFxyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkudHdpdHRlci5jb20vb2F1dGgvYXV0aGVudGljYXRlJyxcclxuICAgIG9hdXRoVHlwZTogJzEuMCcsXHJcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ5NSwgaGVpZ2h0OiA2NDUgfVxyXG4gIH0sXHJcbiAgdHdpdGNoOiB7XHJcbiAgICBuYW1lOiAndHdpdGNoJyxcclxuICAgIHVybDogJy9hdXRoL3R3aXRjaCcsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS50d2l0Y2gudHYva3Jha2VuL29hdXRoMi9hdXRob3JpemUnLFxyXG4gICAgc2NvcGU6IFsndXNlcl9yZWFkJ10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICBkaXNwbGF5OiAncG9wdXAnXHJcbiAgICB9LFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDU2MCB9XHJcbiAgfSxcclxuICBsaXZlOiB7XHJcbiAgICBuYW1lOiAnbGl2ZScsXHJcbiAgICB1cmw6ICcvYXV0aC9saXZlJyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vbG9naW4ubGl2ZS5jb20vb2F1dGgyMF9hdXRob3JpemUuc3JmJyxcclxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgZGlzcGxheTogJ3BvcHVwJ1xyXG4gICAgfSxcclxuICAgIHNjb3BlOiBbJ3dsLmVtYWlscyddLFxyXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1NjAgfVxyXG4gIH0sXHJcbiAgeWFob286IHtcclxuICAgIG5hbWU6ICd5YWhvbycsXHJcbiAgICB1cmw6ICcvYXV0aC95YWhvbycsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS5sb2dpbi55YWhvby5jb20vb2F1dGgyL3JlcXVlc3RfYXV0aCcsXHJcbiAgICBzY29wZTogW10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTU5LCBoZWlnaHQ6IDUxOSB9XHJcbiAgfSxcclxuICBiaXRidWNrZXQ6IHtcclxuICAgIG5hbWU6ICdiaXRidWNrZXQnLFxyXG4gICAgdXJsOiAnL2F1dGgvYml0YnVja2V0JyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYml0YnVja2V0Lm9yZy9zaXRlL29hdXRoMi9hdXRob3JpemUnLFxyXG4gICAgcmVkaXJlY3RVcmk6IGAke2dldFdpbmRvd09yaWdpbigpfS9gLFxyXG4gICAgc2NvcGU6IFsnZW1haWwnXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiAxMDI4LCBoZWlnaHQ6IDUyOSB9XHJcbiAgfSxcclxuICBzcG90aWZ5OiB7XHJcbiAgICBuYW1lOiAnc3BvdGlmeScsXHJcbiAgICB1cmw6ICcvYXV0aC9zcG90aWZ5JyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYWNjb3VudHMuc3BvdGlmeS5jb20vYXV0aG9yaXplJyxcclxuICAgIHNjb3BlOiBbJycsICd1c2VyLXJlYWQtZW1haWwnXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTMwIH0sXHJcbiAgICBzdGF0ZTogKCkgPT5cclxuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KFxyXG4gICAgICAgIE1hdGgucmFuZG9tKClcclxuICAgICAgICAgIC50b1N0cmluZygzNilcclxuICAgICAgICAgIC5zdWJzdHIoMilcclxuICAgICAgKVxyXG4gIH1cclxufTtcclxuIiwiZXhwb3J0IGVudW0gU3RvcmFnZVR5cGUge1xyXG4gIE5PTkUgPSAnbm9uZScsXHJcbiAgTUVNT1JZID0gJ21lbW9yeScsXHJcbiAgTE9DQUxfU1RPUkFHRSA9ICdsb2NhbFN0b3JhZ2UnLFxyXG4gIFNFU1NJT05fU1RPUkFHRSA9ICdzZXNzaW9uU3RvcmFnZScsXHJcbiAgQ09PS0lFID0gJ2Nvb2tpZScsXHJcbiAgU0VTU0lPTl9DT09LSUUgPSAnc2Vzc2lvbkNvb2tpZSdcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElDb25maWdPcHRpb25zLCBJUGFydGlhbENvbmZpZ09wdGlvbnMsIElQcm92aWRlcnMgfSBmcm9tICcuL2NvbmZpZy1pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgZGVmYXVsdFByb3ZpZGVycyB9IGZyb20gJy4vY29uZmlnLXByb3ZpZGVycyc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XHJcblxyXG5leHBvcnQgY29uc3QgQ09ORklHX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignY29uZmlnLm9wdGlvbnMnKTtcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29uZmlnU2VydmljZSB7XHJcbiAgcHVibGljIG9wdGlvbnMgPSB7XHJcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxyXG4gICAgdG9rZW5Sb290OiBudWxsLFxyXG4gICAgYmFzZVVybDogJy8nLFxyXG4gICAgbG9naW5Vcmw6ICcvYXV0aC9sb2dpbicsXHJcbiAgICBzaWdudXBVcmw6ICcvYXV0aC9zaWdudXAnLFxyXG4gICAgdW5saW5rVXJsOiAnL2F1dGgvdW5saW5rLycsXHJcbiAgICB0b2tlbk5hbWU6ICd0b2tlbicsXHJcbiAgICB0b2tlblNlcGFyYXRvcjogJ18nLFxyXG4gICAgdG9rZW5QcmVmaXg6ICduZzItdWktYXV0aCcsXHJcbiAgICBhdXRoSGVhZGVyOiAnQXV0aG9yaXphdGlvbicsXHJcbiAgICBhdXRoVG9rZW46ICdCZWFyZXInLFxyXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLkxPQ0FMX1NUT1JBR0UsXHJcbiAgICBjb3Jkb3ZhOiB1bmRlZmluZWQsXHJcbiAgICByZXNvbHZlVG9rZW46IChyZXNwb25zZTogYW55LCBjb25maWc6IElDb25maWdPcHRpb25zKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuOiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCB8IHVuZGVmaW5lZCA9XHJcbiAgICAgICAgcmVzcG9uc2UgJiYgKHJlc3BvbnNlLmFjY2Vzc190b2tlbiB8fCByZXNwb25zZS50b2tlbiB8fCByZXNwb25zZS5kYXRhKTtcclxuICAgICAgaWYgKCFhY2Nlc3NUb2tlbikge1xyXG4gICAgICAgIC8vIGNvbnNvbGUud2FybignTm8gdG9rZW4gZm91bmQnKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiBhY2Nlc3NUb2tlbjtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIC8vIGNvbnNvbGUud2FybignTm8gdG9rZW4gZm91bmQnKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB0b2tlblJvb3REYXRhID1cclxuICAgICAgICBjb25maWcudG9rZW5Sb290ICYmXHJcbiAgICAgICAgY29uZmlnLnRva2VuUm9vdC5zcGxpdCgnLicpLnJlZHVjZSgobzogYW55LCB4OiBhbnkpID0+IHtcclxuICAgICAgICAgIHJldHVybiBvW3hdO1xyXG4gICAgICAgIH0sIGFjY2Vzc1Rva2VuKTtcclxuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlblJvb3REYXRhID8gdG9rZW5Sb290RGF0YVtjb25maWcudG9rZW5OYW1lXSA6IGFjY2Vzc1Rva2VuW2NvbmZpZy50b2tlbk5hbWVdO1xyXG4gICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgIH1cclxuICAgICAgLy8gY29uc3QgdG9rZW5QYXRoID0gdGhpcy50b2tlblJvb3QgPyB0aGlzLnRva2VuUm9vdCArICcuJyArIHRoaXMudG9rZW5OYW1lIDogdGhpcy50b2tlbk5hbWU7XHJcbiAgICAgIC8vIGNvbnNvbGUud2FybignRXhwZWN0aW5nIGEgdG9rZW4gbmFtZWQgXCInICsgdG9rZW5QYXRoKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgcHJvdmlkZXJzOiB7fVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQ09ORklHX09QVElPTlMpIG9wdGlvbnM6IElQYXJ0aWFsQ29uZmlnT3B0aW9ucykge1xyXG4gICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgIC4uLm9wdGlvbnNcclxuICAgIH07XHJcbiAgICB0aGlzLm1lcmdlV2l0aERlZmF1bHRQcm92aWRlcnMoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVByb3ZpZGVycyhwcm92aWRlcnM6IElQcm92aWRlcnMpIHtcclxuICAgIHRoaXMub3B0aW9ucy5wcm92aWRlcnMgPSB7XHJcbiAgICAgIC4uLih0aGlzLm9wdGlvbnMucHJvdmlkZXJzIHx8IHt9KSxcclxuICAgICAgLi4ucHJvdmlkZXJzXHJcbiAgICB9O1xyXG4gICAgdGhpcy5tZXJnZVdpdGhEZWZhdWx0UHJvdmlkZXJzKCk7XHJcbiAgfVxyXG5cclxuICBtZXJnZVdpdGhEZWZhdWx0UHJvdmlkZXJzKCkge1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5vcHRpb25zLnByb3ZpZGVycykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBpZiAoa2V5IGluIGRlZmF1bHRQcm92aWRlcnMpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMucHJvdmlkZXJzW2tleV0gPSB7XHJcbiAgICAgICAgICAuLi5kZWZhdWx0UHJvdmlkZXJzW2tleV0sXHJcbiAgICAgICAgICAuLi50aGlzLm9wdGlvbnMucHJvdmlkZXJzW2tleV1cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdG9yYWdlU2VydmljZSB7XHJcbiAgYWJzdHJhY3QgdXBkYXRlU3RvcmFnZVR5cGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKTogYm9vbGVhbjtcclxuXHJcbiAgYWJzdHJhY3QgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nO1xyXG5cclxuICBhYnN0cmFjdCBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRhdGU6IHN0cmluZyk6IHZvaWQ7XHJcblxyXG4gIGFic3RyYWN0IHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQnJvd3NlclN0b3JhZ2VTZXJ2aWNlIGV4dGVuZHMgU3RvcmFnZVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgc3RvcmU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcclxuICBwcml2YXRlIHN0b3JhZ2VUeXBlID0gU3RvcmFnZVR5cGUuTUVNT1JZO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmICghdGhpcy51cGRhdGVTdG9yYWdlVHlwZShjb25maWcub3B0aW9ucy5zdG9yYWdlVHlwZSkpIHtcclxuICAgICAgY29uc29sZS53YXJuKGNvbmZpZy5vcHRpb25zLnN0b3JhZ2VUeXBlICsgJyBpcyBub3QgYXZhaWxhYmxlLicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZVN0b3JhZ2VUeXBlKHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSkge1xyXG4gICAgY29uc3QgaXNTdG9yYWdlQXZhaWxhYmxlID0gdGhpcy5jaGVja0lzU3RvcmFnZUF2YWlsYWJsZShzdG9yYWdlVHlwZSk7XHJcbiAgICBpZiAoIWlzU3RvcmFnZUF2YWlsYWJsZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0b3JhZ2VUeXBlID0gc3RvcmFnZVR5cGU7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpIHtcclxuICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xyXG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLkNPT0tJRTpcclxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5TRVNTSU9OX0NPT0tJRTpcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb29raWUoa2V5KTtcclxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5MT0NBTF9TVE9SQUdFOlxyXG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fU1RPUkFHRTpcclxuICAgICAgICByZXR1cm4gd2luZG93W3RoaXMuc3RvcmFnZVR5cGVdLmdldEl0ZW0oa2V5KTtcclxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5NRU1PUlk6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVba2V5XTtcclxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5OT05FOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZGF0ZTogc3RyaW5nKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMuc3RvcmFnZVR5cGUpIHtcclxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5DT09LSUU6XHJcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9DT09LSUU6XHJcbiAgICAgICAgdGhpcy5zZXRDb29raWUoa2V5LCB2YWx1ZSwgdGhpcy5zdG9yYWdlVHlwZSA9PT0gU3RvcmFnZVR5cGUuQ09PS0lFID8gZGF0ZSA6ICcnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5MT0NBTF9TVE9SQUdFOlxyXG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fU1RPUkFHRTpcclxuICAgICAgICB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksIHZhbHVlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5NRU1PUlk6XHJcbiAgICAgICAgdGhpcy5zdG9yZVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTk9ORTpcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmUoa2V5OiBzdHJpbmcpIHtcclxuICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xyXG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLkNPT0tJRTpcclxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5TRVNTSU9OX0NPT0tJRTpcclxuICAgICAgICB0aGlzLnJlbW92ZUNvb2tpZShrZXkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLkxPQ0FMX1NUT1JBR0U6XHJcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9TVE9SQUdFOlxyXG4gICAgICAgIHdpbmRvd1t0aGlzLnN0b3JhZ2VUeXBlXS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTUVNT1JZOlxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnN0b3JlW2tleV07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTk9ORTpcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2hlY2tJc1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKSB7XHJcbiAgICBzd2l0Y2ggKHN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuQ09PS0lFOlxyXG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fQ09PS0lFOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmlzQ29va2llU3RvcmFnZUF2YWlsYWJsZSgpO1xyXG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLkxPQ0FMX1NUT1JBR0U6XHJcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9TVE9SQUdFOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmlzV2luZG93U3RvcmFnZUF2YWlsYWJsZShzdG9yYWdlVHlwZSk7XHJcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTk9ORTpcclxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5NRU1PUlk6XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc1dpbmRvd1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLlNFU1NJT05fU1RPUkFHRSB8IFN0b3JhZ2VUeXBlLkxPQ0FMX1NUT1JBR0UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IHdpbmRvdyAmJiBzdG9yYWdlVHlwZSBpbiB3aW5kb3cgJiYgd2luZG93W3N0b3JhZ2VUeXBlXSAhPT0gbnVsbDtcclxuXHJcbiAgICAgIGlmIChzdXBwb3J0ZWQpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBNYXRoLnJhbmRvbSgpXHJcbiAgICAgICAgICAudG9TdHJpbmcoMzYpXHJcbiAgICAgICAgICAuc3Vic3RyaW5nKDcpO1xyXG4gICAgICAgIHdpbmRvd1tzdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksICcnKTtcclxuICAgICAgICB3aW5kb3dbc3RvcmFnZVR5cGVdLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0Nvb2tpZVN0b3JhZ2VBdmFpbGFibGUoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzdXBwb3J0ZWQgPSBkb2N1bWVudCAmJiAnY29va2llJyBpbiBkb2N1bWVudDtcclxuXHJcbiAgICAgIGlmIChzdXBwb3J0ZWQpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBNYXRoLnJhbmRvbSgpXHJcbiAgICAgICAgICAudG9TdHJpbmcoMzYpXHJcbiAgICAgICAgICAuc3Vic3RyaW5nKDcpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29va2llKGtleSwgJ3Rlc3QnLCBuZXcgRGF0ZShEYXRlLm5vdygpICsgNjAgKiAxMDAwKS50b1VUQ1N0cmluZygpKTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0Q29va2llKGtleSk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDb29raWUoa2V5KTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT09ICd0ZXN0JztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0Q29va2llKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBleHBpcmVzID0gJycsIHBhdGggPSAnLycpIHtcclxuICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2tleX09JHt2YWx1ZX0ke2V4cGlyZXMgPyBgOyBleHBpcmVzPSR7ZXhwaXJlc31gIDogJyd9OyBwYXRoPSR7cGF0aH1gO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVDb29raWUoa2V5OiBzdHJpbmcsIHBhdGggPSAnLycpIHtcclxuICAgIHRoaXMuc2V0Q29va2llKGtleSwgJycsIG5ldyBEYXRlKDApLnRvVVRDU3RyaW5nKCksIHBhdGgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRDb29raWUoa2V5OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKGAoPzooPzpefC4qO1xcXFxzKikke2tleX1cXFxccypcXFxcPVxcXFxzKihbXjtdKikuKiQpfF4uKiRgKSwgJyQxJyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuaW1wb3J0IHsgU3Vic2NyaWJlciwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2hhcmVkU2VydmljZSB7XHJcbiAgcHVibGljIHRva2VuTmFtZSA9IHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5QcmVmaXhcclxuICAgID8gW3RoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5QcmVmaXgsIHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5OYW1lXS5qb2luKHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5TZXBhcmF0b3IpXHJcbiAgICA6IHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5OYW1lO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge31cclxuXHJcbiAgcHVibGljIGdldFRva2VuKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy50b2tlbk5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFBheWxvYWQodG9rZW4gPSB0aGlzLmdldFRva2VuKCkpIHtcclxuICAgIGlmICh0b2tlbiAmJiB0b2tlbi5zcGxpdCgnLicpLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KCcuJylbMV07XHJcbiAgICAgICAgY29uc3QgYmFzZTY0ID0gYmFzZTY0VXJsLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5iNjREZWNvZGVVbmljb2RlKGJhc2U2NCkpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFRva2VuKHJlc3BvbnNlOiBzdHJpbmcgfCBvYmplY3QpIHtcclxuICAgIGlmICghcmVzcG9uc2UpIHtcclxuICAgICAgLy8gY29uc29sZS53YXJuKCdDYW5cXCd0IHNldCB0b2tlbiB3aXRob3V0IHBhc3NpbmcgYSB2YWx1ZScpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRva2VuOiBzdHJpbmc7XHJcbiAgICBpZiAodHlwZW9mIHJlc3BvbnNlID09PSAnc3RyaW5nJykge1xyXG4gICAgICB0b2tlbiA9IHJlc3BvbnNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9rZW4gPSB0aGlzLmNvbmZpZy5vcHRpb25zLnJlc29sdmVUb2tlbihyZXNwb25zZSwgdGhpcy5jb25maWcub3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRva2VuKSB7XHJcbiAgICAgIGNvbnN0IGV4cERhdGUgPSB0aGlzLmdldEV4cGlyYXRpb25EYXRlKHRva2VuKTtcclxuICAgICAgdGhpcy5zdG9yYWdlLnNldCh0aGlzLnRva2VuTmFtZSwgdG9rZW4sIGV4cERhdGUgPyBleHBEYXRlLnRvVVRDU3RyaW5nKCkgOiAnJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlVG9rZW4oKSB7XHJcbiAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMudG9rZW5OYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc0F1dGhlbnRpY2F0ZWQodG9rZW4gPSB0aGlzLmdldFRva2VuKCkpIHtcclxuICAgIC8vIGEgdG9rZW4gaXMgcHJlc2VudFxyXG4gICAgaWYgKHRva2VuKSB7XHJcbiAgICAgIC8vIHRva2VuIHdpdGggYSB2YWxpZCBKV1QgZm9ybWF0IFhYWC5ZWVkuWlpaXHJcbiAgICAgIGlmICh0b2tlbi5zcGxpdCgnLicpLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgIC8vIGNvdWxkIGJlIGEgdmFsaWQgSldUIG9yIGFuIGFjY2VzcyB0b2tlbiB3aXRoIHRoZSBzYW1lIGZvcm1hdFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xyXG4gICAgICAgICAgY29uc3QgYmFzZTY0ID0gYmFzZTY0VXJsLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XHJcbiAgICAgICAgICBjb25zdCBleHAgPSBKU09OLnBhcnNlKHRoaXMuYjY0RGVjb2RlVW5pY29kZShiYXNlNjQpKS5leHA7XHJcbiAgICAgICAgICAvLyBqd3Qgd2l0aCBhbiBvcHRpb25hbCBleHBpcmF0aW9uIGNsYWltc1xyXG4gICAgICAgICAgaWYgKGV4cCkge1xyXG4gICAgICAgICAgICBjb25zdCBpc0V4cGlyZWQgPSBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCkgPj0gZXhwO1xyXG4gICAgICAgICAgICBpZiAoaXNFeHBpcmVkKSB7XHJcbiAgICAgICAgICAgICAgLy8gZmFpbDogRXhwaXJlZCB0b2tlblxyXG4gICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy50b2tlbk5hbWUpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBwYXNzOiBOb24tZXhwaXJlZCB0b2tlblxyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgLy8gcGFzczogTm9uLUpXVCB0b2tlbiB0aGF0IGxvb2tzIGxpa2UgSldUXHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gcGFzczogQWxsIG90aGVyIHRva2Vuc1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vIGxhaWw6IE5vIHRva2VuIGF0IGFsbFxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEV4cGlyYXRpb25EYXRlKHRva2VuID0gdGhpcy5nZXRUb2tlbigpKSB7XHJcbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZXRQYXlsb2FkKHRva2VuKTtcclxuICAgIGlmIChwYXlsb2FkICYmIHBheWxvYWQuZXhwICYmIE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKSA8IHBheWxvYWQuZXhwKSB7XHJcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgwKTtcclxuICAgICAgZGF0ZS5zZXRVVENTZWNvbmRzKHBheWxvYWQuZXhwKTtcclxuICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2dvdXQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IFN1YnNjcmliZXI8YW55PikgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMudG9rZW5OYW1lKTtcclxuICAgICAgb2JzZXJ2ZXIubmV4dCgpO1xyXG4gICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0U3RvcmFnZVR5cGUodHlwZTogU3RvcmFnZVR5cGUpIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UudXBkYXRlU3RvcmFnZVR5cGUodHlwZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGI2NERlY29kZVVuaWNvZGUoc3RyKSB7XHJcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChhdG9iKHN0ciksIGMgPT4gJyUnICsgKCcwMCcgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikpLmpvaW4oJycpKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0LCBIdHRwSGFuZGxlciwgSHR0cEV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSnd0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge31cclxuXHJcbiAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XHJcbiAgICBjb25zdCB7IGF1dGhIZWFkZXIsIGF1dGhUb2tlbiB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcclxuICAgIGNvbnN0IHRva2VuID0gdGhpcy5zaGFyZWQuZ2V0VG9rZW4oKTtcclxuICAgIGNvbnN0IGlzQXV0aGVudGljYXRlZCA9IHRoaXMuc2hhcmVkLmlzQXV0aGVudGljYXRlZCgpO1xyXG4gICAgY29uc3QgbmV3UmVxID1cclxuICAgICAgaXNBdXRoZW50aWNhdGVkICYmICFyZXEuaGVhZGVycy5oYXMoYXV0aEhlYWRlcikgPyByZXEuY2xvbmUoeyBzZXRIZWFkZXJzOiB7IFthdXRoSGVhZGVyXTogYCR7YXV0aFRva2VufSAke3Rva2VufWAgfSB9KSA6IHJlcTtcclxuICAgIHJldHVybiBuZXh0LmhhbmRsZShuZXdSZXEpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGVtcHR5LCBmcm9tRXZlbnQsIGludGVydmFsLCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVsYXksIG1hcCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBJT2F1dGgxT3B0aW9ucywgSU9hdXRoMk9wdGlvbnMsIElQb3B1cE9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy1pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgZ2V0V2luZG93T3JpZ2luIH0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5kZWNsYXJlIGNvbnN0IGNvcmRvdmE6IGFueTtcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUG9wdXBTZXJ2aWNlIHtcclxuICBwdWJsaWMgb3Blbih1cmw6IHN0cmluZywgb3B0aW9uczogSU9hdXRoMk9wdGlvbnMgfCBJT2F1dGgxT3B0aW9ucywgY29yZG92YSA9IHRoaXMuaXNDb3Jkb3ZhQXBwKCkpIHtcclxuICAgIGNvbnN0IHN0cmluZ2lmaWVkT3B0aW9ucyA9IHRoaXMuc3RyaW5naWZ5T3B0aW9ucyh0aGlzLnByZXBhcmVPcHRpb25zKG9wdGlvbnMucG9wdXBPcHRpb25zKSk7XHJcbiAgICBjb25zdCB3aW5kb3dOYW1lID0gY29yZG92YSA/ICdfYmxhbmsnIDogb3B0aW9ucy5uYW1lO1xyXG5cclxuICAgIGNvbnN0IHBvcHVwV2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cub3Blbih1cmwsIHdpbmRvd05hbWUsIHN0cmluZ2lmaWVkT3B0aW9ucykgOiBudWxsO1xyXG5cclxuICAgIGlmIChwb3B1cFdpbmRvdykge1xyXG4gICAgICBpZiAocG9wdXBXaW5kb3cuZm9jdXMpIHtcclxuICAgICAgICBwb3B1cFdpbmRvdy5mb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvZihwb3B1cFdpbmRvdyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW1wdHkoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB3YWl0Rm9yQ2xvc2UocG9wdXBXaW5kb3c6IFdpbmRvdywgY29yZG92YSA9IHRoaXMuaXNDb3Jkb3ZhQXBwKCksIHJlZGlyZWN0VXJpID0gZ2V0V2luZG93T3JpZ2luKCkpIHtcclxuICAgIHJldHVybiBjb3Jkb3ZhID8gdGhpcy5ldmVudExpc3RlbmVyKHBvcHVwV2luZG93LCByZWRpcmVjdFVyaSkgOiB0aGlzLnBvbGxQb3B1cChwb3B1cFdpbmRvdywgcmVkaXJlY3RVcmkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBldmVudExpc3RlbmVyKHBvcHVwV2luZG93OiBXaW5kb3csIHJlZGlyZWN0VXJpID0gZ2V0V2luZG93T3JpZ2luKCkpIHtcclxuICAgIGlmICghcG9wdXBXaW5kb3cpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3B1cCB3YXMgbm90IGNyZWF0ZWQnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtZXJnZShcclxuICAgICAgZnJvbUV2ZW50PEV2ZW50Pihwb3B1cFdpbmRvdywgJ2V4aXQnKS5waXBlKFxyXG4gICAgICAgIGRlbGF5KDEwMCksXHJcbiAgICAgICAgbWFwKCgpID0+IHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKTtcclxuICAgICAgICB9KVxyXG4gICAgICApLFxyXG4gICAgICBmcm9tRXZlbnQocG9wdXBXaW5kb3csICdsb2Fkc3RhcnQnKVxyXG4gICAgKS5waXBlKFxyXG4gICAgICBzd2l0Y2hNYXAoKGV2ZW50OiBFdmVudCAmIHsgdXJsOiBzdHJpbmcgfSkgPT4ge1xyXG4gICAgICAgIGlmICghcG9wdXBXaW5kb3cgfHwgcG9wdXBXaW5kb3cuY2xvc2VkKSB7XHJcbiAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIENhbmNlbGVkJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQudXJsLmluZGV4T2YocmVkaXJlY3RVcmkpICE9PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gZW1wdHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICBwYXJzZXIuaHJlZiA9IGV2ZW50LnVybDtcclxuXHJcbiAgICAgICAgaWYgKHBhcnNlci5zZWFyY2ggfHwgcGFyc2VyLmhhc2gpIHtcclxuICAgICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gcGFyc2VyLnNlYXJjaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuICAgICAgICAgIGNvbnN0IGhhc2hQYXJhbXMgPSBwYXJzZXIuaGFzaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaGFzaFBhcmFtcyk7XHJcbiAgICAgICAgICBjb25zdCBxcyA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgICBjb25zdCBhbGxQYXJhbXMgPSB7IC4uLnFzLCAuLi5oYXNoIH07XHJcblxyXG4gICAgICAgICAgcG9wdXBXaW5kb3cuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgICBpZiAoYWxsUGFyYW1zLmVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IGFsbFBhcmFtcy5lcnJvcjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihhbGxQYXJhbXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZW1wdHkoKTtcclxuICAgICAgfSksXHJcbiAgICAgIHRha2UoMSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBvbGxQb3B1cChwb3B1cFdpbmRvdzogV2luZG93LCByZWRpcmVjdFVyaSA9IGdldFdpbmRvd09yaWdpbigpKSB7XHJcbiAgICByZXR1cm4gaW50ZXJ2YWwoNTApLnBpcGUoXHJcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFwb3B1cFdpbmRvdyB8fCBwb3B1cFdpbmRvdy5jbG9zZWQpIHtcclxuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwb3B1cFdpbmRvd09yaWdpbiA9IGdldFdpbmRvd09yaWdpbihwb3B1cFdpbmRvdyk7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHBvcHVwV2luZG93T3JpZ2luICYmXHJcbiAgICAgICAgICAocmVkaXJlY3RVcmkuaW5kZXhPZihwb3B1cFdpbmRvd09yaWdpbikgPT09IDAgfHwgcG9wdXBXaW5kb3dPcmlnaW4uaW5kZXhPZihyZWRpcmVjdFVyaSkgPT09IDApICYmXHJcbiAgICAgICAgICAocG9wdXBXaW5kb3cubG9jYXRpb24uc2VhcmNoIHx8IHBvcHVwV2luZG93LmxvY2F0aW9uLmhhc2gpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHBvcHVwV2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuICAgICAgICAgIGNvbnN0IGhhc2hQYXJhbXMgPSBwb3B1cFdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9bXFwvJF0vLCAnJyk7XHJcbiAgICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKGhhc2hQYXJhbXMpO1xyXG4gICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcocXVlcnlQYXJhbXMpO1xyXG4gICAgICAgICAgcG9wdXBXaW5kb3cuY2xvc2UoKTtcclxuICAgICAgICAgIGNvbnN0IGFsbFBhcmFtcyA9IHsgLi4ucXMsIC4uLmhhc2ggfTtcclxuICAgICAgICAgIGlmIChhbGxQYXJhbXMuZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgYWxsUGFyYW1zLmVycm9yO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGFsbFBhcmFtcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbXB0eSgpO1xyXG4gICAgICB9KSxcclxuICAgICAgdGFrZSgxKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHJlcGFyZU9wdGlvbnMob3B0aW9ucz86IElQb3B1cE9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgY29uc3Qgd2lkdGggPSBvcHRpb25zLndpZHRoIHx8IDUwMDtcclxuICAgIGNvbnN0IGhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IDUwMDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIGxlZnQ6IHdpbmRvdy5zY3JlZW5YICsgKHdpbmRvdy5vdXRlcldpZHRoIC0gd2lkdGgpIC8gMixcclxuICAgICAgdG9wOiB3aW5kb3cuc2NyZWVuWSArICh3aW5kb3cub3V0ZXJIZWlnaHQgLSBoZWlnaHQpIC8gMi41LFxyXG4gICAgICB0b29sYmFyOiBvcHRpb25zLnZpc2libGVUb29sYmFyID8gJ3llcycgOiAnbm8nLFxyXG4gICAgICAuLi5vcHRpb25zXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdHJpbmdpZnlPcHRpb25zKG9wdGlvbnM6IHsgW2luZGV4OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCB9KSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob3B0aW9ucylcclxuICAgICAgLm1hcChrZXkgPT4gKG9wdGlvbnNba2V5XSA9PT0gbnVsbCB8fCBvcHRpb25zW2tleV0gPT09IHVuZGVmaW5lZCA/IGtleSA6IGtleSArICc9JyArIG9wdGlvbnNba2V5XSkpXHJcbiAgICAgIC5qb2luKCcsJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlUXVlcnlTdHJpbmcoam9pbmVkS2V5VmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICBsZXQga2V5O1xyXG4gICAgbGV0IHZhbHVlO1xyXG4gICAgcmV0dXJuIGpvaW5lZEtleVZhbHVlLnNwbGl0KCcmJykucmVkdWNlKFxyXG4gICAgICAob2JqLCBrZXlWYWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmIChrZXlWYWx1ZSkge1xyXG4gICAgICAgICAgdmFsdWUgPSBrZXlWYWx1ZS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlWzBdKTtcclxuICAgICAgICAgIG9ialtrZXldID0gdHlwZW9mIHZhbHVlWzFdICE9PSAndW5kZWZpbmVkJyA/IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZVsxXSkgOiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICB9LFxyXG4gICAgICB7fSBhcyB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfCB0cnVlIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzQ29yZG92YUFwcCgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgY29yZG92YSA9PT0gJ29iamVjdCcgfHwgKGRvY3VtZW50LlVSTC5pbmRleE9mKCdodHRwOi8vJykgPT09IC0xICYmIGRvY3VtZW50LlVSTC5pbmRleE9mKCdodHRwczovLycpID09PSAtMSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBJT2F1dGgxT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IElPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBidWlsZFF1ZXJ5U3RyaW5nLCBqb2luVXJsIH0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPYXV0aDFTZXJ2aWNlIGltcGxlbWVudHMgSU9hdXRoU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIHBvcHVwOiBQb3B1cFNlcnZpY2UsIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7fVxyXG5cclxuICBvcGVuPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmcgPSBhbnk+KG9hdXRoT3B0aW9uczogSU9hdXRoMU9wdGlvbnMsIHVzZXJEYXRhOiBvYmplY3QpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIGNvbnN0IHNlcnZlclVybCA9IHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCA/IGpvaW5VcmwodGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsLCBvYXV0aE9wdGlvbnMudXJsKSA6IG9hdXRoT3B0aW9ucy51cmw7XHJcbiAgICByZXR1cm4gdGhpcy5wb3B1cC5vcGVuKCdhYm91dDpibGFuaycsIG9hdXRoT3B0aW9ucywgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhKS5waXBlKFxyXG4gICAgICBzd2l0Y2hNYXAocG9wdXBXaW5kb3cgPT5cclxuICAgICAgICB0aGlzLmh0dHAucG9zdDxvYmplY3Q+KHNlcnZlclVybCwgb2F1dGhPcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgdGFwKGF1dGhvcml6YXRpb25EYXRhID0+XHJcbiAgICAgICAgICAgIHBvcHVwV2luZG93XHJcbiAgICAgICAgICAgICAgPyBwb3B1cFdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKFtvYXV0aE9wdGlvbnMuYXV0aG9yaXphdGlvbkVuZHBvaW50LCBidWlsZFF1ZXJ5U3RyaW5nKGF1dGhvcml6YXRpb25EYXRhKV0uam9pbignPycpKVxyXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICAgc3dpdGNoTWFwKGF1dGhvcml6YXRpb25EYXRhID0+XHJcbiAgICAgICAgICAgIHRoaXMucG9wdXBcclxuICAgICAgICAgICAgICAud2FpdEZvckNsb3NlKHBvcHVwV2luZG93LCB0aGlzLmNvbmZpZy5vcHRpb25zLmNvcmRvdmEsIG9hdXRoT3B0aW9ucy5yZWRpcmVjdFVyaSlcclxuICAgICAgICAgICAgICAucGlwZShtYXAob2F1dGhEYXRhID0+ICh7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEgfSkpKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgKSxcclxuICAgICAgc3dpdGNoTWFwKCh7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEgfSkgPT4gdGhpcy5leGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXhjaGFuZ2VGb3JUb2tlbjxUPihvYXV0aE9wdGlvbnM6IElPYXV0aDFPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YTogb2JqZWN0LCBvYXV0aERhdGE6IG9iamVjdCwgdXNlckRhdGE6IG9iamVjdCkge1xyXG4gICAgY29uc3QgYm9keSA9IHsgb2F1dGhPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSB9O1xyXG4gICAgY29uc3QgeyB3aXRoQ3JlZGVudGlhbHMsIGJhc2VVcmwgfSA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XHJcbiAgICBjb25zdCB7IG1ldGhvZCA9ICdQT1NUJywgdXJsIH0gPSBvYXV0aE9wdGlvbnM7XHJcbiAgICBjb25zdCBleGNoYW5nZUZvclRva2VuVXJsID0gYmFzZVVybCA/IGpvaW5VcmwoYmFzZVVybCwgdXJsKSA6IHVybDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIGV4Y2hhbmdlRm9yVG9rZW5VcmwsIHsgYm9keSwgd2l0aENyZWRlbnRpYWxzIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGVtcHR5LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IElPYXV0aDJPcHRpb25zIH0gZnJvbSAnLi9jb25maWctaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSU9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZSc7XHJcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XHJcbmltcG9ydCB7IGJ1aWxkUXVlcnlTdHJpbmcsIGdldFdpbmRvd09yaWdpbiwgam9pblVybCB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT2F1dGgyU2VydmljZSBpbXBsZW1lbnRzIElPYXV0aFNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBwb3B1cDogUG9wdXBTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge31cclxuXHJcbiAgb3BlbjxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nID0gYW55PihvYXV0aE9wdGlvbnM6IElPYXV0aDJPcHRpb25zLCB1c2VyRGF0YTogb2JqZWN0KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICBjb25zdCBhdXRob3JpemF0aW9uRGF0YSA9IHRoaXMuZ2V0QXV0aG9yaXphdGlvbkRhdGEob2F1dGhPcHRpb25zKTtcclxuICAgIGNvbnN0IHVybCA9IFtvYXV0aE9wdGlvbnMuYXV0aG9yaXphdGlvbkVuZHBvaW50LCBidWlsZFF1ZXJ5U3RyaW5nKGF1dGhvcml6YXRpb25EYXRhKV0uam9pbignPycpO1xyXG4gICAgcmV0dXJuIHRoaXMucG9wdXAub3Blbih1cmwsIG9hdXRoT3B0aW9ucywgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhKS5waXBlKFxyXG4gICAgICBzd2l0Y2hNYXAoKHdpbmRvdz86IFdpbmRvdykgPT5cclxuICAgICAgICB3aW5kb3cgPyB0aGlzLnBvcHVwLndhaXRGb3JDbG9zZSh3aW5kb3csIHRoaXMuY29uZmlnLm9wdGlvbnMuY29yZG92YSwgb2F1dGhPcHRpb25zLnJlZGlyZWN0VXJpKSA6IGVtcHR5KClcclxuICAgICAgKSxcclxuICAgICAgc3dpdGNoTWFwKChvYXV0aERhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vIHdoZW4gbm8gc2VydmVyIFVSTCBwcm92aWRlZCwgcmV0dXJuIHBvcHVwIHBhcmFtcyBhcy1pcy5cclxuICAgICAgICAvLyB0aGlzIGlzIGZvciBhIHNjZW5hcmlvIHdoZW4gc29tZW9uZSB3aXNoZXMgdG8gb3B0IG91dCBmcm9tXHJcbiAgICAgICAgLy8gc2F0ZWxsaXplcidzIG1hZ2ljIGJ5IGRvaW5nIGF1dGhvcml6YXRpb24gY29kZSBleGNoYW5nZSBhbmRcclxuICAgICAgICAvLyBzYXZpbmcgYSB0b2tlbiBtYW51YWxseS5cclxuICAgICAgICBpZiAob2F1dGhPcHRpb25zLnJlc3BvbnNlVHlwZSA9PT0gJ3Rva2VuJyB8fCAhb2F1dGhPcHRpb25zLnVybCkge1xyXG4gICAgICAgICAgcmV0dXJuIG9mKG9hdXRoRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob2F1dGhEYXRhLnN0YXRlICYmIG9hdXRoRGF0YS5zdGF0ZSAhPT0gYXV0aG9yaXphdGlvbkRhdGEuc3RhdGUpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT0F1dGggXCJzdGF0ZVwiIG1pc21hdGNoJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmV4Y2hhbmdlRm9yVG9rZW48VD4ob2F1dGhPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleGNoYW5nZUZvclRva2VuPFQ+KG9wdGlvbnM6IElPYXV0aDJPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YTogb2JqZWN0LCBvYXV0aERhdGE6IG9iamVjdCwgdXNlckRhdGE6IG9iamVjdCkge1xyXG4gICAgY29uc3QgYm9keSA9IHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEgfTtcclxuICAgIGNvbnN0IHsgYmFzZVVybCwgd2l0aENyZWRlbnRpYWxzIH0gPSB0aGlzLmNvbmZpZy5vcHRpb25zO1xyXG4gICAgY29uc3QgeyB1cmwsIG1ldGhvZCA9ICdQT1NUJyB9ID0gb3B0aW9ucztcclxuICAgIGNvbnN0IGV4Y2hhbmdlRm9yVG9rZW5VcmwgPSBiYXNlVXJsID8gam9pblVybChiYXNlVXJsLCB1cmwpIDogdXJsO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0PFQ+KG1ldGhvZCwgZXhjaGFuZ2VGb3JUb2tlblVybCwgeyBib2R5LCB3aXRoQ3JlZGVudGlhbHMgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEF1dGhvcml6YXRpb25EYXRhKG9wdGlvbnM6IElPYXV0aDJPcHRpb25zKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHJlc3BvbnNlVHlwZSA9ICdjb2RlJyxcclxuICAgICAgY2xpZW50SWQsXHJcbiAgICAgIHJlZGlyZWN0VXJpID0gZ2V0V2luZG93T3JpZ2luKCkgfHwgJycsXHJcbiAgICAgIHNjb3BlRGVsaW1pdGVyID0gJywnLFxyXG4gICAgICBzY29wZSxcclxuICAgICAgc3RhdGUsXHJcbiAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXNcclxuICAgIH0gPSBvcHRpb25zO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHR5cGVvZiBzdGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IHN0YXRlKCkgOiBzdGF0ZTtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIFsncmVzcG9uc2VfdHlwZScsIHJlc3BvbnNlVHlwZV0sXHJcbiAgICAgIFsnY2xpZW50X2lkJywgY2xpZW50SWRdLFxyXG4gICAgICBbJ3JlZGlyZWN0X3VyaScsIHJlZGlyZWN0VXJpXSxcclxuICAgICAgLi4uKHN0YXRlID8gW1snc3RhdGUnLCByZXNvbHZlZFN0YXRlXV0gOiBbXSksXHJcbiAgICAgIC4uLihzY29wZSA/IFtbJ3Njb3BlJywgc2NvcGUuam9pbihzY29wZURlbGltaXRlcildXSA6IFtdKSxcclxuICAgICAgLi4uKGFkZGl0aW9uYWxVcmxQYXJhbXNcclxuICAgICAgICA/IE9iamVjdC5rZXlzKGFkZGl0aW9uYWxVcmxQYXJhbXMpLm1hcChrZXkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nIHwgKCgpID0+IHN0cmluZykgfCBudWxsIHwgdW5kZWZpbmVkID0gKGFkZGl0aW9uYWxVcmxQYXJhbXMgYXMgYW55KVtrZXldO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlKCldO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtrZXksICcnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gWycnLCAnJ107XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIDogW10pXHJcbiAgICBdXHJcbiAgICAgIC5maWx0ZXIoXyA9PiAhIV9bMF0pXHJcbiAgICAgIC5yZWR1Y2UoKGFjYywgbmV4dCkgPT4gKHsgLi4uYWNjLCBbbmV4dFswXV06IG5leHRbMV0gfSksIHt9IGFzIHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBqb2luVXJsIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgT2F1dGgxU2VydmljZSB9IGZyb20gJy4vb2F1dGgxLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYXV0aDJTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aDIuc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IElPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT2F1dGhTZXJ2aWNlIHtcclxuICByZWFkb25seSBkZXBQcm92aWRlcnMgPSBbXHJcbiAgICB7IHByb3ZpZGU6IEh0dHBDbGllbnQsIHVzZVZhbHVlOiB0aGlzLmh0dHAgfSxcclxuICAgIHsgcHJvdmlkZTogUG9wdXBTZXJ2aWNlLCB1c2VWYWx1ZTogdGhpcy5wb3B1cCB9LFxyXG4gICAgeyBwcm92aWRlOiBDb25maWdTZXJ2aWNlLCB1c2VWYWx1ZTogdGhpcy5jb25maWcgfVxyXG4gIF07XHJcbiAgcmVhZG9ubHkgZGVwcyA9IFtIdHRwQ2xpZW50LCBQb3B1cFNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSwgcHJpdmF0ZSBwb3B1cDogUG9wdXBTZXJ2aWNlKSB7fVxyXG5cclxuICBwdWJsaWMgYXV0aGVudGljYXRlPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmc+KG5hbWU6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIGNvbnN0IHByb3ZpZGVyOiBJT2F1dGhTZXJ2aWNlID1cclxuICAgICAgdGhpcy5jb25maWcub3B0aW9ucy5wcm92aWRlcnNbbmFtZV0ub2F1dGhUeXBlID09PSAnMS4wJ1xyXG4gICAgICAgID8gSW5qZWN0b3IuY3JlYXRlKFsuLi50aGlzLmRlcFByb3ZpZGVycywgeyBwcm92aWRlOiBPYXV0aDFTZXJ2aWNlLCBkZXBzOiB0aGlzLmRlcHMgfV0pLmdldChPYXV0aDFTZXJ2aWNlKVxyXG4gICAgICAgIDogSW5qZWN0b3IuY3JlYXRlKFsuLi50aGlzLmRlcFByb3ZpZGVycywgeyBwcm92aWRlOiBPYXV0aDJTZXJ2aWNlLCBkZXBzOiB0aGlzLmRlcHMgfV0pLmdldChPYXV0aDJTZXJ2aWNlKTtcclxuXHJcbiAgICByZXR1cm4gcHJvdmlkZXIub3BlbjxUPih0aGlzLmNvbmZpZy5vcHRpb25zLnByb3ZpZGVyc1tuYW1lXSwgdXNlckRhdGEgfHwge30pLnBpcGUoXHJcbiAgICAgIHRhcChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgLy8gdGhpcyBpcyBmb3IgYSBzY2VuYXJpbyB3aGVuIHNvbWVvbmUgd2lzaGVzIHRvIG9wdCBvdXQgZnJvbVxyXG4gICAgICAgIC8vIHNhdGVsbGl6ZXIncyBtYWdpYyBieSBkb2luZyBhdXRob3JpemF0aW9uIGNvZGUgZXhjaGFuZ2UgYW5kXHJcbiAgICAgICAgLy8gc2F2aW5nIGEgdG9rZW4gbWFudWFsbHkuXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLm9wdGlvbnMucHJvdmlkZXJzW25hbWVdLnVybCkge1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWQuc2V0VG9rZW4ocmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdW5saW5rPFQ+KHByb3ZpZGVyOiBzdHJpbmcsIHVybCA9IGpvaW5VcmwodGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsLCB0aGlzLmNvbmZpZy5vcHRpb25zLnVubGlua1VybCksIG1ldGhvZCA9ICdQT1NUJykge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0PFQ+KG1ldGhvZCwgdXJsLCB7IGJvZHk6IHsgcHJvdmlkZXIgfSB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgam9pblVybCB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExvY2FsU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIHNoYXJlZDogU2hhcmVkU2VydmljZSwgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHt9XHJcblxyXG4gIHB1YmxpYyBsb2dpbjxUIGV4dGVuZHMgc3RyaW5nIHwgb2JqZWN0Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAucG9zdDxUPih1cmwgfHwgam9pblVybCh0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwsIHRoaXMuY29uZmlnLm9wdGlvbnMubG9naW5VcmwpLCB1c2VyKVxyXG4gICAgICAucGlwZSh0YXAoZGF0YSA9PiB0aGlzLnNoYXJlZC5zZXRUb2tlbihkYXRhKSkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNpZ251cDxUID0gYW55Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFQ+KHVybCB8fCBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgdGhpcy5jb25maWcub3B0aW9ucy5zaWdudXBVcmwpLCB1c2VyKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IExvY2FsU2VydmljZSB9IGZyb20gJy4vbG9jYWwuc2VydmljZSc7XHJcbmltcG9ydCB7IE9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNoYXJlZDogU2hhcmVkU2VydmljZSwgcHJpdmF0ZSBsb2NhbDogTG9jYWxTZXJ2aWNlLCBwcml2YXRlIG9hdXRoOiBPYXV0aFNlcnZpY2UpIHt9XHJcblxyXG4gIHB1YmxpYyBsb2dpbjxUIGV4dGVuZHMgc3RyaW5nIHwgb2JqZWN0ID0gYW55Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMubG9jYWwubG9naW48VD4odXNlciwgdXJsKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaWdudXA8VCA9IGFueT4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLmxvY2FsLnNpZ251cDxUPih1c2VyLCB1cmwpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ291dCgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLnNoYXJlZC5sb2dvdXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhdXRoZW50aWNhdGU8VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4obmFtZTogc3RyaW5nLCB1c2VyRGF0YT86IGFueSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMub2F1dGguYXV0aGVudGljYXRlPFQ+KG5hbWUsIHVzZXJEYXRhKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsaW5rPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmcgPSBhbnk+KG5hbWU6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLm9hdXRoLmF1dGhlbnRpY2F0ZTxUPihuYW1lLCB1c2VyRGF0YSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdW5saW5rPFQgPSBhbnk+KHByb3ZpZGVyOiBzdHJpbmcsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMub2F1dGgudW5saW5rPFQ+KHByb3ZpZGVyLCB1cmwpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzQXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNoYXJlZC5pc0F1dGhlbnRpY2F0ZWQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRUb2tlbigpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLnNoYXJlZC5nZXRUb2tlbigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFRva2VuKHRva2VuOiBzdHJpbmcgfCBvYmplY3QpOiB2b2lkIHtcclxuICAgIHRoaXMuc2hhcmVkLnNldFRva2VuKHRva2VuKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVUb2tlbigpOiB2b2lkIHtcclxuICAgIHRoaXMuc2hhcmVkLnJlbW92ZVRva2VuKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UGF5bG9hZCgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkLmdldFBheWxvYWQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRTdG9yYWdlVHlwZSh0eXBlOiBTdG9yYWdlVHlwZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkLnNldFN0b3JhZ2VUeXBlKHR5cGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEV4cGlyYXRpb25EYXRlKCk6IERhdGUgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLnNoYXJlZC5nZXRFeHBpcmF0aW9uRGF0ZSgpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlLCBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSUNvbmZpZ09wdGlvbnMsIElQYXJ0aWFsQ29uZmlnT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBDT05GSUdfT1BUSU9OUywgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQnJvd3NlclN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9icm93c2VyLXN0b3JhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSnd0SW50ZXJjZXB0b3IgfSBmcm9tICcuL2ludGVyY2VwdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb2NhbFNlcnZpY2UgfSBmcm9tICcuL2xvY2FsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW10sXHJcbiAgZXhwb3J0czogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nMlVpQXV0aE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnT3B0aW9ucz86IElQYXJ0aWFsQ29uZmlnT3B0aW9ucywgZGVmYXVsdEp3dEludGVyY2VwdG9yID0gdHJ1ZSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IE5nMlVpQXV0aE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgLi4uKGNvbmZpZ09wdGlvbnMgPyBbeyBwcm92aWRlOiBDT05GSUdfT1BUSU9OUywgdXNlVmFsdWU6IGNvbmZpZ09wdGlvbnMgfV0gOiBbXSksXHJcbiAgICAgICAgeyBwcm92aWRlOiBDb25maWdTZXJ2aWNlLCB1c2VDbGFzczogQ29uZmlnU2VydmljZSwgZGVwczogW0NPTkZJR19PUFRJT05TXSB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogU3RvcmFnZVNlcnZpY2UsIHVzZUNsYXNzOiBCcm93c2VyU3RvcmFnZVNlcnZpY2UsIGRlcHM6IFtDb25maWdTZXJ2aWNlXSB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogU2hhcmVkU2VydmljZSwgdXNlQ2xhc3M6IFNoYXJlZFNlcnZpY2UsIGRlcHM6IFtTdG9yYWdlU2VydmljZSwgQ29uZmlnU2VydmljZV0gfSxcclxuICAgICAgICB7IHByb3ZpZGU6IExvY2FsU2VydmljZSwgdXNlQ2xhc3M6IExvY2FsU2VydmljZSwgZGVwczogW0h0dHBDbGllbnQsIFNoYXJlZFNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdIH0sXHJcbiAgICAgICAgeyBwcm92aWRlOiBQb3B1cFNlcnZpY2UsIHVzZUNsYXNzOiBQb3B1cFNlcnZpY2UsIGRlcHM6IFtDb25maWdTZXJ2aWNlXSB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogT2F1dGhTZXJ2aWNlLCB1c2VDbGFzczogT2F1dGhTZXJ2aWNlLCBkZXBzOiBbSHR0cENsaWVudCwgU2hhcmVkU2VydmljZSwgQ29uZmlnU2VydmljZSwgUG9wdXBTZXJ2aWNlXSB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogQXV0aFNlcnZpY2UsIHVzZUNsYXNzOiBBdXRoU2VydmljZSwgZGVwczogW1NoYXJlZFNlcnZpY2UsIExvY2FsU2VydmljZSwgT2F1dGhTZXJ2aWNlXSB9LFxyXG4gICAgICAgIC4uLihkZWZhdWx0Snd0SW50ZXJjZXB0b3JcclxuICAgICAgICAgID8gW3sgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBKd3RJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUsIGRlcHM6IFtTaGFyZWRTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXSB9XVxyXG4gICAgICAgICAgOiBbXSlcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkluamVjdGlvblRva2VuIiwiSW5qZWN0YWJsZSIsIkluamVjdCIsInRzbGliXzEuX19leHRlbmRzIiwiT2JzZXJ2YWJsZSIsIm9mIiwiZW1wdHkiLCJtZXJnZSIsImZyb21FdmVudCIsImRlbGF5IiwibWFwIiwic3dpdGNoTWFwIiwidGFrZSIsImludGVydmFsIiwidGhyb3dFcnJvciIsImh0dHAiLCJ0YXAiLCJIdHRwQ2xpZW50IiwidHNsaWJfMS5fX3NwcmVhZCIsIkluamVjdG9yIiwiSFRUUF9JTlRFUkNFUFRPUlMiLCJOZ01vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUM3QixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7YUFDaEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQy9FLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFFRixhQUFnQixTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDMUIsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQixTQUFTLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ3ZDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekYsQ0FBQztBQUVELElBQU8sSUFBSSxRQUFRLEdBQUc7UUFDbEIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksU0FBUyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDakQsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoRjtZQUNELE9BQU8sQ0FBQyxDQUFDO1NBQ1osQ0FBQTtRQUNELE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFBO0FBRUQsYUE2RWdCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUk7WUFDQSxPQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJO2dCQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlFO1FBQ0QsT0FBTyxLQUFLLEVBQUU7WUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FBRTtnQkFDL0I7WUFDSixJQUFJO2dCQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7b0JBQ087Z0JBQUUsSUFBSSxDQUFDO29CQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQzthQUFFO1NBQ3BDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0FBRUQsYUFBZ0IsUUFBUTtRQUNwQixLQUFLLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUM5QyxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Ozs7Ozs7Ozs7OztBQ3BJRCxhQUFnQixPQUFPLENBQUMsT0FBZSxFQUFFLEdBQVc7UUFDbEQsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbEMsT0FBTyxHQUFHLENBQUM7U0FDWjs7WUFFSyxNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUV2QyxPQUFPLE1BQU07YUFDVixPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQzthQUN0QixPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQzthQUNyQixPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQzthQUNyQixPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7O0FBRUQsYUFBZ0IsZ0JBQWdCLENBQUMsR0FBVztRQUMxQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ3BCLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxRQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQU0sa0JBQWtCLENBQUMsR0FBRyxDQUFDLFNBQUksa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFHLEdBQUcsR0FBRyxJQUFDLENBQUM7YUFDN0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7QUFFRCxhQUFnQixlQUFlLENBQUMsQ0FBVTtRQUN4QyxJQUFJLENBQUMsQ0FBQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUN2QyxDQUFDLEdBQUcsTUFBTSxDQUFDO1NBQ1o7UUFDRCxJQUFJO1lBQ0YsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3RCLE9BQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLFVBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBRSxDQUFDO2FBQ3hHO1lBQ0QsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztTQUMxQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUM7OztTQUdiO0lBQ0gsQ0FBQzs7Ozs7O0FDM0NEO0FBR0EsUUFBYSxnQkFBZ0IsR0FBZTtRQUMxQyxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsVUFBVTtZQUNoQixHQUFHLEVBQUUsZ0JBQWdCO1lBQ3JCLFdBQVcsRUFBSyxlQUFlLEVBQUUsTUFBRztZQUNwQyxxQkFBcUIsRUFBRSw0Q0FBNEM7WUFDbkUsbUJBQW1CLEVBQUU7Z0JBQ25CLE9BQU8sRUFBRSxPQUFPO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2hCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtTQUMxQztRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsR0FBRyxFQUFFLGNBQWM7WUFDbkIscUJBQXFCLEVBQUUsMkNBQTJDO1lBQ2xFLG1CQUFtQixFQUFFO2dCQUNuQixPQUFPLEVBQUUsT0FBTztnQkFDaEIsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixXQUFXLEVBQUUsU0FBUztnQkFDdEIsc0JBQXNCLEVBQUUsU0FBUztnQkFDakMsY0FBYyxFQUFFLFNBQVM7Z0JBQ3pCLEVBQUUsRUFBRSxTQUFTO2FBQ2Q7WUFDRCxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQztZQUNyQyxjQUFjLEVBQUUsR0FBRztZQUNuQixTQUFTLEVBQUUsS0FBSztZQUNoQixZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDekMsS0FBSyxFQUFFO2dCQUNMLE9BQUEsa0JBQWtCLENBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQUU7cUJBQ1YsUUFBUSxDQUFDLEVBQUUsQ0FBQztxQkFDWixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQ2I7YUFBQTtTQUNKO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxHQUFHLEVBQUUsY0FBYztZQUNuQixxQkFBcUIsRUFBRSwwQ0FBMEM7WUFDakUsS0FBSyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3JCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtTQUMzQztRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxXQUFXO1lBQ2pCLEdBQUcsRUFBRSxpQkFBaUI7WUFDdEIscUJBQXFCLEVBQUUsMkNBQTJDO1lBQ2xFLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNoQixjQUFjLEVBQUUsR0FBRztZQUNuQixTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxVQUFVO1lBQ2hCLEdBQUcsRUFBRSxnQkFBZ0I7WUFDckIscUJBQXFCLEVBQUUsbURBQW1EO1lBQzFFLEtBQUssRUFBRSxDQUFDLGdCQUFnQixDQUFDO1lBQ3pCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUN6QyxLQUFLLEVBQUUsT0FBTztTQUNmO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsZUFBZTtZQUNwQixxQkFBcUIsRUFBRSw0Q0FBNEM7WUFDbkUsU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1NBQzFDO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxHQUFHLEVBQUUsY0FBYztZQUNuQixxQkFBcUIsRUFBRSwrQ0FBK0M7WUFDdEUsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3BCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLG1CQUFtQixFQUFFO2dCQUNuQixPQUFPLEVBQUUsT0FBTzthQUNqQjtZQUNELFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtTQUMxQztRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxNQUFNO1lBQ1osR0FBRyxFQUFFLFlBQVk7WUFDakIscUJBQXFCLEVBQUUsOENBQThDO1lBQ3JFLG1CQUFtQixFQUFFO2dCQUNuQixPQUFPLEVBQUUsT0FBTzthQUNqQjtZQUNELEtBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNwQixjQUFjLEVBQUUsR0FBRztZQUNuQixTQUFTLEVBQUUsS0FBSztZQUNoQixZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7U0FDMUM7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsT0FBTztZQUNiLEdBQUcsRUFBRSxhQUFhO1lBQ2xCLHFCQUFxQixFQUFFLGlEQUFpRDtZQUN4RSxLQUFLLEVBQUUsRUFBRTtZQUNULGNBQWMsRUFBRSxHQUFHO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtTQUMxQztRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxXQUFXO1lBQ2pCLEdBQUcsRUFBRSxpQkFBaUI7WUFDdEIscUJBQXFCLEVBQUUsNkNBQTZDO1lBQ3BFLFdBQVcsRUFBSyxlQUFlLEVBQUUsTUFBRztZQUNwQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDaEIsY0FBYyxFQUFFLEdBQUc7WUFDbkIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1NBQzNDO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsZUFBZTtZQUNwQixxQkFBcUIsRUFBRSx3Q0FBd0M7WUFDL0QsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLGlCQUFpQixDQUFDO1lBQzlCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUN6QyxLQUFLLEVBQUU7Z0JBQ0wsT0FBQSxrQkFBa0IsQ0FDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtxQkFDVixRQUFRLENBQUMsRUFBRSxDQUFDO3FCQUNaLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FDYjthQUFBO1NBQ0o7S0FDRjs7Ozs7Ozs7UUNwSUMsTUFBTyxNQUFNO1FBQ2IsUUFBUyxRQUFRO1FBQ2pCLGVBQWdCLGNBQWM7UUFDOUIsaUJBQWtCLGdCQUFnQjtRQUNsQyxRQUFTLFFBQVE7UUFDakIsZ0JBQWlCLGVBQWU7Ozs7Ozs7O0FDRGxDLFFBQWEsY0FBYyxHQUFHLElBQUlBLG1CQUFjLENBQU0sZ0JBQWdCLENBQUM7QUFDdkU7UUE4Q0UsdUJBQW9DLE9BQThCO1lBNUMzRCxZQUFPLEdBQUc7Z0JBQ2YsZUFBZSxFQUFFLEtBQUs7Z0JBQ3RCLFNBQVMsRUFBRSxJQUFJO2dCQUNmLE9BQU8sRUFBRSxHQUFHO2dCQUNaLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixTQUFTLEVBQUUsY0FBYztnQkFDekIsU0FBUyxFQUFFLGVBQWU7Z0JBQzFCLFNBQVMsRUFBRSxPQUFPO2dCQUNsQixjQUFjLEVBQUUsR0FBRztnQkFDbkIsV0FBVyxFQUFFLGFBQWE7Z0JBQzFCLFVBQVUsRUFBRSxlQUFlO2dCQUMzQixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsV0FBVyxFQUFFLFdBQVcsQ0FBQyxhQUFhO2dCQUN0QyxPQUFPLEVBQUUsU0FBUztnQkFDbEIsWUFBWSxFQUFFLFVBQUMsUUFBYSxFQUFFLE1BQXNCOzt3QkFDNUMsV0FBVyxHQUNmLFFBQVEsS0FBSyxRQUFRLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDeEUsSUFBSSxDQUFDLFdBQVcsRUFBRTs7d0JBRWhCLE9BQU8sSUFBSSxDQUFDO3FCQUNiO29CQUNELElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFFO3dCQUNuQyxPQUFPLFdBQVcsQ0FBQztxQkFDcEI7b0JBQ0QsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7O3dCQUVuQyxPQUFPLElBQUksQ0FBQztxQkFDYjs7d0JBQ0ssYUFBYSxHQUNqQixNQUFNLENBQUMsU0FBUzt3QkFDaEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBTSxFQUFFLENBQU07NEJBQ2hELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNiLEVBQUUsV0FBVyxDQUFDOzt3QkFDWCxLQUFLLEdBQUcsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0JBQzdGLElBQUksS0FBSyxFQUFFO3dCQUNULE9BQU8sS0FBSyxDQUFDO3FCQUNkOzs7b0JBR0QsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBQ0QsU0FBUyxFQUFFLEVBQUU7YUFDZCxDQUFDO1lBR0EsSUFBSSxDQUFDLE9BQU8sZ0JBQ1AsSUFBSSxDQUFDLE9BQU8sRUFDWixPQUFPLENBQ1gsQ0FBQztZQUNGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQ2xDOzs7OztRQUVELHVDQUFlOzs7O1lBQWYsVUFBZ0IsU0FBcUI7Z0JBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxpQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxHQUM3QixTQUFTLENBQ2IsQ0FBQztnQkFDRixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQzthQUNsQzs7OztRQUVELGlEQUF5Qjs7O1lBQXpCO2dCQUFBLGlCQVNDO2dCQVJDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO29CQUM3QyxJQUFJLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRTt3QkFDM0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUN0QixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFDckIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQy9CLENBQUM7cUJBQ0g7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7O29CQXZFRkMsZUFBVTs7Ozs7d0RBOENJQyxXQUFNLFNBQUMsY0FBYzs7O1FBMEJwQyxvQkFBQztLQXhFRDs7Ozs7Ozs7O0FDSkE7OztRQUFBO1NBUUM7UUFBRCxxQkFBQztJQUFELENBQUM7Ozs7Ozs7UUNKMENDLHlDQUFjO1FBSXZELCtCQUFvQixNQUFxQjtZQUF6QyxZQUNFLGlCQUFPLFNBSVI7WUFMbUIsWUFBTSxHQUFOLE1BQU0sQ0FBZTtZQUhqQyxXQUFLLEdBQThCLEVBQUUsQ0FBQztZQUN0QyxpQkFBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFJdkMsSUFBSSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUN2RCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLG9CQUFvQixDQUFDLENBQUM7YUFDakU7O1NBQ0Y7Ozs7O1FBRU0saURBQWlCOzs7O1lBQXhCLFVBQXlCLFdBQXdCOztvQkFDekMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQztnQkFDcEUsSUFBSSxDQUFDLGtCQUFrQixFQUFFO29CQUN2QixPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztnQkFDL0IsT0FBTyxJQUFJLENBQUM7YUFDYjs7Ozs7UUFFTSxtQ0FBRzs7OztZQUFWLFVBQVcsR0FBVztnQkFDcEIsUUFBUSxJQUFJLENBQUMsV0FBVztvQkFDdEIsS0FBSyxXQUFXLENBQUMsTUFBTSxDQUFDO29CQUN4QixLQUFLLFdBQVcsQ0FBQyxjQUFjO3dCQUM3QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzdCLEtBQUssV0FBVyxDQUFDLGFBQWEsQ0FBQztvQkFDL0IsS0FBSyxXQUFXLENBQUMsZUFBZTt3QkFDOUIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0MsS0FBSyxXQUFXLENBQUMsTUFBTTt3QkFDckIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6QixLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUM7b0JBQ3RCO3dCQUNFLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0Y7Ozs7Ozs7UUFFTSxtQ0FBRzs7Ozs7O1lBQVYsVUFBVyxHQUFXLEVBQUUsS0FBYSxFQUFFLElBQVk7Z0JBQ2pELFFBQVEsSUFBSSxDQUFDLFdBQVc7b0JBQ3RCLEtBQUssV0FBVyxDQUFDLE1BQU0sQ0FBQztvQkFDeEIsS0FBSyxXQUFXLENBQUMsY0FBYzt3QkFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7d0JBQ2hGLE1BQU07b0JBQ1IsS0FBSyxXQUFXLENBQUMsYUFBYSxDQUFDO29CQUMvQixLQUFLLFdBQVcsQ0FBQyxlQUFlO3dCQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQzdDLE1BQU07b0JBQ1IsS0FBSyxXQUFXLENBQUMsTUFBTTt3QkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7d0JBQ3hCLE1BQU07b0JBQ1IsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDO29CQUN0Qjt3QkFDRSxNQUFNO2lCQUNUO2FBQ0Y7Ozs7O1FBRU0sc0NBQU07Ozs7WUFBYixVQUFjLEdBQVc7Z0JBQ3ZCLFFBQVEsSUFBSSxDQUFDLFdBQVc7b0JBQ3RCLEtBQUssV0FBVyxDQUFDLE1BQU0sQ0FBQztvQkFDeEIsS0FBSyxXQUFXLENBQUMsY0FBYzt3QkFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdkIsTUFBTTtvQkFDUixLQUFLLFdBQVcsQ0FBQyxhQUFhLENBQUM7b0JBQy9CLEtBQUssV0FBVyxDQUFDLGVBQWU7d0JBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN6QyxNQUFNO29CQUNSLEtBQUssV0FBVyxDQUFDLE1BQU07d0JBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdkIsTUFBTTtvQkFDUixLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUM7b0JBQ3RCO3dCQUNFLE1BQU07aUJBQ1Q7YUFDRjs7Ozs7O1FBRU8sdURBQXVCOzs7OztZQUEvQixVQUFnQyxXQUF3QjtnQkFDdEQsUUFBUSxXQUFXO29CQUNqQixLQUFLLFdBQVcsQ0FBQyxNQUFNLENBQUM7b0JBQ3hCLEtBQUssV0FBVyxDQUFDLGNBQWM7d0JBQzdCLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7b0JBQ3pDLEtBQUssV0FBVyxDQUFDLGFBQWEsQ0FBQztvQkFDL0IsS0FBSyxXQUFXLENBQUMsZUFBZTt3QkFDOUIsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3BELEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQztvQkFDdEIsS0FBSyxXQUFXLENBQUMsTUFBTTt3QkFDckIsT0FBTyxJQUFJLENBQUM7b0JBQ2Q7d0JBQ0UsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2FBQ0Y7Ozs7OztRQUVPLHdEQUF3Qjs7Ozs7WUFBaEMsVUFBaUMsV0FBb0U7Z0JBQ25HLElBQUk7O3dCQUNJLFNBQVMsR0FBRyxNQUFNLElBQUksV0FBVyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSTtvQkFFakYsSUFBSSxTQUFTLEVBQUU7OzRCQUNQLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFOzZCQUN0QixRQUFRLENBQUMsRUFBRSxDQUFDOzZCQUNaLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQ3JDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3JDO29CQUVELE9BQU8sU0FBUyxDQUFDO2lCQUNsQjtnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDVixPQUFPLEtBQUssQ0FBQztpQkFDZDthQUNGOzs7OztRQUVPLHdEQUF3Qjs7OztZQUFoQztnQkFDRSxJQUFJOzt3QkFDSSxTQUFTLEdBQUcsUUFBUSxJQUFJLFFBQVEsSUFBSSxRQUFRO29CQUVsRCxJQUFJLFNBQVMsRUFBRTs7NEJBQ1AsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7NkJBQ3RCLFFBQVEsQ0FBQyxFQUFFLENBQUM7NkJBQ1osU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDZixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDOzs0QkFDdEUsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO3dCQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN2QixPQUFPLEtBQUssS0FBSyxNQUFNLENBQUM7cUJBQ3pCO29CQUNELE9BQU8sS0FBSyxDQUFDO2lCQUNkO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNWLE9BQU8sS0FBSyxDQUFDO2lCQUNkO2FBQ0Y7Ozs7Ozs7OztRQUVPLHlDQUFTOzs7Ozs7OztZQUFqQixVQUFrQixHQUFXLEVBQUUsS0FBYSxFQUFFLE9BQVksRUFBRSxJQUFVO2dCQUF4Qix3QkFBQTtvQkFBQSxZQUFZOztnQkFBRSxxQkFBQTtvQkFBQSxVQUFVOztnQkFDcEUsUUFBUSxDQUFDLE1BQU0sR0FBTSxHQUFHLFNBQUksS0FBSyxJQUFHLE9BQU8sR0FBRyxlQUFhLE9BQVMsR0FBRyxFQUFFLGdCQUFVLElBQU0sQ0FBQzthQUMzRjs7Ozs7OztRQUVPLDRDQUFZOzs7Ozs7WUFBcEIsVUFBcUIsR0FBVyxFQUFFLElBQVU7Z0JBQVYscUJBQUE7b0JBQUEsVUFBVTs7Z0JBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMxRDs7Ozs7O1FBRU8seUNBQVM7Ozs7O1lBQWpCLFVBQWtCLEdBQVc7Z0JBQzNCLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMscUJBQW1CLEdBQUcsZ0NBQTZCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2Rzs7b0JBMUlGRixlQUFVOzs7Ozt3QkFGRixhQUFhOzs7UUE2SXRCLDRCQUFDO0tBQUEsQ0ExSTBDLGNBQWM7Ozs7OztBQ056RDtRQVlFLHVCQUFvQixPQUF1QixFQUFVLE1BQXFCO1lBQXRELFlBQU8sR0FBUCxPQUFPLENBQWdCO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtZQUpuRSxjQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztrQkFDOUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztrQkFDekcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1NBRTRDOzs7O1FBRXZFLGdDQUFROzs7WUFBZjtnQkFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN6Qzs7Ozs7UUFFTSxrQ0FBVTs7OztZQUFqQixVQUFrQixLQUF1QjtnQkFBdkIsc0JBQUE7b0JBQUEsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFOztnQkFDdkMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUMxQyxJQUFJOzs0QkFDSSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7OzRCQUMvQixNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7d0JBQzlELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztxQkFDbEQ7b0JBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ1YsT0FBTyxTQUFTLENBQUM7cUJBQ2xCO2lCQUNGO2FBQ0Y7Ozs7O1FBRU0sZ0NBQVE7Ozs7WUFBZixVQUFnQixRQUF5QjtnQkFDdkMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7b0JBRWIsT0FBTztpQkFDUjs7b0JBRUcsS0FBYTtnQkFDakIsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7b0JBQ2hDLEtBQUssR0FBRyxRQUFRLENBQUM7aUJBQ2xCO3FCQUFNO29CQUNMLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3pFO2dCQUVELElBQUksS0FBSyxFQUFFOzt3QkFDSCxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQztvQkFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztpQkFDL0U7YUFDRjs7OztRQUVNLG1DQUFXOzs7WUFBbEI7Z0JBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3JDOzs7OztRQUVNLHVDQUFlOzs7O1lBQXRCLFVBQXVCLEtBQXVCO2dCQUF2QixzQkFBQTtvQkFBQSxRQUFRLElBQUksQ0FBQyxRQUFRLEVBQUU7OztnQkFFNUMsSUFBSSxLQUFLLEVBQUU7O29CQUVULElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzt3QkFFakMsSUFBSTs7Z0NBQ0ksU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQ0FDL0IsTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDOztnQ0FDeEQsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRzs7NEJBRXpELElBQUksR0FBRyxFQUFFOztvQ0FDRCxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUc7Z0NBQ2hFLElBQUksU0FBUyxFQUFFOztvQ0FFYixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0NBQ3BDLE9BQU8sS0FBSyxDQUFDO2lDQUNkO3FDQUFNOztvQ0FFTCxPQUFPLElBQUksQ0FBQztpQ0FDYjs2QkFDRjt5QkFDRjt3QkFBQyxPQUFPLENBQUMsRUFBRTs7NEJBRVYsT0FBTyxJQUFJLENBQUM7eUJBQ2I7cUJBQ0Y7O29CQUVELE9BQU8sSUFBSSxDQUFDO2lCQUNiOztnQkFFRCxPQUFPLEtBQUssQ0FBQzthQUNkOzs7OztRQUVNLHlDQUFpQjs7OztZQUF4QixVQUF5QixLQUF1QjtnQkFBdkIsc0JBQUE7b0JBQUEsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFOzs7b0JBQ3hDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztnQkFDdEMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTs7d0JBQzdFLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQyxPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFDRCxPQUFPLElBQUksQ0FBQzthQUNiOzs7O1FBRU0sOEJBQU07OztZQUFiO2dCQUFBLGlCQU1DO2dCQUxDLE9BQU9HLGVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUF5QjtvQkFDakQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNwQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2hCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDckIsQ0FBQyxDQUFDO2FBQ0o7Ozs7O1FBRU0sc0NBQWM7Ozs7WUFBckIsVUFBc0IsSUFBaUI7Z0JBQ3JDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3Qzs7Ozs7O1FBRU8sd0NBQWdCOzs7OztZQUF4QixVQUF5QixHQUFHO2dCQUMxQixPQUFPLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3JJOztvQkF6R0ZILGVBQVU7Ozs7O3dCQUhGLGNBQWM7d0JBQ2QsYUFBYTs7O1FBNEd0QixvQkFBQztLQTFHRDs7Ozs7O0FDTkE7UUFRRSx3QkFBb0IsTUFBcUIsRUFBVSxNQUFxQjtZQUFwRCxXQUFNLEdBQU4sTUFBTSxDQUFlO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtTQUFJOzs7Ozs7UUFFNUUsa0NBQVM7Ozs7O1lBQVQsVUFBVSxHQUFxQixFQUFFLElBQWlCOztnQkFDMUMsSUFBQSx3QkFBK0MsRUFBN0MsMEJBQVUsRUFBRSx3QkFBaUM7O29CQUMvQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7O29CQUM5QixlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUU7O29CQUMvQyxNQUFNLEdBQ1YsZUFBZSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsWUFBSSxHQUFDLFVBQVUsSUFBTSxTQUFTLFNBQUksS0FBTyxLQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUc7Z0JBQzlILE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM1Qjs7b0JBWEZBLGVBQVU7Ozs7O3dCQUpGLGFBQWE7d0JBQ2IsYUFBYTs7O1FBZXRCLHFCQUFDO0tBWkQ7Ozs7Ozs7UUNDQTtTQXlJQzs7Ozs7OztRQXZJUSwyQkFBSTs7Ozs7O1lBQVgsVUFBWSxHQUFXLEVBQUUsT0FBd0MsRUFBRSxPQUE2QjtnQkFBN0Isd0JBQUE7b0JBQUEsVUFBVSxJQUFJLENBQUMsWUFBWSxFQUFFOzs7b0JBQ3hGLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7b0JBQ3JGLFVBQVUsR0FBRyxPQUFPLEdBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJOztvQkFFOUMsV0FBVyxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLENBQUMsR0FBRyxJQUFJO2dCQUUzRyxJQUFJLFdBQVcsRUFBRTtvQkFDZixJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7d0JBQ3JCLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDckI7b0JBQ0QsT0FBT0ksT0FBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUN4QjtnQkFDRCxPQUFPQyxVQUFLLEVBQUUsQ0FBQzthQUNoQjs7Ozs7OztRQUVNLG1DQUFZOzs7Ozs7WUFBbkIsVUFBb0IsV0FBbUIsRUFBRSxPQUE2QixFQUFFLFdBQStCO2dCQUE5RCx3QkFBQTtvQkFBQSxVQUFVLElBQUksQ0FBQyxZQUFZLEVBQUU7O2dCQUFFLDRCQUFBO29CQUFBLGNBQWMsZUFBZSxFQUFFOztnQkFDckcsT0FBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDMUc7Ozs7Ozs7UUFFTyxvQ0FBYTs7Ozs7O1lBQXJCLFVBQXNCLFdBQW1CLEVBQUUsV0FBK0I7Z0JBQTFFLGlCQTJDQztnQkEzQzBDLDRCQUFBO29CQUFBLGNBQWMsZUFBZSxFQUFFOztnQkFDeEUsSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2lCQUMxQztnQkFDRCxPQUFPQyxVQUFLLENBQ1ZDLGNBQVMsQ0FBUSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUN4Q0MsZUFBSyxDQUFDLEdBQUcsQ0FBQyxFQUNWQyxhQUFHLENBQUM7b0JBQ0YsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2lCQUM1QyxDQUFDLENBQ0gsRUFDREYsY0FBUyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FDcEMsQ0FBQyxJQUFJLENBQ0pHLG1CQUFTLENBQUMsVUFBQyxLQUE4QjtvQkFDdkMsSUFBSSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO3dCQUN0QyxPQUFPUCxlQUFVLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztxQkFDL0Q7b0JBQ0QsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQ3hDLE9BQU9FLFVBQUssRUFBRSxDQUFDO3FCQUNoQjs7d0JBRUssTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO29CQUMxQyxNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7b0JBRXhCLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFOzs0QkFDMUIsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOzs0QkFDM0QsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOzs0QkFDeEQsSUFBSSxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7OzRCQUN4QyxFQUFFLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQzs7NEJBQ3ZDLFNBQVMsZ0JBQVEsRUFBRSxFQUFLLElBQUksQ0FBRTt3QkFFcEMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUVwQixJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7NEJBQ25CLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQzt5QkFDdkI7NkJBQU07NEJBQ0wsT0FBT0QsT0FBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUN0QjtxQkFDRjtvQkFDRCxPQUFPQyxVQUFLLEVBQUUsQ0FBQztpQkFDaEIsQ0FBQyxFQUNGTSxjQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1IsQ0FBQzthQUNIOzs7Ozs7O1FBRU8sZ0NBQVM7Ozs7OztZQUFqQixVQUFrQixXQUFtQixFQUFFLFdBQStCO2dCQUF0RSxpQkE4QkM7Z0JBOUJzQyw0QkFBQTtvQkFBQSxjQUFjLGVBQWUsRUFBRTs7Z0JBQ3BFLE9BQU9DLGFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ3RCRixtQkFBUyxDQUFDO29CQUNSLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTt3QkFDdEMsT0FBT0csZUFBVSxDQUFDLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztxQkFDekQ7O3dCQUVLLGlCQUFpQixHQUFHLGVBQWUsQ0FBQyxXQUFXLENBQUM7b0JBRXRELElBQ0UsaUJBQWlCO3lCQUNoQixXQUFXLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQzdGLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQzFEOzs0QkFDTSxXQUFXLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOzs0QkFDekUsVUFBVSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQzs7NEJBQ3hFLElBQUksR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDOzs0QkFDeEMsRUFBRSxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7d0JBQzdDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7NEJBQ2QsU0FBUyxnQkFBUSxFQUFFLEVBQUssSUFBSSxDQUFFO3dCQUNwQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7NEJBQ25CLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQzt5QkFDdkI7NkJBQU07NEJBQ0wsT0FBT1QsT0FBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUN0QjtxQkFDRjtvQkFDRCxPQUFPQyxVQUFLLEVBQUUsQ0FBQztpQkFDaEIsQ0FBQyxFQUNGTSxjQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1IsQ0FBQzthQUNIOzs7Ozs7UUFFTyxxQ0FBYzs7Ozs7WUFBdEIsVUFBdUIsT0FBdUI7Z0JBQzVDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDOztvQkFDbEIsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksR0FBRzs7b0JBQzVCLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEdBQUc7Z0JBQ3BDLGtCQUNFLEtBQUssT0FBQTtvQkFDTCxNQUFNLFFBQUEsRUFDTixJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsS0FBSyxJQUFJLENBQUMsRUFDdEQsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sSUFBSSxHQUFHLEVBQ3pELE9BQU8sRUFBRSxPQUFPLENBQUMsY0FBYyxHQUFHLEtBQUssR0FBRyxJQUFJLElBQzNDLE9BQU8sRUFDVjthQUNIOzs7Ozs7UUFFTyx1Q0FBZ0I7Ozs7O1lBQXhCLFVBQXlCLE9BQTBFO2dCQUNqRyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3FCQUN4QixHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksUUFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFDLENBQUM7cUJBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNkOzs7Ozs7UUFFTyx1Q0FBZ0I7Ozs7O1lBQXhCLFVBQXlCLGNBQXNCOztvQkFDekMsR0FBRzs7b0JBQ0gsS0FBSztnQkFDVCxPQUFPLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUNyQyxVQUFDLEdBQUcsRUFBRSxRQUFRO29CQUNaLElBQUksUUFBUSxFQUFFO3dCQUNaLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM1QixHQUFHLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO3FCQUNsRjtvQkFDRCxPQUFPLEdBQUcsQ0FBQztpQkFDWixxQkFDRCxFQUFFLEdBQ0gsQ0FBQzthQUNIOzs7OztRQUVPLG1DQUFZOzs7O1lBQXBCO2dCQUNFLE9BQU8sT0FBTyxPQUFPLEtBQUssUUFBUSxLQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0g7O29CQXhJRlgsZUFBVTs7UUF5SVgsbUJBQUM7S0F6SUQ7Ozs7OztBQ1BBO1FBWUUsdUJBQW9CYyxPQUFnQixFQUFVLEtBQW1CLEVBQVUsTUFBcUI7WUFBNUUsU0FBSSxHQUFKQSxPQUFJLENBQVk7WUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFjO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtTQUFJOzs7Ozs7O1FBRXBHLDRCQUFJOzs7Ozs7WUFBSixVQUFzQyxZQUE0QixFQUFFLFFBQWdCO2dCQUFwRixpQkFtQkM7O29CQWxCTyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxHQUFHO2dCQUN6SCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNuRkosbUJBQVMsQ0FBQyxVQUFBLFdBQVc7b0JBQ25CLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQVMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FDbERLLGFBQUcsQ0FBQyxVQUFBLGlCQUFpQjt3QkFDbkIsT0FBQSxXQUFXOzhCQUNQLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7OEJBQ2pILFNBQVM7cUJBQUEsQ0FDZCxFQUNETCxtQkFBUyxDQUFDLFVBQUEsaUJBQWlCO3dCQUN6QixPQUFBLEtBQUksQ0FBQyxLQUFLOzZCQUNQLFlBQVksQ0FBQyxXQUFXLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUM7NkJBQ2hGLElBQUksQ0FBQ0QsYUFBRyxDQUFDLFVBQUEsU0FBUyxJQUFJLFFBQUMsRUFBRSxpQkFBaUIsbUJBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxJQUFDLENBQUMsQ0FBQztxQkFBQSxDQUM5RCxDQUNGO2lCQUFBLENBQ0YsRUFDREMsbUJBQVMsQ0FBQyxVQUFDLEVBQWdDO3dCQUE5Qix3Q0FBaUIsRUFBRSx3QkFBUztvQkFBTyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBSSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztpQkFBQSxDQUFDLENBQ2hJLENBQUM7YUFDSDs7Ozs7Ozs7OztRQUVPLHdDQUFnQjs7Ozs7Ozs7O1lBQXhCLFVBQTRCLFlBQTRCLEVBQUUsaUJBQXlCLEVBQUUsU0FBaUIsRUFBRSxRQUFnQjs7b0JBQ2hILElBQUksR0FBRyxFQUFFLFlBQVksY0FBQSxFQUFFLGlCQUFpQixtQkFBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLFFBQVEsVUFBQSxFQUFFO2dCQUMvRCxJQUFBLHdCQUFrRCxFQUFoRCxvQ0FBZSxFQUFFLG9CQUErQjtnQkFDaEQsSUFBQSx3QkFBZSxFQUFmLG9DQUFlLEVBQUUsc0JBQUc7O29CQUN0QixtQkFBbUIsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHO2dCQUNqRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFJLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLGVBQWUsaUJBQUEsRUFBRSxDQUFDLENBQUM7YUFDckY7O29CQS9CRlYsZUFBVTs7Ozs7d0JBVkZnQixlQUFVO3dCQU9WLFlBQVk7d0JBRlosYUFBYTs7O1FBcUN0QixvQkFBQztLQWhDRDs7Ozs7OztRQ0VFLHVCQUFvQkYsT0FBZ0IsRUFBVSxLQUFtQixFQUFVLE1BQXFCO1lBQTVFLFNBQUksR0FBSkEsT0FBSSxDQUFZO1lBQVUsVUFBSyxHQUFMLEtBQUssQ0FBYztZQUFVLFdBQU0sR0FBTixNQUFNLENBQWU7U0FBSTs7Ozs7OztRQUVwRyw0QkFBSTs7Ozs7O1lBQUosVUFBc0MsWUFBNEIsRUFBRSxRQUFnQjtnQkFBcEYsaUJBc0JDOztvQkFyQk8saUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQzs7b0JBQzNELEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDL0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDekVKLG1CQUFTLENBQUMsVUFBQyxNQUFlO29CQUN4QixPQUFBLE1BQU0sR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBR0wsVUFBSyxFQUFFO2lCQUFBLENBQzFHLEVBQ0RLLG1CQUFTLENBQUMsVUFBQyxTQUFjOzs7OztvQkFLdkIsSUFBSSxZQUFZLENBQUMsWUFBWSxLQUFLLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7d0JBQzlELE9BQU9OLE9BQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDdEI7b0JBRUQsSUFBSSxTQUFTLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEtBQUssaUJBQWlCLENBQUMsS0FBSyxFQUFFO3dCQUNsRSxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7cUJBQzNDO29CQUNELE9BQU8sS0FBSSxDQUFDLGdCQUFnQixDQUFJLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3ZGLENBQUMsQ0FDSCxDQUFDO2FBQ0g7Ozs7Ozs7Ozs7UUFFTyx3Q0FBZ0I7Ozs7Ozs7OztZQUF4QixVQUE0QixPQUF1QixFQUFFLGlCQUF5QixFQUFFLFNBQWlCLEVBQUUsUUFBZ0I7O29CQUMzRyxJQUFJLEdBQUcsRUFBRSxpQkFBaUIsbUJBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRTtnQkFDakQsSUFBQSx3QkFBa0QsRUFBaEQsb0JBQU8sRUFBRSxvQ0FBdUM7Z0JBQ2hELElBQUEsaUJBQUcsRUFBRSxtQkFBZSxFQUFmLG9DQUFlOztvQkFDdEIsbUJBQW1CLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRztnQkFDakUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBSSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxlQUFlLGlCQUFBLEVBQUUsQ0FBQyxDQUFDO2FBQ3JGOzs7Ozs7UUFFTyw0Q0FBb0I7Ozs7O1lBQTVCLFVBQTZCLE9BQXVCO2dCQUVoRCxJQUFBLHlCQUFxQixFQUFyQiwwQ0FBcUIsRUFDckIsMkJBQVEsRUFDUix3QkFBcUMsRUFBckMsMERBQXFDLEVBQ3JDLDJCQUFvQixFQUFwQix5Q0FBb0IsRUFDcEIscUJBQUssRUFDTCxxQkFBSyxFQUNMLGlEQUFtQjs7b0JBRWYsYUFBYSxHQUFHLE9BQU8sS0FBSyxLQUFLLFVBQVUsR0FBRyxLQUFLLEVBQUUsR0FBRyxLQUFLO2dCQUNuRSxPQUFPYTtvQkFDTCxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUM7b0JBQy9CLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztvQkFDdkIsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDO29CQUN6QixLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFDdkMsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUNwRCxtQkFBbUI7c0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHOzs0QkFDaEMsS0FBSyxHQUErQyxvQkFBQyxtQkFBbUIsSUFBUyxHQUFHLENBQUM7d0JBQzNGLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFOzRCQUM3QixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO3lCQUNyQjs2QkFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFBRTs0QkFDdEMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO3lCQUN2Qjs2QkFBTSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7NEJBQ3pCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7eUJBQ2xCO3dCQUNELE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQ2pCLENBQUM7c0JBQ0YsRUFBRSxHQUVMLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUEsQ0FBQztxQkFDbkIsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLElBQUk7O29CQUFLLHFCQUFNLEdBQUcsZUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFBRyxxQkFBRSxFQUFFLEdBQThCLENBQUM7YUFDN0Y7O29CQXJFRmpCLGVBQVU7Ozs7O3dCQVZGZ0IsZUFBVTt3QkFPVixZQUFZO3dCQUZaLGFBQWE7OztRQTJFdEIsb0JBQUM7S0F0RUQ7Ozs7Ozs7UUNXRSxzQkFBb0JGLE9BQWdCLEVBQVUsTUFBcUIsRUFBVSxNQUFxQixFQUFVLEtBQW1CO1lBQTNHLFNBQUksR0FBSkEsT0FBSSxDQUFZO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtZQUFVLFdBQU0sR0FBTixNQUFNLENBQWU7WUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFjO1lBUHRILGlCQUFZLEdBQUc7Z0JBQ3RCLEVBQUUsT0FBTyxFQUFFRSxlQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQzVDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDL0MsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO2FBQ2xELENBQUM7WUFDTyxTQUFJLEdBQUcsQ0FBQ0EsZUFBVSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztTQUV5RTs7Ozs7OztRQUU1SCxtQ0FBWTs7Ozs7O1lBQW5CLFVBQStDLElBQVksRUFBRSxRQUFjO2dCQUEzRSxpQkFnQkM7O29CQWZPLFFBQVEsR0FDWixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxLQUFLLEtBQUs7c0JBQ25ERSxhQUFRLENBQUMsTUFBTSxVQUFLLElBQUksQ0FBQyxZQUFZLEdBQUUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO3NCQUN2R0EsYUFBUSxDQUFDLE1BQU0sVUFBSyxJQUFJLENBQUMsWUFBWSxHQUFFLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztnQkFFN0csT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUMvRUgsYUFBRyxDQUFDLFVBQUEsUUFBUTs7OztvQkFJVixJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUU7d0JBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNoQztpQkFDRixDQUFDLENBQ0gsQ0FBQzthQUNIOzs7Ozs7OztRQUVNLDZCQUFNOzs7Ozs7O1lBQWIsVUFBaUIsUUFBZ0IsRUFBRSxHQUF5RSxFQUFFLE1BQWU7Z0JBQTFGLG9CQUFBO29CQUFBLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7O2dCQUFFLHVCQUFBO29CQUFBLGVBQWU7O2dCQUMzSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFJLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLFVBQUEsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNsRTs7b0JBL0JGZixlQUFVOzs7Ozt3QkFIRmdCLGVBQVU7d0JBRFYsYUFBYTt3QkFEYixhQUFhO3dCQURiLFlBQVk7OztRQXNDckIsbUJBQUM7S0FoQ0Q7Ozs7OztBQ1pBO1FBVUUsc0JBQW9CRixPQUFnQixFQUFVLE1BQXFCLEVBQVUsTUFBcUI7WUFBOUUsU0FBSSxHQUFKQSxPQUFJLENBQVk7WUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtTQUFJOzs7Ozs7O1FBRS9GLDRCQUFLOzs7Ozs7WUFBWixVQUF3QyxJQUFxQixFQUFFLEdBQVk7Z0JBQTNFLGlCQUlDO2dCQUhDLE9BQU8sSUFBSSxDQUFDLElBQUk7cUJBQ2IsSUFBSSxDQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQztxQkFDeEYsSUFBSSxDQUFDQyxhQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBQSxDQUFDLENBQUMsQ0FBQzthQUNsRDs7Ozs7OztRQUVNLDZCQUFNOzs7Ozs7WUFBYixVQUF1QixJQUFxQixFQUFFLEdBQVk7Z0JBQ3hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDNUc7O29CQVpGZixlQUFVOzs7Ozt3QkFQRmdCLGVBQVU7d0JBQ1YsYUFBYTt3QkFDYixhQUFhOzs7UUFrQnRCLG1CQUFDO0tBYkQ7Ozs7OztBQ1JBO1FBU0UscUJBQW9CLE1BQXFCLEVBQVUsS0FBbUIsRUFBVSxLQUFtQjtZQUEvRSxXQUFNLEdBQU4sTUFBTSxDQUFlO1lBQVUsVUFBSyxHQUFMLEtBQUssQ0FBYztZQUFVLFVBQUssR0FBTCxLQUFLLENBQWM7U0FBSTs7Ozs7OztRQUVoRywyQkFBSzs7Ozs7O1lBQVosVUFBOEMsSUFBcUIsRUFBRSxHQUFZO2dCQUMvRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFJLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzthQUN2Qzs7Ozs7OztRQUVNLDRCQUFNOzs7Ozs7WUFBYixVQUF1QixJQUFxQixFQUFFLEdBQVk7Z0JBQ3hELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3hDOzs7O1FBRU0sNEJBQU07OztZQUFiO2dCQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUM3Qjs7Ozs7OztRQUVNLGtDQUFZOzs7Ozs7WUFBbkIsVUFBcUQsSUFBWSxFQUFFLFFBQWM7Z0JBQy9FLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUksSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ25EOzs7Ozs7O1FBRU0sMEJBQUk7Ozs7OztZQUFYLFVBQTZDLElBQVksRUFBRSxRQUFjO2dCQUN2RSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFJLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNuRDs7Ozs7OztRQUVNLDRCQUFNOzs7Ozs7WUFBYixVQUF1QixRQUFnQixFQUFFLEdBQVk7Z0JBQ25ELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUksUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQzVDOzs7O1FBRU0scUNBQWU7OztZQUF0QjtnQkFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDdEM7Ozs7UUFFTSw4QkFBUTs7O1lBQWY7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQy9COzs7OztRQUVNLDhCQUFROzs7O1lBQWYsVUFBZ0IsS0FBc0I7Z0JBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCOzs7O1FBRU0saUNBQVc7OztZQUFsQjtnQkFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzNCOzs7O1FBRU0sZ0NBQVU7OztZQUFqQjtnQkFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDakM7Ozs7O1FBRU0sb0NBQWM7Ozs7WUFBckIsVUFBc0IsSUFBaUI7Z0JBQ3JDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekM7Ozs7UUFFTSx1Q0FBaUI7OztZQUF4QjtnQkFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUN4Qzs7b0JBdERGaEIsZUFBVTs7Ozs7d0JBSEYsYUFBYTt3QkFGYixZQUFZO3dCQUNaLFlBQVk7OztRQTJEckIsa0JBQUM7S0F2REQ7Ozs7Ozs7UUNPQTtTQXdCQzs7Ozs7O1FBbEJRLHVCQUFPOzs7OztZQUFkLFVBQWUsYUFBcUMsRUFBRSxxQkFBNEI7Z0JBQTVCLHNDQUFBO29CQUFBLDRCQUE0Qjs7Z0JBQ2hGLE9BQU87b0JBQ0wsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFNBQVMsWUFDSCxhQUFhLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxDQUFDLEdBQUcsRUFBRTt3QkFDL0UsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUU7d0JBQzNFLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUU7d0JBQ25GLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsRUFBRTt3QkFDMUYsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUNnQixlQUFVLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQyxFQUFFO3dCQUNuRyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRTt3QkFDeEUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUNBLGVBQVUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQyxFQUFFO3dCQUNqSCxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxFQUFFO3dCQUM5RixxQkFBcUI7MEJBQ3JCLENBQUMsRUFBRSxPQUFPLEVBQUVHLHNCQUFpQixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQzswQkFDN0csRUFBRSxFQUNQO2lCQUNGLENBQUM7YUFDSDs7b0JBdkJGQyxhQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFLENBQUNDLHFCQUFnQixDQUFDO3dCQUMzQixZQUFZLEVBQUUsRUFBRTt3QkFDaEIsT0FBTyxFQUFFLEVBQUU7cUJBQ1o7O1FBb0JELHNCQUFDO0tBeEJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==