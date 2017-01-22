import { SharedService } from './shared.service';
import { ConfigService } from './config.service';
import { RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { JwtHttp } from './jwt-http.service';
export declare class LocalService {
    private http;
    private shared;
    private config;
    constructor(http: JwtHttp, shared: SharedService, config: ConfigService);
    login(user: string | Object, opts?: RequestOptionsArgs): Observable<Response>;
    signup(user: string | Object, opts?: RequestOptionsArgs): Observable<Response>;
}
