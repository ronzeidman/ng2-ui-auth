import {Injectable} from '@angular/core';
import {Http, RequestMethod, Response, RequestOptionsArgs, Headers, Request} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {ConfigService} from './config.service';
import {SharedService} from './shared.service';
/**
 * Created by Ron on 06/01/2016.
 */

export interface JwtRequestOptionsArgs extends RequestOptionsArgs {
    autoRefreshToken?: boolean
}

@Injectable()
export class JwtHttp {
    constructor(
        private _http: Http,
        private _shared: SharedService,
        private _config: ConfigService
    ) {}

    request(url: string | Request, options?: JwtRequestOptionsArgs): Observable<Response> {
        //if the token is expired the "getExpirationDate" function returns null
        const exp = this._shared.getExpirationDate();
        if (this._shared.getToken() &&
            (!exp || exp.getTime() + this._config.refreshBeforeExpiration > Date.now())  &&
            (options.autoRefreshToken ||
            typeof options.autoRefreshToken === 'undefined' && this._config.autoRefreshToken)) {
            return this.refreshToken()
                .switchMap(() => this.actualRequest(url, options));
        }
        if (this._config.tryTokenRefreshIfUnauthorized) {
            return this.actualRequest(url, options)
                .catch((response: Response) => {
                    if (response.status === 401) {
                        return this.refreshToken()
                            .switchMap(() => this.actualRequest(url, options));
                    }
                    throw response;
                })
        }
        return this.actualRequest(url, options);
    }

    get(url: string, options?: JwtRequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Get;
        return this.request(url, options);
    }

    post(url: string, body: any, options?: JwtRequestOptionsArgs): Observable<Response> {
        options = options || {};
        options.method = RequestMethod.Post;
        options.body = body;
        return this.request(url, options);
    }

    put(url: string, body: any, options?: JwtRequestOptionsArgs): Observable<Response> {
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

    patch(url: string, body: any, options?: JwtRequestOptionsArgs): Observable<Response> {
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
        return this._http
            .get(this._config.refreshUrl, {
                headers: authHeader
            })
            .do((res: Response) => this._shared.setToken(res));
    }

    protected actualRequest(url: string | Request, options?: JwtRequestOptionsArgs) {
        if (url instanceof Request) {
            url.headers = url.headers || new Headers();
            this.setHeaders(url);
        } else {
            options = options || {};
            this.setHeaders(options);
        }
        return this._http.request(url, options);
    }

    protected setHeaders(obj: { headers?: Headers, [index: string]: any }) {
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
