System.register(['angular2/core', './shared', './config', 'angular2/http', './utils', 'rxjs/add/operator/map'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, shared_1, config_1, http_1, utils_1;
    var Local;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (_1) {}],
        execute: function() {
            Local = (function () {
                function Local(http, shared, config) {
                    this.http = http;
                    this.shared = shared;
                    this.config = config;
                }
                Local.prototype.login = function (user, opts) {
                    var _this = this;
                    opts = opts || {};
                    var url = opts.url ? opts.url : utils_1.joinUrl(this.config.baseUrl, this.config.loginUrl);
                    opts.body = JSON.stringify(user) || opts.body;
                    opts.method = opts.method || 'POST';
                    return this.http.request(url, opts)
                        .map(function (response) {
                        _this.shared.setToken(response);
                        return response;
                    });
                };
                Local.prototype.signup = function (user, opts) {
                    opts = opts || {};
                    var url = opts.url ? opts.url : utils_1.joinUrl(this.config.baseUrl, this.config.signupUrl);
                    opts.body = JSON.stringify(user) || opts.body;
                    opts.method = opts.method || 'POST';
                    return this.http.request(url, opts);
                };
                Local = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, shared_1.Shared, config_1.Config])
                ], Local);
                return Local;
            })();
            exports_1("Local", Local);
        }
    }
});
//# sourceMappingURL=local.js.map