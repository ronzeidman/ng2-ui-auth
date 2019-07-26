(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng2-ui-auth', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory(global['ng2-ui-auth'] = {}, global.ng.core, global.ng.common.http, global.rxjs, global.rxjs.operators));
}(this, function (exports, core, http, rxjs, operators) { 'use strict';

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

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            .map((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return (!!obj[key] ? encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) : key); }))
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ɵ0 = /**
     * @return {?}
     */
    function () {
        return encodeURIComponent(Math.random()
            .toString(36)
            .substr(2));
    }, ɵ1 = /**
     * @return {?}
     */
    function () {
        return encodeURIComponent(Math.random()
            .toString(36)
            .substr(2));
    };
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
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            additionalUrlParams: {
                display: 'popup',
                prompt: undefined,
                login_hint: undefined,
                access_type: undefined,
                include_granted_scopes: undefined,
                'openid.realm': undefined,
                hd: undefined
            },
            scope: ['openid', 'email'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 452, height: 633 },
            state: (ɵ0)
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
            state: (ɵ1)
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                resolveToken: (/**
                 * @param {?} response
                 * @param {?} config
                 * @return {?}
                 */
                function (response, config) {
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
                        config.tokenRoot.split('.').reduce((/**
                         * @param {?} o
                         * @param {?} x
                         * @return {?}
                         */
                        function (o, x) {
                            return o[x];
                        }), accessToken);
                    /** @type {?} */
                    var token = tokenRootData ? tokenRootData[config.tokenName] : accessToken[config.tokenName];
                    if (token) {
                        return token;
                    }
                    // const tokenPath = this.tokenRoot ? this.tokenRoot + '.' + this.tokenName : this.tokenName;
                    // console.warn('Expecting a token named "' + tokenPath);
                    return null;
                }),
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
            Object.keys(this.options.providers).forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                if (key in defaultProviders) {
                    _this.options.providers[key] = __assign({}, defaultProviders[key], _this.options.providers[key]);
                }
            }));
        };
        ConfigService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ConfigService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [CONFIG_OPTIONS,] }] }
        ]; };
        return ConfigService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    StorageService = /** @class */ (function () {
        function StorageService() {
        }
        return StorageService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            if (expires === void 0) { expires = ''; }
            if (path === void 0) { path = '/'; }
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
            if (path === void 0) { path = '/'; }
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
        BrowserStorageService.ctorParameters = function () { return [
            { type: ConfigService }
        ]; };
        return BrowserStorageService;
    }(StorageService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            if (token === void 0) { token = this.getToken(); }
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
            if (token === void 0) { token = this.getToken(); }
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
            if (token === void 0) { token = this.getToken(); }
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
            return rxjs.Observable.create((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                _this.storage.remove(_this.tokenName);
                observer.next();
                observer.complete();
            }));
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
            return decodeURIComponent(Array.prototype.map.call(atob(str), (/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); })).join(''));
        };
        SharedService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        SharedService.ctorParameters = function () { return [
            { type: StorageService },
            { type: ConfigService }
        ]; };
        return SharedService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        JwtInterceptor.ctorParameters = function () { return [
            { type: SharedService },
            { type: ConfigService }
        ]; };
        return JwtInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            if (cordova === void 0) { cordova = this.isCordovaApp(); }
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
            if (cordova === void 0) { cordova = this.isCordovaApp(); }
            if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
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
            if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
            if (!popupWindow) {
                throw new Error('Popup was not created');
            }
            return rxjs.merge(rxjs.fromEvent(popupWindow, 'exit').pipe(operators.delay(100), operators.map((/**
             * @return {?}
             */
            function () {
                throw new Error('Authentication Canceled');
            }))), rxjs.fromEvent(popupWindow, 'loadstart')).pipe(operators.switchMap((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
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
            })), operators.take(1));
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
            if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
            return rxjs.interval(50).pipe(operators.switchMap((/**
             * @return {?}
             */
            function () {
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
            })), operators.take(1));
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
                .map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return (options[key] === null || options[key] === undefined ? key : key + '=' + options[key]); }))
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
            return joinedKeyValue.split('&').reduce((/**
             * @param {?} obj
             * @param {?} keyValue
             * @return {?}
             */
            function (obj, keyValue) {
                if (keyValue) {
                    value = keyValue.split('=');
                    key = decodeURIComponent(value[0]);
                    obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
                }
                return obj;
            }), (/** @type {?} */ ({})));
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Oauth1Service = /** @class */ (function () {
        function Oauth1Service(http, popup, config) {
            this.http = http;
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
            return this.popup.open('about:blank', oauthOptions, this.config.options.cordova).pipe(operators.switchMap((/**
             * @param {?} popupWindow
             * @return {?}
             */
            function (popupWindow) {
                return _this.http.post(serverUrl, oauthOptions).pipe(operators.tap((/**
                 * @param {?} authorizationData
                 * @return {?}
                 */
                function (authorizationData) {
                    return popupWindow
                        ? popupWindow.location.replace([oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'))
                        : undefined;
                })), operators.switchMap((/**
                 * @param {?} authorizationData
                 * @return {?}
                 */
                function (authorizationData) {
                    return _this.popup
                        .waitForClose(popupWindow, _this.config.options.cordova, oauthOptions.redirectUri)
                        .pipe(operators.map((/**
                     * @param {?} oauthData
                     * @return {?}
                     */
                    function (oauthData) { return ({ authorizationData: authorizationData, oauthData: oauthData }); })));
                })));
            })), operators.switchMap((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var authorizationData = _a.authorizationData, oauthData = _a.oauthData;
                return _this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
            })));
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
        Oauth1Service.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: PopupService },
            { type: ConfigService }
        ]; };
        return Oauth1Service;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Oauth2Service = /** @class */ (function () {
        function Oauth2Service(http, popup, config) {
            this.http = http;
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
            return this.popup.open(url, oauthOptions, this.config.options.cordova).pipe(operators.switchMap((/**
             * @param {?=} window
             * @return {?}
             */
            function (window) {
                return window ? _this.popup.waitForClose(window, _this.config.options.cordova, oauthOptions.redirectUri) : rxjs.empty();
            })), operators.switchMap((/**
             * @param {?} oauthData
             * @return {?}
             */
            function (oauthData) {
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
            })));
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
                ? Object.keys(additionalUrlParams).map((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) {
                    /** @type {?} */
                    var value = ((/** @type {?} */ (additionalUrlParams)))[key];
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
                }))
                : [])).filter((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return !!_[0]; }))
                .reduce((/**
             * @param {?} acc
             * @param {?} next
             * @return {?}
             */
            function (acc, next) {
                var _a;
                return (__assign({}, acc, (_a = {}, _a[next[0]] = next[1], _a)));
            }), (/** @type {?} */ ({})));
        };
        Oauth2Service.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Oauth2Service.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: PopupService },
            { type: ConfigService }
        ]; };
        return Oauth2Service;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OauthService = /** @class */ (function () {
        function OauthService(http$1, shared, config, popup) {
            this.http = http$1;
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
            return provider.open(this.config.options.providers[name], userData || {}).pipe(operators.tap((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                // this is for a scenario when someone wishes to opt out from
                // satellizer's magic by doing authorization code exchange and
                // saving a token manually.
                if (_this.config.options.providers[name].url) {
                    _this.shared.setToken(response);
                }
            })));
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
            if (url === void 0) { url = joinUrl(this.config.options.baseUrl, this.config.options.unlinkUrl); }
            if (method === void 0) { method = 'POST'; }
            return this.http.request(method, url, { body: { provider: provider } });
        };
        OauthService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        OauthService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: SharedService },
            { type: ConfigService },
            { type: PopupService }
        ]; };
        return OauthService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LocalService = /** @class */ (function () {
        function LocalService(http, shared, config) {
            this.http = http;
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
                .pipe(operators.tap((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return _this.shared.setToken(data); })));
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
        LocalService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: SharedService },
            { type: ConfigService }
        ]; };
        return LocalService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        AuthService.ctorParameters = function () { return [
            { type: SharedService },
            { type: LocalService },
            { type: OauthService }
        ]; };
        return AuthService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            if (defaultJwtInterceptor === void 0) { defaultJwtInterceptor = true; }
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

    exports.AuthService = AuthService;
    exports.BrowserStorageService = BrowserStorageService;
    exports.CONFIG_OPTIONS = CONFIG_OPTIONS;
    exports.ConfigService = ConfigService;
    exports.JwtInterceptor = JwtInterceptor;
    exports.LocalService = LocalService;
    exports.Ng2UiAuthModule = Ng2UiAuthModule;
    exports.Oauth1Service = Oauth1Service;
    exports.Oauth2Service = Oauth2Service;
    exports.OauthService = OauthService;
    exports.PopupService = PopupService;
    exports.SharedService = SharedService;
    exports.StorageService = StorageService;
    exports.StorageType = StorageType;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ng2-ui-auth.umd.js.map
