import {Injectable} from '@angular/core';
import {PopupService} from './popup.service';
import {assign, joinUrl} from './utils';
import {ConfigService} from './config.service';
import 'rxjs/add/operator/switchMap';
import {JwtHttp} from './jwt-http.service';

var Oauth1Service = (function () {
    function Oauth1Service(http, popup, config) {
        this.http = http;
        this.popup = popup;
        this.config = config;
    }
    Oauth1Service.prototype.open = function (options, userData) {
        var _this = this;
        this.defaults = assign({}, Oauth1Service.base, options);
        var popupWindow;
        var serverUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
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
                exchangeForToken = _this.exchangeForToken.bind(_this);
            }
            return exchangeForToken(response, userData);
        });
    };
    Oauth1Service.prototype.exchangeForToken = function (oauthData, userData) {
        var data = assign({}, this.defaults, oauthData, userData);
        var exchangeForTokenUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        return this.defaults.method
            ? this.http.request(exchangeForTokenUrl, {
                body: JSON.stringify(data),
                withCredentials: this.config.withCredentials,
                method: this.defaults.method
            })
            : this.http.post(exchangeForTokenUrl, data, { withCredentials: this.config.withCredentials });
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
    Oauth1Service.decorators = [
        { type: Injectable },
    ];
    Oauth1Service.ctorParameters = function () { return [
        { type: JwtHttp, },
        { type: PopupService, },
        { type: ConfigService, },
    ]; };
    return Oauth1Service;
}());
export { Oauth1Service };
//# sourceMappingURL=oauth1.service.js.map