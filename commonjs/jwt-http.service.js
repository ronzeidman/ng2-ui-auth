import {Injectable} from '@angular/core';
import {Headers, Http, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {ConfigService} from './config.service';
import {SharedService} from './shared.service';

var JwtHttp = (function () {
    function JwtHttp(_http, _shared, _config) {
        this._http = _http;
        this._shared = _shared;
        this._config = _config;
    }
    JwtHttp.prototype.request = function (url, options) {
        var _this = this;
        var exp = this._shared.getExpirationDate();
        if (this._shared.getToken() &&
            (!exp || exp.getTime() + this._config.refreshBeforeExpiration > Date.now()) &&
            (options.autoRefreshToken ||
                typeof options.autoRefreshToken === 'undefined' && this._config.autoRefreshToken)) {
            return this.refreshToken()
                .switchMap(function () { return _this.actualRequest(url, options); });
        }
        if (this._config.tryTokenRefreshIfUnauthorized) {
            return this.actualRequest(url, options)
                .catch(function (response) {
                if (response.status === 401) {
                    return _this.refreshToken()
                        .switchMap(function () { return _this.actualRequest(url, options); });
                }
                throw response;
            });
        }
        return this.actualRequest(url, options);
    };
    JwtHttp.prototype.get = function (url, options) {
        options = options || {};
        options.method = RequestMethod.Get;
        return this.request(url, options);
    };
    JwtHttp.prototype.post = function (url, body, options) {
        options = options || {};
        options.method = RequestMethod.Post;
        options.body = body;
        return this.request(url, options);
    };
    JwtHttp.prototype.put = function (url, body, options) {
        options = options || {};
        options.method = RequestMethod.Put;
        options.body = body;
        return this.request(url, options);
    };
    JwtHttp.prototype.delete = function (url, options) {
        options = options || {};
        options.method = RequestMethod.Delete;
        return this.request(url, options);
    };
    JwtHttp.prototype.patch = function (url, body, options) {
        options = options || {};
        options.method = RequestMethod.Patch;
        options.body = body;
        return this.request(url, options);
    };
    JwtHttp.prototype.head = function (url, options) {
        options = options || {};
        options.method = RequestMethod.Head;
        return this.request(url, options);
    };
    JwtHttp.prototype.refreshToken = function () {
        var _this = this;
        var authHeader = new Headers();
        authHeader.append(this._config.authHeader, (this._config.authToken + ' ' + this._shared.getToken()));
        return this._http
            .get(this._config.refreshUrl, {
            headers: authHeader
        })
            .do(function (res) { return _this._shared.setToken(res); });
    };
    JwtHttp.prototype.actualRequest = function (url, options) {
        if (url instanceof Request) {
            url.headers = url.headers || new Headers();
            this.setHeaders(url);
        }
        else {
            options = options || {};
            this.setHeaders(options);
        }
        return this._http.request(url, options);
    };
    JwtHttp.prototype.setHeaders = function (obj) {
        var _this = this;
        obj.headers = obj.headers || new Headers();
        if (this._config.defaultHeaders) {
            Object.keys(this._config.defaultHeaders).forEach(function (defaultHeader) {
                if (!obj.headers.has(defaultHeader)) {
                    obj.headers.set(defaultHeader, _this._config.defaultHeaders[defaultHeader]);
                }
            });
        }
        if (this._shared.isAuthenticated()) {
            obj.headers.set(this._config.authHeader, this._config.authToken + ' ' + this._shared.getToken());
        }
    };
    JwtHttp.decorators = [
        { type: Injectable },
    ];
    JwtHttp.ctorParameters = function () { return [
        { type: Http, },
        { type: SharedService, },
        { type: ConfigService, },
    ]; };
    return JwtHttp;
}());
export { JwtHttp };
//# sourceMappingURL=jwt-http.service.js.map