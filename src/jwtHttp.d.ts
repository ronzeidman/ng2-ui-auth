import { Http, Response, RequestOptionsArgs, Request, RequestOptions, ConnectionBackend } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Config } from './config';
import { Shared } from './shared';
export declare class JwtHttp extends Http {
    private _shared;
    private _config;
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, _shared: Shared, _config: Config);
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
    get(url: string, options?: RequestOptionsArgs): Observable<Response>;
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    head(url: string, options?: RequestOptionsArgs): Observable<Response>;
}
