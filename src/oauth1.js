System.register(['angular2/core', './popup', 'angular2/http', './utils', './config', 'rxjs/add/operator/mergeMap'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, popup_1, http_1, utils_1, config_1;
    var Oauth1;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (popup_1_1) {
                popup_1 = popup_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (_1) {}],
        execute: function() {
            Oauth1 = (function () {
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
                        .mergeMap(function (response) {
                        if (_this.config.cordova) {
                            popupWindow = _this.popup.open([_this.defaults.authorizationEndpoint, _this.buildQueryString(response.json())].join('?'), _this.defaults.name, _this.defaults.popupOptions);
                        }
                        else {
                            popupWindow.popupWindow.location =
                                [_this.defaults.authorizationEndpoint, _this.buildQueryString(response.json())].join('?');
                        }
                        return _this.config.cordova ? popupWindow.eventListener(_this.defaults.redirectUri) : popupWindow.pollPopup();
                    })
                        .mergeMap(function (response) {
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
            exports_1("Oauth1", Oauth1);
        }
    }
});
//# sourceMappingURL=oauth1.js.map