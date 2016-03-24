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
var core_1 = require('angular2/core');
var popup_1 = require('./popup');
var http_1 = require('angular2/http');
var utils_1 = require('./utils');
var config_1 = require('./config');
require('rxjs/add/operator/concatMap');
var Oauth1 = (function () {
    function Oauth1(http, popup, config) {
        this.http = http;
        this.popup = popup;
        this.config = config;
    }
    Oauth1.prototype.open = function (options, userData) {
        var _this = this;
        this.defaults = utils_1.extend(options, Oauth1.base);
        var popupWindow;
        var serverUrl = this.config.baseUrl ? utils_1.joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        if (!this.config.cordova) {
            popupWindow = this.popup.open('', this.defaults.name, this.defaults.popupOptions);
        }
        return this.http.post(serverUrl, JSON.stringify(this.defaults))
            .concatMap(function (response) {
            if (_this.config.cordova) {
                popupWindow = _this.popup.open([_this.defaults.authorizationEndpoint, _this.buildQueryString(response.json())].join('?'), _this.defaults.name, _this.defaults.popupOptions);
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
        var data = utils_1.extend({}, userData);
        utils_1.extend(data, oauthData);
        var exchangeForTokenUrl = this.config.baseUrl ? utils_1.joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        return this.http.post(exchangeForTokenUrl, data);
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
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, popup_1.Popup, config_1.Config])
    ], Oauth1);
    return Oauth1;
}());
exports.Oauth1 = Oauth1;
//# sourceMappingURL=oauth1.js.map