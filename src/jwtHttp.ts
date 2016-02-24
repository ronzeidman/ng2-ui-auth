import {Injectable, provide, Provider} from 'angular2/core';
import {
    Http,
    RequestMethod,
    Response,
    RequestOptionsArgs,
    Headers,
    Request,
    RequestOptions,
    ConnectionBackend, XHRBackend
} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Config} from './config';
import {Shared} from './shared';
/**
 * Created by Ron on 06/01/2016.
 */

@Injectable()
export class JwtHttp extends Http {
    constructor(_backend: ConnectionBackend,
                _defaultOptions: RequestOptions,
                private _shared: Shared,
                private _config: Config) {
        super(_backend, _defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        if (this._shared.isAuthenticated()) {
            if (url instanceof Request) {
                url.headers = url.headers || new Headers();
                this.setHeaders(url);
            } else {
                options = options || {};
                this.setHeaders(options);
            }
        }
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Get;
        return this.request(url, options);
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Post;
        options.body = body;
        return this.request(url, options);
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Put;
        options.body = body;
        return this.request(url, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Delete;
        return this.request(url, options);
    }

    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Patch;
        options.body = body;
        return this.request(url, options);
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Head;
        return this.request(url, options);
    }

    private setHeaders(obj: { headers?: Headers, [index: string]: any }) {
        obj.headers = obj.headers || new Headers();
        if (this._config.defaultHeaders) {
            Object.keys(this._config.defaultHeaders).forEach((defaultHeader) => {
                if (!obj.headers.has(defaultHeader)) {
                    obj.headers.set(defaultHeader, this._config.defaultHeaders[defaultHeader]);
                }
            });
        }
        obj.headers.set(this._config.authHeader, this._config.authToken + ' ' + this._shared.getToken());
    }
}

export const JWT_HTTP_PROVIDER: Provider =  provide(JwtHttp, {
    useFactory: (xhrBackend, requestOptions, shared, config, router) =>
        new JwtHttp(xhrBackend, requestOptions, shared, config),
    deps: [XHRBackend, RequestOptions, Shared, Config],
});