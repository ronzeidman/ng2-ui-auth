import {Shared} from './shared';
import {Config} from './config';
import {RequestOptionsArgs, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {JwtHttp} from './jwtHttp';
export declare class Local {
    private http;
    private shared;
    private config;
    constructor(http: JwtHttp, shared: Shared, config: Config);
    login(user: string | Object, opts?: RequestOptionsArgs): Observable<Response>;
    signup(user: string | Object, opts?: RequestOptionsArgs): Observable<Response>;
}
