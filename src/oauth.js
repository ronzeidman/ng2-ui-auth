System.register(['angular2/core', './oauth1', './oauth2', './shared', 'angular2/http', './utils', './config'], function(exports_1) {
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
    var core_1, oauth1_1, oauth2_1, shared_1, http_1, utils_1, config_1;
    var Oauth;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (oauth1_1_1) {
                oauth1_1 = oauth1_1_1;
            },
            function (oauth2_1_1) {
                oauth2_1 = oauth2_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            Oauth = (function () {
                function Oauth(http, injector, shared, config) {
                    this.http = http;
                    this.injector = injector;
                    this.shared = shared;
                    this.config = config;
                }
                Oauth.prototype.authenticate = function (name, userData) {
                    var _this = this;
                    var provider = this.config.providers[name].type === '1.0' ? this.injector.get(oauth1_1.Oauth1) : this.injector.get(oauth2_1.Oauth2);
                    return provider.open(this.config.providers[name], userData || {})
                        .map(function (response) {
                        if (_this.config.providers[name].url) {
                            _this.shared.setToken(response);
                        }
                        return response;
                    });
                };
                Oauth.prototype.unlink = function (provider, opts) {
                    opts = opts || {};
                    opts.url = opts.url ? opts.url : utils_1.joinUrl(this.config.baseUrl, this.config.unlinkUrl);
                    opts.body = JSON.stringify({ provider: provider }) || opts.body;
                    opts.method = opts.method || 'POST';
                    return this.http.request(opts);
                };
                Oauth = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, core_1.Injector, shared_1.Shared, config_1.Config])
                ], Oauth);
                return Oauth;
            }());
            exports_1("Oauth", Oauth);
        }
    }
});
//# sourceMappingURL=oauth.js.map