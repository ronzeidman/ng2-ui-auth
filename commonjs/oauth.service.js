import {Injectable, Injector} from '@angular/core';
import {Oauth1Service} from './oauth1.service';
import {Oauth2Service} from './oauth2.service';
import {SharedService} from './shared.service';
import {joinUrl} from './utils';
import {ConfigService} from './config.service';
import 'rxjs/add/operator/do';
import {JwtHttp} from './jwt-http.service';

var OauthService = (function () {
    function OauthService(http, injector, shared, config) {
        this.http = http;
        this.injector = injector;
        this.shared = shared;
        this.config = config;
    }
    OauthService.prototype.authenticate = function (name, userData) {
        var _this = this;
        var provider = this.config.providers[name].oauthType === '1.0' ? this.injector.get(Oauth1Service) : this.injector.get(Oauth2Service);
        return provider.open(this.config.providers[name], userData || {})
            .do(function (response) {
            if (_this.config.providers[name].url) {
                _this.shared.setToken(response);
            }
        });
    };
    OauthService.prototype.unlink = function (provider, opts) {
        opts = opts || {};
        var url = opts.url ? opts.url : joinUrl(this.config.baseUrl, this.config.unlinkUrl);
        opts.body = JSON.stringify({ provider: provider }) || opts.body;
        opts.method = opts.method || 'POST';
        return this.http.request(url, opts);
    };
    OauthService.decorators = [
        { type: Injectable },
    ];
    OauthService.ctorParameters = function () { return [
        { type: JwtHttp, },
        { type: Injector, },
        { type: SharedService, },
        { type: ConfigService, },
    ]; };
    return OauthService;
}());
export { OauthService };
//# sourceMappingURL=oauth.service.js.map