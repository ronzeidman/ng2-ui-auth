import { Injector } from 'angular2/core';
import { Shared } from './shared';
import { Http, Response, RequestOptionsArgs } from 'angular2/http';
import { Config } from './config';
import { Observable } from 'rxjs/Observable';
export declare class Oauth {
    private http;
    private injector;
    private shared;
    private config;
    constructor(http: Http, injector: Injector, shared: Shared, config: Config);
    authenticate(name: string, userData?: any): Observable<Response>;
    unlink(provider: string, opts: RequestOptionsArgs): Observable<Response>;
}
