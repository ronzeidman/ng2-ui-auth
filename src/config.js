System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var Config;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Config = (function () {
                function Config(config) {
                    var _this = this;
                    this.tokenRoot = null;
                    this.cordova = false;
                    this.baseUrl = '/';
                    this.loginUrl = '/auth/login';
                    this.signupUrl = '/auth/signup';
                    this.unlinkUrl = '/auth/unlink/';
                    this.tokenName = 'token';
                    this.tokenPrefix = 'ng2-ui-auth';
                    this.authHeader = 'Authorization';
                    this.authToken = 'Bearer';
                    this.storageType = 'localStorage';
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
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Object])
                ], Config);
                return Config;
            })();
            exports_1("Config", Config);
        }
    }
});
//# sourceMappingURL=config.js.map