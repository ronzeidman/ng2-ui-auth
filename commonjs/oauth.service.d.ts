import { Injector } from '@angular/core';
import { SharedService } from './shared.service';
import { Response, RequestOptionsArgs } from '@angular/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { JwtHttp } from './jwt-http.service';
export declare class OauthService {
    private http;
    private injector;
    private shared;
    private config;
    constructor(http: JwtHttp, injector: Injector, shared: SharedService, config: ConfigService);
    authenticate(name: string, userData?: any): Observable<Response>;
    unlink(provider: string, opts: RequestOptionsArgs): Observable<Response>;
}
