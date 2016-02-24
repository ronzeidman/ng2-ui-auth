import { Shared } from './shared';
import { Config } from './config';
import { Http, RequestOptionsArgs, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
export declare class Local {
    private http;
    private shared;
    private config;
    constructor(http: Http, shared: Shared, config: Config);
    login(user: any, opts?: RequestOptionsArgs): Observable<Response>;
    signup(user: any, opts?: RequestOptionsArgs): Observable<Response>;
}
