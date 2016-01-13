import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {RequestMethod} from 'angular2/http';
import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {RequestOptionsArgs} from 'angular2/http';
import {Headers} from 'angular2/http';
import {Request} from 'angular2/http';
import {Config} from './config';
import {RequestOptions} from 'angular2/http';
import {ConnectionBackend} from 'angular2/http';
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
        options = options || {};
        if (this._shared.isAuthenticated()) {
            options.headers = options.headers || new Headers();
            options.headers.set(this._config.authHeader, this._config.authToken + ' ' + this._shared.getToken());
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
        return this.put(url, body, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Delete;
        return this.delete(url, options);
    }

    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Patch;
        options.body = body;
        return this.patch(url, body, options);
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Head;
        return this.head(url, options);
    }
}
