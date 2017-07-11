import {Injectable} from '@angular/core';
import {SharedService} from './shared.service';
import {ConfigService} from './config.service';
import {joinUrl} from './utils';
import 'rxjs/add/operator/do';
import {JwtHttp} from './jwt-http.service';

function getFullOpts(user, userOpts) {
    var opts = userOpts || {};
    if (user) {
        opts.body = typeof user === 'string' ? user : JSON.stringify(user);
    }
    opts.method = opts.method || 'POST';
    return opts;
}
var LocalService = (function () {
    function LocalService(http, shared, config) {
        this.http = http;
        this.shared = shared;
        this.config = config;
    }
    LocalService.prototype.login = function (user, opts) {
        var _this = this;
        var fullOpts = getFullOpts(user, opts);
        var url = fullOpts.url ? fullOpts.url : joinUrl(this.config.baseUrl, this.config.loginUrl);
        return this.http.request(url, fullOpts)
            .do(function (response) { return _this.shared.setToken(response); });
    };
    LocalService.prototype.signup = function (user, opts) {
        var fullOpts = getFullOpts(user, opts);
        var url = fullOpts.url ? fullOpts.url : joinUrl(this.config.baseUrl, this.config.signupUrl);
        return this.http.request(url, getFullOpts(user, fullOpts));
    };
    LocalService.decorators = [
        { type: Injectable },
    ];
    LocalService.ctorParameters = function () { return [
        { type: JwtHttp, },
        { type: SharedService, },
        { type: ConfigService, },
    ]; };
    return LocalService;
}());
export { LocalService };
//# sourceMappingURL=local.service.js.map