System.register(['angular2/core', 'angular2/http', './utils', './config', './popup', './storage', 'rxjs/add/operator/mergeMap'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, utils_1, config_1, popup_1, storage_1;
    var Oauth2;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
            function (popup_1_1) {
                popup_1 = popup_1_1;
            },
            function (storage_1_1) {
                storage_1 = storage_1_1;
            },
            function (_1) {}],
        execute: function() {
            Oauth2 = (function () {
                function Oauth2(http, popup, storage, config) {
                    this.http = http;
                    this.popup = popup;
                    this.storage = storage;
                    this.config = config;
                }
                Oauth2.prototype.open = function (options, userData) {
                    var _this = this;
                    this.defaults = utils_1.merge(options, Oauth2.base);
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
                        .mergeMap(function (oauthData) {
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
                    var data = utils_1.extend({}, userData);
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
                    var exchangeForTokenUrl = this.config.baseUrl ? utils_1.joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
                    return this.http.post(exchangeForTokenUrl, JSON.stringify(data));
                };
                Oauth2.prototype.buildQueryString = function () {
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
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, popup_1.Popup, storage_1.Storage, config_1.Config])
                ], Oauth2);
                return Oauth2;
            })();
            exports_1("Oauth2", Oauth2);
        }
    }
});
//# sourceMappingURL=oauth2.js.map