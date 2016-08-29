import { Http, Response, RequestOptionsArgs, Request, RequestOptions, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Config } from './config';
import { Shared } from './shared';
export interface JwtRequestOptionsArgs extends RequestOptionsArgs {
    autoRefreshToken?: boolean;
}
export declare class JwtHttp extends Http {
    private _shared;
    private _config;
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, _shared: Shared, _config: Config);
    request(url: string | Request, options?: JwtRequestOptionsArgs): Observable<Response>;
    get(url: string, options?: JwtRequestOptionsArgs): Observable<Response>;
    post(url: string, body: string, options?: JwtRequestOptionsArgs): Observable<Response>;
    put(url: string, body: string, options?: JwtRequestOptionsArgs): Observable<Response>;
    delete(url: string, options?: JwtRequestOptionsArgs): Observable<Response>;
    patch(url: string, body: string, options?: JwtRequestOptionsArgs): Observable<Response>;
    head(url: string, options?: JwtRequestOptionsArgs): Observable<Response>;
    refreshToken(): Observable<Response>;
    private actualRequest(url, options?);
    private setHeaders(obj);
}
