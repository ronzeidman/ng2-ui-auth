import { Shared } from './shared';
import { Config } from './config';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
export declare class Local {
    private http;
    private shared;
    private config;
    constructor(http: Http, shared: Shared, config: Config);
    login(user: string | Object, opts?: RequestOptionsArgs): Observable<Response>;
    signup(user: string | Object, opts?: RequestOptionsArgs): Observable<Response>;
}
