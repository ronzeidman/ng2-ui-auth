import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {assign, camelCase, joinUrl, merge} from './utils';
import {ConfigService} from './config.service';
import {PopupService} from './popup.service';
import {StorageService} from './storage.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {JwtHttp} from './jwt-http.service';

var Oauth2Service = (function () {
    function Oauth2Service(http, popup, storage, config) {
        this.http = http;
        this.popup = popup;
        this.storage = storage;
        this.config = config;
    }
    Oauth2Service.prototype.open = function (options, userData) {
        var _this = this;
        this.defaults = merge(options, Oauth2Service.base);
        var url;
        var openPopup;
        var stateName = this.defaults.name + '_state';
        var state = this.defaults.state;
        var exp = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
        if (typeof state === 'string') {
            this.storage.set(stateName, state, exp);
        }
        else if (typeof state === 'function') {
            this.storage.set(stateName, state(), exp);
        }
        url = [this.defaults.authorizationEndpoint, this.buildQueryString()].join('?');
        if (this.config.cordova) {
            openPopup = this.popup
                .open(url, this.defaults.name, this.defaults.popupOptions)
                .eventListener(this.defaults.redirectUri);
        }
        else {
            openPopup = this.popup
                .open(url, this.defaults.name, this.defaults.popupOptions)
                .pollPopup();
        }
        return openPopup
            .switchMap(function (oauthData) {
            if (!options.exchangeForToken || _this.defaults.responseType === 'token' || !_this.defaults.url) {
                return Observable.of(oauthData);
            }
            if (oauthData.state && oauthData.state !== _this.storage.get(stateName)) {
                throw 'OAuth "state" mismatch';
            }
            var exchangeForToken = options.exchangeForToken;
            if (typeof exchangeForToken !== 'function') {
                exchangeForToken = _this.exchangeForToken.bind(_this);
            }
            return exchangeForToken(oauthData, userData);
        });
    };
    Oauth2Service.prototype.exchangeForToken = function (oauthData, userData) {
        var data = assign({}, this.defaults, oauthData, userData);
        var exchangeForTokenUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        return this.defaults.method
            ? this.http.request(exchangeForTokenUrl, {
                body: JSON.stringify(data),
                withCredentials: this.config.withCredentials,
                method: this.defaults.method
            })
            : this.http.post(exchangeForTokenUrl, JSON.stringify(data), { withCredentials: this.config.withCredentials });
    };
    Oauth2Service.prototype.buildQueryString = function () {
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
                    if (params !== 'optionalUrlParams' || typeof paramValue !== 'undefined') {
                        keyValuePairs.push([paramName, paramValue]);
                    }
                });
            }
        });
        return keyValuePairs.map(function (pair) {
            return pair.join('=');
        }).join('&');
    };
    Oauth2Service.base = {
        defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
        responseType: 'code',
        responseParams: {
            code: 'code',
            clientId: 'clientId',
            redirectUri: 'redirectUri'
        }
    };
    Oauth2Service.decorators = [
        { type: Injectable },
    ];
    Oauth2Service.ctorParameters = function () { return [
        { type: JwtHttp, },
        { type: PopupService, },
        { type: StorageService, },
        { type: ConfigService, },
    ]; };
    return Oauth2Service;
}());
export { Oauth2Service };
//# sourceMappingURL=oauth2.service.js.map