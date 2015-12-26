System.register(['angular2/core', './shared', './local', './oauth', './popup', './oauth2', './oauth1', './storage', './config'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, shared_1, local_1, oauth_1, popup_1, oauth2_1, oauth1_1, storage_1, config_1;
    var Auth;
    function SATELLIZER_PROVIDERS(config) {
        return [core_1.provide(config_1.Config, { useFactory: function () {
                    return new config_1.Config(config);
                } }), Auth, oauth_1.Oauth, oauth1_1.Oauth1, oauth2_1.Oauth2, local_1.Local, shared_1.Shared, popup_1.Popup, storage_1.Storage];
    }
    exports_1("SATELLIZER_PROVIDERS", SATELLIZER_PROVIDERS);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            },
            function (local_1_1) {
                local_1 = local_1_1;
            },
            function (oauth_1_1) {
                oauth_1 = oauth_1_1;
            },
            function (popup_1_1) {
                popup_1 = popup_1_1;
            },
            function (oauth2_1_1) {
                oauth2_1 = oauth2_1_1;
            },
            function (oauth1_1_1) {
                oauth1_1 = oauth1_1_1;
            },
            function (storage_1_1) {
                storage_1 = storage_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            Auth = (function () {
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
                    return this.shared.setToken(token);
                };
                Auth.prototype.removeToken = function () {
                    return this.shared.removeToken();
                };
                Auth.prototype.getPayload = function () {
                    return this.shared.getPayload();
                };
                Auth.prototype.setStorageType = function (type) {
                    return this.shared.setStorageType(type);
                };
                Auth = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [shared_1.Shared, local_1.Local, oauth_1.Oauth])
                ], Auth);
                return Auth;
            })();
            exports_1("Auth", Auth);
        }
    }
});
//# sourceMappingURL=auth.js.map