"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var utils_1 = require('./utils');
var config_service_1 = require('./config.service');
var popup_service_1 = require('./popup.service');
var storage_service_1 = require('./storage.service');
require('rxjs/add/operator/switchMap');
require('rxjs/add/observable/of');
var jwt_http_service_1 = require('./jwt-http.service');
var Oauth2Service = (function () {
    function Oauth2Service(http, popup, storage, config) {
        this.http = http;
        this.popup = popup;
        this.storage = storage;
        this.config = config;
    }
    Oauth2Service.prototype.open = function (options, userData) {
        var _this = this;
        this.defaults = utils_1.merge(options, Oauth2Service.base);
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
            if (!options.exchangeForToken && (_this.defaults.responseType === 'token' || !_this.defaults.url)) {
                return Observable_1.Observable.of(oauthData);
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
        var data = utils_1.assign({}, this.defaults, oauthData, userData);
        var exchangeForTokenUrl = this.config.baseUrl ? utils_1.joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
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
                    var camelizedName = utils_1.camelCase(paramName);
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
    Oauth2Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [jwt_http_service_1.JwtHttp, popup_service_1.PopupService, storage_service_1.StorageService, config_service_1.ConfigService])
    ], Oauth2Service);
    return Oauth2Service;
}());
exports.Oauth2Service = Oauth2Service;
//# sourceMappingURL=oauth2.service.js.map