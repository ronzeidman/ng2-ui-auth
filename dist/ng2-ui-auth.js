'use strict';

var angular2_core = require('angular2/core');
var angular2_http = require('angular2/http');
var rxjs_Observable = require('rxjs/Observable');
var rxjs_add_operator_map = require('rxjs/add/operator/map');
var rxjs_add_operator_concatMap = require('rxjs/add/operator/concatMap');
var rxjs_add_observable_interval = require('rxjs/add/observable/interval');
var rxjs_add_observable_fromEvent = require('rxjs/add/observable/fromEvent');
var rxjs_add_operator_take = require('rxjs/add/operator/take');
var rxjs_add_operator_takeWhile = require('rxjs/add/operator/takeWhile');

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * Created by Ron on 17/12/2015.
 */
var Shared = (function () {
    function Shared(storage, config) {
        this.storage = storage;
        this.config = config;
        this.tokenName = this.config.tokenPrefix ? [this.config.tokenPrefix, this.config.tokenName].join(this.config.tokenSeparator) : this.config.tokenName;
    }
    Shared.prototype.getToken = function () {
        return this.storage.get(this.tokenName);
    };
    Shared.prototype.getPayload = function () {
        var token = this.getToken();
        if (token && token.split('.').length === 3) {
            try {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(decodeURIComponent(encodeURIComponent(window.atob(base64))));
            }
            catch (e) {
                return undefined;
            }
        }
    };
    Shared.prototype.setToken = function (response) {
        if (!response) {
            console.warn('Can\'t set token without passing a value');
            return;
        }
        var token;
        if (typeof response === 'string') {
            token = response;
        }
        else {
            var accessToken = response && response.json() && (response.json().access_token || response.json().token);
            var tokenObject = void 0;
            if (accessToken) {
                if (typeof accessToken === 'object' && typeof accessToken.data === 'object') {
                    tokenObject = accessToken;
                }
                else if (typeof accessToken === 'string') {
                    token = accessToken;
                }
            }
            if (!token && tokenObject) {
                var tokenRootData = this.config.tokenRoot &&
                    this.config.tokenRoot.split('.').reduce(function (o, x) {
                        return o[x];
                    }, tokenObject.data);
                token = tokenRootData ? tokenRootData[this.config.tokenName] : tokenObject.data[this.config.tokenName];
            }
            if (!token) {
                var tokenPath = this.config.tokenRoot ? this.config.tokenRoot + '.' + this.config.tokenName : this.config.tokenName;
                console.warn('Expecting a token named "' + tokenPath);
                return;
            }
        }
        this.storage.set(this.tokenName, token);
    };
    Shared.prototype.removeToken = function () {
        this.storage.remove(this.tokenName);
    };
    Shared.prototype.isAuthenticated = function () {
        var token = this.getToken();
        // a token is present
        if (token) {
            // token with a valid JWT format XXX.YYY.ZZZ
            if (token.split('.').length === 3) {
                // could be a valid JWT or an access token with the same format
                try {
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    var exp = JSON.parse(window.atob(base64)).exp;
                    // jwt with an optional expiration claims
                    if (exp) {
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
    Shared.prototype.getExpirationDate = function () {
        var payload = this.getPayload();
        if (payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
            var date = new Date(0);
            date.setUTCSeconds(payload.exp);
            return date;
        }
        return null;
    };
    Shared.prototype.logout = function () {
        this.storage.remove(this.tokenName);
        return rxjs_Observable.Observable.create(function (observer) {
            observer.next();
            observer.complete();
        });
    };
    Shared.prototype.setStorageType = function (type) {
        this.config.storageType = type;
    };
    Shared = __decorate([
        angular2_core.Injectable()
    ], Shared);
    return Shared;
}());

/**
 * Created by Ron on 17/12/2015.
 */
function extend(dst, src) {
    Object.keys(src)
        .forEach(function (key) {
        dst[key] = dst[key];
    });
    return dst;
}
function joinUrl(baseUrl, url) {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
        return url;
    }
    var joined = [baseUrl, url].join('/');
    var normalize = function (str) {
        return str
            .replace(/[\/]+/g, '/')
            .replace(/\/\?/g, '?')
            .replace(/\/\#/g, '#')
            .replace(/\:\//g, '://');
    };
    return normalize(joined);
}
function merge(obj1, obj2) {
    var result = {};
    for (var i in obj1) {
        if (obj1.hasOwnProperty(i)) {
            if ((i in obj2) && (typeof obj1[i] === 'object') && (i !== null)) {
                result[i] = merge(obj1[i], obj2[i]);
            }
            else {
                result[i] = obj1[i];
            }
        }
    }
    for (i in obj2) {
        if (obj2.hasOwnProperty(i)) {
            if (i in result) {
                continue;
            }
            result[i] = obj2[i];
        }
    }
    return result;
}
function camelCase(name) {
    return name.replace(/([\:\-\_]+(.))/g, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    });
}

/**
 * Created by Ron on 17/12/2015.
 */
var Local = (function () {
    function Local(http, shared, config) {
        this.http = http;
        this.shared = shared;
        this.config = config;
    }
    Local.prototype.login = function (user, opts) {
        var _this = this;
        opts = opts || {};
        var url = opts.url ? opts.url : joinUrl(this.config.baseUrl, this.config.loginUrl);
        opts.body = JSON.stringify(user) || opts.body;
        opts.method = opts.method || 'POST';
        /*opts.headers = new Headers({
            'Content-Type': 'application/json'
        });*/
        return this.http.request(url, opts)
            .map(function (response) {
            _this.shared.setToken(response);
            return response;
        });
    };
    Local.prototype.signup = function (user, opts) {
        opts = opts || {};
        var url = opts.url ? opts.url : joinUrl(this.config.baseUrl, this.config.signupUrl);
        opts.body = JSON.stringify(user) || opts.body;
        opts.method = opts.method || 'POST';
        return this.http.request(url, opts);
    };
    Local = __decorate([
        angular2_core.Injectable()
    ], Local);
    return Local;
}());

/**
 * Created by Ron on 17/12/2015.
 */
var Oauth1 = (function () {
    function Oauth1(http, popup, config) {
        this.http = http;
        this.popup = popup;
        this.config = config;
    }
    Oauth1.prototype.open = function (options, userData) {
        var _this = this;
        this.defaults = extend(options, Oauth1.base);
        var popupWindow;
        var serverUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        if (!this.config.cordova) {
            popupWindow = this.popup.open('', this.defaults.name, this.defaults.popupOptions /*, this.defaults.redirectUri*/);
        }
        return this.http.post(serverUrl, JSON.stringify(this.defaults))
            .concatMap(function (response) {
            if (_this.config.cordova) {
                popupWindow = _this.popup.open([_this.defaults.authorizationEndpoint, _this.buildQueryString(response.json())].join('?'), _this.defaults.name, _this.defaults.popupOptions /*, this.defaults.redirectUri*/);
            }
            else {
                popupWindow.popupWindow.location =
                    [_this.defaults.authorizationEndpoint, _this.buildQueryString(response.json())].join('?');
            }
            return _this.config.cordova ? popupWindow.eventListener(_this.defaults.redirectUri) : popupWindow.pollPopup();
        })
            .concatMap(function (response) {
            return _this.exchangeForToken(response, userData);
        });
    };
    Oauth1.prototype.exchangeForToken = function (oauthData, userData) {
        var data = extend({}, userData);
        extend(data, oauthData);
        var exchangeForTokenUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        return this.http.post(exchangeForTokenUrl, data /*TODO: support, { withCredentials: this.config.withCredentials }*/);
    };
    Oauth1.prototype.buildQueryString = function (obj) {
        return Object.keys(obj).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }).join('&');
    };
    Oauth1.base = {
        url: null,
        name: null,
        popupOptions: null,
        redirectUri: null,
        authorizationEndpoint: null
    };
    Oauth1 = __decorate([
        angular2_core.Injectable()
    ], Oauth1);
    return Oauth1;
}());

/**
 * Created by Ron on 17/12/2015.
 */
var Oauth2 = (function () {
    function Oauth2(http, popup, storage, config) {
        this.http = http;
        this.popup = popup;
        this.storage = storage;
        this.config = config;
    }
    Oauth2.prototype.open = function (options, userData) {
        var _this = this;
        this.defaults = merge(options, Oauth2.base);
        var url;
        var openPopup;
        var stateName = this.defaults.name + '_state';
        var state = this.defaults.state;
        if (typeof state === 'string') {
            this.storage.set(stateName, state);
        }
        else if (typeof state === 'function') {
            this.storage.set(stateName, state());
        }
        url = [this.defaults.authorizationEndpoint, this.buildQueryString()].join('?');
        if (this.config.cordova) {
            openPopup = this.popup
                .open(url, this.defaults.name, this.defaults.popupOptions /*, this.defaults.redirectUri*/)
                .eventListener(this.defaults.redirectUri);
        }
        else {
            openPopup = this.popup
                .open(url, this.defaults.name, this.defaults.popupOptions /*, this.defaults.redirectUri*/)
                .pollPopup();
        }
        return openPopup
            .concatMap(function (oauthData) {
            // when no server URL provided, return popup params as-is.
            // this is for a scenario when someone wishes to opt out from
            // satellizer's magic by doing authorization code exchange and
            // saving a token manually.
            if (_this.defaults.responseType === 'token' || !_this.defaults.url) {
                return oauthData;
            }
            if (oauthData.state && oauthData.state !== _this.storage.get(stateName)) {
                throw 'OAuth "state" mismatch';
            }
            return _this.exchangeForToken(oauthData, userData);
        });
    };
    Oauth2.prototype.exchangeForToken = function (oauthData, userData) {
        var _this = this;
        var data = extend({}, userData);
        Object.keys(this.defaults.responseParams).forEach(function (key) {
            switch (key) {
                case 'code':
                    data[_this.defaults.responseParams[key]] = oauthData.code;
                    break;
                case 'clientId':
                    data[_this.defaults.responseParams[key]] = _this.defaults.clientId;
                    break;
                case 'redirectUri':
                    data[_this.defaults.responseParams[key]] = _this.defaults.redirectUri;
                    break;
                default:
                    data[_this.defaults.responseParams[key]] = oauthData[key];
            }
        });
        if (oauthData.state) {
            data.state = oauthData.state;
        }
        var exchangeForTokenUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        return this.http.post(exchangeForTokenUrl, JSON.stringify(data) /*todo , { withCredentials: this.config.withCredentials }*/);
    };
    Oauth2.prototype.buildQueryString = function () {
        var _this = this;
        var keyValuePairs = [];
        var urlParams = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];
        urlParams.forEach(function (params) {
            if (_this.defaults[params]) {
                _this.defaults[params].forEach(function (paramName) {
                    var camelizedName = camelCase(paramName);
                    var paramValue = typeof _this.defaults[paramName] === 'function' ?
                        _this.defaults[paramName]() :
                        _this.defaults[camelizedName];
                    if (paramName === 'state') {
                        var stateName = _this.defaults.name + '_state';
                        paramValue = encodeURIComponent(_this.storage.get(stateName));
                    }
                    if (paramName === 'scope' && Array.isArray(paramValue)) {
                        paramValue = paramValue.join(_this.defaults.scopeDelimiter);
                        if (_this.defaults.scopePrefix) {
                            paramValue = [_this.defaults.scopePrefix, paramValue].join(_this.defaults.scopeDelimiter);
                        }
                    }
                    keyValuePairs.push([paramName, paramValue]);
                });
            }
        });
        return keyValuePairs.map(function (pair) {
            return pair.join('=');
        }).join('&');
    };
    Oauth2.base = {
        defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
        responseType: 'code',
        responseParams: {
            code: 'code',
            clientId: 'clientId',
            redirectUri: 'redirectUri'
        }
    };
    Oauth2 = __decorate([
        angular2_core.Injectable()
    ], Oauth2);
    return Oauth2;
}());

/**
 * Created by Ron on 17/12/2015.
 */
var Oauth = (function () {
    function Oauth(http, injector, shared, config) {
        this.http = http;
        this.injector = injector;
        this.shared = shared;
        this.config = config;
    }
    Oauth.prototype.authenticate = function (name, userData) {
        var _this = this;
        // var injector = Injector.resolveAndCreate([Oauth1, Oauth2]);
        var provider = this.config.providers[name].type === '1.0' ? this.injector.get(Oauth1) : this.injector.get(Oauth2);
        return provider.open(this.config.providers[name], userData || {})
            .map(function (response) {
            // this is for a scenario when someone wishes to opt out from
            // satellizer's magic by doing authorization code exchange and
            // saving a token manually.
            if (_this.config.providers[name].url) {
                _this.shared.setToken(response);
            }
            return response;
        });
    };
    Oauth.prototype.unlink = function (provider, opts) {
        opts = opts || {};
        var url = opts.url ? opts.url : joinUrl(this.config.baseUrl, this.config.unlinkUrl);
        opts.body = JSON.stringify({ provider: provider }) || opts.body;
        opts.method = opts.method || 'POST';
        return this.http.request(url, opts);
    };
    Oauth = __decorate([
        angular2_core.Injectable()
    ], Oauth);
    return Oauth;
}());

/**
 * Created by Ron on 17/12/2015.
 */
var Popup = (function () {
    function Popup(config) {
        this.config = config;
        this.url = '';
        this.popupWindow = null;
    }
    Popup.prepareOptions = function (options) {
        options = options || {};
        var width = options.width || 500;
        var height = options.height || 500;
        return extend({
            width: width,
            height: height,
            left: window.screenX + ((window.outerWidth - width) / 2),
            top: window.screenY + ((window.outerHeight - height) / 2.5)
        }, options);
    };
    Popup.stringifyOptions = function (options) {
        return Object.keys(options).map(function (key) {
            return key + '=' + options[key];
        }).join(',');
    };
    Popup.parseQueryString = function (joinedKeyValue) {
        var key, value;
        return joinedKeyValue.split('&').reduce(function (obj, keyValue) {
            if (keyValue) {
                value = keyValue.split('=');
                key = decodeURIComponent(value[0]);
                obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
            }
            return obj;
        }, {});
    };
    Popup.prototype.open = function (url, name, options) {
        this.url = url;
        var stringifiedOptions = Popup.stringifyOptions(Popup.prepareOptions(options));
        var UA = window.navigator.userAgent;
        var windowName = (this.config.cordova || UA.indexOf('CriOS') > -1) ? '_blank' : name;
        this.popupWindow = window.open(url, windowName, stringifiedOptions);
        window['popup'] = this.popupWindow;
        if (this.popupWindow && this.popupWindow.focus) {
            this.popupWindow.focus();
        }
        return this;
    };
    Popup.prototype.eventListener = function (redirectUri) {
        var _this = this;
        return rxjs_Observable.Observable
            .fromEvent(this.popupWindow, 'loadstart')
            .concatMap(function (event) {
            if (!_this.popupWindow || _this.popupWindow.closed) {
                return ['Popup Window Closed'];
            }
            if (event.url.indexOf(redirectUri) !== 0) {
                return [];
            }
            var parser = document.createElement('a');
            parser.href = event.url;
            if (parser.search || parser.hash) {
                var queryParams = parser.search.substring(1).replace(/\/$/, '');
                var hashParams = parser.hash.substring(1).replace(/\/$/, '');
                var hash = Popup.parseQueryString(hashParams);
                var qs = Popup.parseQueryString(queryParams);
                extend(qs, hash);
                _this.popupWindow.close();
                if (qs.error) {
                    throw qs.error;
                }
                else {
                    return [qs];
                }
            }
            return [];
        })
            .take(1)
            .takeWhile(function (response) { return response !== 'Popup Window Closed'; });
    };
    Popup.prototype.pollPopup = function () {
        var _this = this;
        return rxjs_Observable.Observable
            .interval(50)
            .concatMap(function () {
            if (!_this.popupWindow || _this.popupWindow.closed) {
                return ['Popup Window Closed'];
            }
            var documentOrigin = document.location.host;
            var popupWindowOrigin = '';
            try {
                popupWindowOrigin = _this.popupWindow.location.host;
            }
            catch (error) {
            }
            if (popupWindowOrigin === documentOrigin && (_this.popupWindow.location.search || _this.popupWindow.location.hash)) {
                var queryParams = _this.popupWindow.location.search.substring(1).replace(/\/$/, '');
                var hashParams = _this.popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                var hash = Popup.parseQueryString(hashParams);
                var qs = Popup.parseQueryString(queryParams);
                _this.popupWindow.close();
                extend(qs, hash);
                if (qs.error) {
                    throw qs.error;
                }
                else {
                    return [qs];
                }
            }
            return [];
        })
            .take(1)
            .takeWhile(function (response) { return response !== 'Popup Window Closed'; });
    };
    Popup = __decorate([
        angular2_core.Injectable()
    ], Popup);
    return Popup;
}());

/**
 * Created by Ron on 17/12/2015.
 */
var Storage = (function () {
    function Storage(config) {
        var _this = this;
        this.config = config;
        this.store = {};
        this.isStorageAvailable = (function () {
            try {
                var supported = config.storageType in window && window[config.storageType] !== null;
                if (supported) {
                    var key = Math.random().toString(36).substring(7);
                    window[_this.config.storageType].setItem(key, '');
                    window[_this.config.storageType].removeItem(key);
                }
                return supported;
            }
            catch (e) {
                return false;
            }
        })();
        if (!this.isStorageAvailable) {
            console.warn(config.storageType + ' is not available.');
        }
    }
    Storage.prototype.get = function (key) {
        return this.isStorageAvailable ? window[this.config.storageType].getItem(key) : this.store[key];
    };
    Storage.prototype.set = function (key, value) {
        return this.isStorageAvailable ? window[this.config.storageType].setItem(key, value) : this.store[key] = value;
    };
    Storage.prototype.remove = function (key) {
        return this.isStorageAvailable ? window[this.config.storageType].removeItem(key) : delete this.store[key];
    };
    Storage = __decorate([
        angular2_core.Injectable()
    ], Storage);
    return Storage;
}());

var Config = (function () {
    function Config(config) {
        var _this = this;
        // todo doesn't work with ng2 withCredentials: false,
        this.tokenRoot = null;
        this.cordova = false;
        this.baseUrl = '/';
        this.loginUrl = '/auth/login';
        this.signupUrl = '/auth/signup';
        this.unlinkUrl = '/auth/unlink/';
        this.tokenName = 'token';
        this.tokenSeparator = '_';
        this.tokenPrefix = 'ng2-ui-auth';
        this.authHeader = 'Authorization';
        this.authToken = 'Bearer';
        this.storageType = 'localStorage';
        this.defaultHeaders = null;
        this.providers = {
            facebook: {
                name: 'facebook',
                url: '/auth/facebook',
                authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
                redirectUri: window.location.origin + '/',
                requiredUrlParams: ['display', 'scope'],
                scope: ['email'],
                scopeDelimiter: ',',
                display: 'popup',
                type: '2.0',
                popupOptions: { width: 580, height: 400 }
            },
            google: {
                name: 'google',
                url: '/auth/google',
                authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                redirectUri: window.location.origin,
                requiredUrlParams: ['scope'],
                optionalUrlParams: ['display'],
                scope: ['profile', 'email'],
                scopePrefix: 'openid',
                scopeDelimiter: ' ',
                display: 'popup',
                type: '2.0',
                popupOptions: { width: 452, height: 633 }
            },
            github: {
                name: 'github',
                url: '/auth/github',
                authorizationEndpoint: 'https://github.com/login/oauth/authorize',
                redirectUri: window.location.origin,
                optionalUrlParams: ['scope'],
                scope: ['user:email'],
                scopeDelimiter: ' ',
                type: '2.0',
                popupOptions: { width: 1020, height: 618 }
            },
            instagram: {
                name: 'instagram',
                url: '/auth/instagram',
                authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
                redirectUri: window.location.origin,
                requiredUrlParams: ['scope'],
                scope: ['basic'],
                scopeDelimiter: '+',
                type: '2.0'
            },
            linkedin: {
                name: 'linkedin',
                url: '/auth/linkedin',
                authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
                redirectUri: window.location.origin,
                requiredUrlParams: ['state'],
                scope: ['r_emailaddress'],
                scopeDelimiter: ' ',
                state: 'STATE',
                type: '2.0',
                popupOptions: { width: 527, height: 582 }
            },
            twitter: {
                name: 'twitter',
                url: '/auth/twitter',
                authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
                redirectUri: window.location.origin,
                type: '1.0',
                popupOptions: { width: 495, height: 645 }
            },
            twitch: {
                name: 'twitch',
                url: '/auth/twitch',
                authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
                redirectUri: window.location.origin,
                requiredUrlParams: ['scope'],
                scope: ['user_read'],
                scopeDelimiter: ' ',
                display: 'popup',
                type: '2.0',
                popupOptions: { width: 500, height: 560 }
            },
            live: {
                name: 'live',
                url: '/auth/live',
                authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
                redirectUri: window.location.origin,
                requiredUrlParams: ['display', 'scope'],
                scope: ['wl.emails'],
                scopeDelimiter: ' ',
                display: 'popup',
                type: '2.0',
                popupOptions: { width: 500, height: 560 }
            },
            yahoo: {
                name: 'yahoo',
                url: '/auth/yahoo',
                authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
                redirectUri: window.location.origin,
                scope: [],
                scopeDelimiter: ',',
                type: '2.0',
                popupOptions: { width: 559, height: 519 }
            },
            bitbucket: {
                name: 'bitbucket',
                url: '/auth/bitbucket',
                authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
                redirectUri: window.location.origin + '/',
                requiredUrlParams: ['scope'],
                scope: ['email'],
                scopeDelimiter: ',',
                type: '2.0',
                popupOptions: { width: 1028, height: 529 }
            }
        };
        Object.keys(config).forEach(function (key) {
            if (key !== 'providers') {
                _this[key] = config[key];
            }
            else {
                Object.keys(config[key]).forEach(function (provider) {
                    if (typeof _this.providers[provider] === 'undefined') {
                        _this.providers[provider] = config.providers[provider];
                    }
                    else {
                        Object.keys(config.providers[provider]).forEach(function (prop) {
                            _this.providers[provider][prop] = config.providers[provider][prop];
                        });
                    }
                });
            }
        });
    }
    Config = __decorate([
        angular2_core.Injectable()
    ], Config);
    return Config;
}());

/**
 * Created by Ron on 06/01/2016.
 */
var JwtHttp = (function (_super) {
    __extends(JwtHttp, _super);
    function JwtHttp(_backend, _defaultOptions, _shared, _config) {
        _super.call(this, _backend, _defaultOptions);
        this._shared = _shared;
        this._config = _config;
    }
    JwtHttp.prototype.request = function (url, options) {
        if (url instanceof angular2_http.Request) {
            url.headers = url.headers || new angular2_http.Headers();
            this.setHeaders(url);
        }
        else {
            options = options || {};
            this.setHeaders(options);
        }
        return _super.prototype.request.call(this, url, options);
    };
    JwtHttp.prototype.get = function (url, options) {
        options = options || {};
        options.method = angular2_http.RequestMethod.Get;
        return this.request(url, options);
    };
    JwtHttp.prototype.post = function (url, body, options) {
        options = options || {};
        options.method = angular2_http.RequestMethod.Post;
        options.body = body;
        return this.request(url, options);
    };
    JwtHttp.prototype.put = function (url, body, options) {
        options = options || {};
        options.method = angular2_http.RequestMethod.Put;
        options.body = body;
        return this.request(url, options);
    };
    JwtHttp.prototype.delete = function (url, options) {
        options = options || {};
        options.method = angular2_http.RequestMethod.Delete;
        return this.request(url, options);
    };
    JwtHttp.prototype.patch = function (url, body, options) {
        options = options || {};
        options.method = angular2_http.RequestMethod.Patch;
        options.body = body;
        return this.request(url, options);
    };
    JwtHttp.prototype.head = function (url, options) {
        options = options || {};
        options.method = angular2_http.RequestMethod.Head;
        return this.request(url, options);
    };
    JwtHttp.prototype.setHeaders = function (obj) {
        var _this = this;
        obj.headers = obj.headers || new angular2_http.Headers();
        if (this._config.defaultHeaders) {
            Object.keys(this._config.defaultHeaders).forEach(function (defaultHeader) {
                if (!obj.headers.has(defaultHeader)) {
                    obj.headers.set(defaultHeader, _this._config.defaultHeaders[defaultHeader]);
                }
            });
        }
        if (this._shared.isAuthenticated()) {
            obj.headers.set(this._config.authHeader, this._config.authToken + ' ' + this._shared.getToken());
        }
    };
    JwtHttp = __decorate([
        angular2_core.Injectable()
    ], JwtHttp);
    return JwtHttp;
}(angular2_http.Http));

/**
 * Created by Ron on 17/12/2015.
 */
function NG2_UI_AUTH_PROVIDERS(config) {
    return [angular2_core.provide(Config, { useFactory: function () { return new Config(config); } }),
        angular2_core.provide(Storage, { useFactory: function (providedConfig) { return new Storage(providedConfig); }, deps: [Config] }),
        angular2_core.provide(Shared, { useFactory: function (storage, providedConfig) { return new Shared(storage, providedConfig); }, deps: [Storage, Config] }),
        angular2_core.provide(JwtHttp, { useFactory: function (xhrBackend, requestOptions, shared, config, router) { return new JwtHttp(xhrBackend, requestOptions, shared, config); }, deps: [angular2_http.XHRBackend, angular2_http.RequestOptions, Shared, Config] }),
        angular2_core.provide(Oauth, { useFactory: function (http, injector, shared, providedConfig) { return new Oauth(http, injector, shared, providedConfig); }, deps: [JwtHttp, angular2_core.Injector, Shared, Config] }),
        angular2_core.provide(Popup, { useFactory: function (providedConfig) { return new Popup(providedConfig); }, deps: [Config] }),
        angular2_core.provide(Oauth1, { useFactory: function (http, popup, providedConfig) { return new Oauth1(http, popup, providedConfig); }, deps: [JwtHttp, Popup, Config] }),
        angular2_core.provide(Oauth2, { useFactory: function (http, popup, storage, providedConfig) { return new Oauth2(http, popup, storage, providedConfig); }, deps: [JwtHttp, Popup, Storage, Config] }),
        angular2_core.provide(Local, { useFactory: function (http, shared, providedConfig) { return new Local(http, shared, providedConfig); }, deps: [JwtHttp, Shared, Config] }),
        angular2_core.provide(Auth, { useFactory: function (shared, local, oauth) { return new Auth(shared, local, oauth); }, deps: [Shared, Local, Oauth] }),
    ];
}
var Auth = (function () {
    function Auth(shared, local, oauth) {
        this.shared = shared;
        this.local = local;
        this.oauth = oauth;
    }
    Auth.prototype.login = function (user, opts) {
        return this.local.login(user, opts);
    };
    Auth.prototype.signup = function (user, opts) {
        return this.local.signup(user, opts);
    };
    Auth.prototype.logout = function () {
        return this.shared.logout();
    };
    Auth.prototype.authenticate = function (name, userData) {
        return this.oauth.authenticate(name, userData);
    };
    Auth.prototype.link = function (name, userData) {
        return this.oauth.authenticate(name, userData);
    };
    Auth.prototype.unlink = function (provider, opts) {
        return this.oauth.unlink(provider, opts);
    };
    Auth.prototype.isAuthenticated = function () {
        return this.shared.isAuthenticated();
    };
    Auth.prototype.getToken = function () {
        return this.shared.getToken();
    };
    Auth.prototype.setToken = function (token) {
        this.shared.setToken(token);
    };
    Auth.prototype.removeToken = function () {
        this.shared.removeToken();
    };
    Auth.prototype.getPayload = function () {
        return this.shared.getPayload();
    };
    Auth.prototype.setStorageType = function (type) {
        this.shared.setStorageType(type);
    };
    Auth.prototype.getExpirationDate = function () {
        return this.shared.getExpirationDate();
    };
    Auth = __decorate([
        angular2_core.Injectable()
    ], Auth);
    return Auth;
}());

exports.Auth = Auth;
exports.NG2_UI_AUTH_PROVIDERS = NG2_UI_AUTH_PROVIDERS;
exports.Config = Config;
exports.Shared = Shared;
exports.JwtHttp = JwtHttp;
//# sourceMappingURL=ng2-ui-auth.js.map