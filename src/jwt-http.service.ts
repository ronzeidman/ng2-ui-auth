import {Injectable} from '@angular/core';
import {Http, RequestMethod, Response, RequestOptionsArgs, Headers, Request, RequestOptions, ConnectionBackend} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {ConfigService} from './config.service';
import {SharedService} from './shared.service';
/**
 * Created by Ron on 06/01/2016.
 */

export interface JwtRequestOptionsArgs extends RequestOptionsArgs {
    autoRefreshToken?: boolean
}

@Injectable()
export class JwtHttp extends Http {
    constructor(_backend: ConnectionBackend,
                _defaultOptions: RequestOptions,
                private _shared: SharedService,
                private _config: ConfigService) {
        super(_backend, _defaultOptions);
    }

    request(url: string | Request, options?: JwtRequestOptionsArgs): Observable<Response> {
        //if the token is expired the "getExpirationDate" function returns null
        if (this._shared.getToken() && !this._shared.getExpirationDate() &&
            options.autoRefreshToken ||
            typeof options.autoRefreshToken === 'undefined' && this._config.autoRefreshToken) {
            return this.refreshToken()
                .switchMap(() => this.actualRequest(url, options));
        }
        return this.actualRequest(url, options);
    }

    get(url: string, options?: JwtRequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Get;
        return this.request(url, options);
    }

    post(url: string, body: string, options?: JwtRequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Post;
        options.body = body;
        return this.request(url, options);
    }

    put(url: string, body: string, options?: JwtRequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Put;
        options.body = body;
        return this.request(url, options);
    }

    delete(url: string, options?: JwtRequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Delete;
        return this.request(url, options);
    }

    patch(url: string, body: string, options?: JwtRequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Patch;
        options.body = body;
        return this.request(url, options);
    }

    head(url: string, options?: JwtRequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Head;
        return this.request(url, options);
    }


    refreshToken(): Observable<Response> {
        const authHeader = new Headers();
        authHeader.append(this._config.authHeader, (this._config.authToken + ' ' + this._shared.getToken()));
        return super
            .get(this._config.refreshUrl, {
                headers: authHeader
            })
            .do((res: Response) => this._shared.setToken(res));
    }

    private actualRequest(url: string | Request, options?: JwtRequestOptionsArgs) {
        if (url instanceof Request) {
            url.headers = url.headers || new Headers();
            this.setHeaders(url);
        } else {
            options = options || {};
            this.setHeaders(options);
        }
        return super.request(url, options);
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
        if (this._shared.isAuthenticated()) {
            obj.headers.set(this._config.authHeader, this._config.authToken + ' ' + this._shared.getToken());
        }
    }
}
