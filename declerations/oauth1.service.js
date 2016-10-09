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
var popup_service_1 = require('./popup.service');
var utils_1 = require('./utils');
var config_service_1 = require('./config.service');
require('rxjs/add/operator/switchMap');
var jwt_http_service_1 = require('./jwt-http.service');
var Oauth1Service = (function () {
    function Oauth1Service(http, popup, config) {
        this.http = http;
        this.popup = popup;
        this.config = config;
    }
    Oauth1Service.prototype.open = function (options, userData) {
        var _this = this;
        this.defaults = utils_1.assign({}, Oauth1Service.base, options);
        var popupWindow;
        var serverUrl = this.config.baseUrl ? utils_1.joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        if (!this.config.cordova) {
            popupWindow = this.popup.open('', this.defaults.name, this.defaults.popupOptions);
        }
        return this.http.post(serverUrl, JSON.stringify(this.defaults))
            .switchMap(function (response) {
            if (_this.config.cordova) {
                popupWindow = _this.popup.open([_this.defaults.authorizationEndpoint, _this.buildQueryString(response.json())].join('?'), _this.defaults.name, _this.defaults.popupOptions);
            }
            else {
                popupWindow.popupWindow.location =
                    [_this.defaults.authorizationEndpoint, _this.buildQueryString(response.json())].join('?');
            }
            return _this.config.cordova ? popupWindow.eventListener(_this.defaults.redirectUri) : popupWindow.pollPopup();
        })
            .switchMap(function (response) {
            var exchangeForToken = options.exchangeForToken;
            if (typeof exchangeForToken !== 'function') {
                exchangeForToken = _this.exchangeForToken;
            }
            return exchangeForToken(response, userData);
        });
    };
    Oauth1Service.prototype.exchangeForToken = function (oauthData, userData) {
        var data = utils_1.assign({}, oauthData, userData);
        var exchangeForTokenUrl = this.config.baseUrl ? utils_1.joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        return this.http.post(exchangeForTokenUrl, data, { withCredentials: this.config.withCredentials });
    };
    Oauth1Service.prototype.buildQueryString = function (obj) {
        return Object.keys(obj).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }).join('&');
    };
    Oauth1Service.base = {
        url: null,
        name: null,
        popupOptions: null,
        redirectUri: null,
        authorizationEndpoint: null
    };
    Oauth1Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [jwt_http_service_1.JwtHttp, popup_service_1.PopupService, config_service_1.ConfigService])
    ], Oauth1Service);
    return Oauth1Service;
}());
exports.Oauth1Service = Oauth1Service;
//# sourceMappingURL=oauth1.service.js.map