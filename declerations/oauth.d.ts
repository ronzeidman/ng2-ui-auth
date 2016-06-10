import { Injector } from '@angular/core';
import { Shared } from './shared';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Config } from './config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
export declare class Oauth {
    private http;
    private injector;
    private shared;
    private config;
    constructor(http: Http, injector: Injector, shared: Shared, config: Config);
    authenticate(name: string, userData?: any): Observable<Response>;
    unlink(provider: string, opts: RequestOptionsArgs): Observable<Response>;
}
