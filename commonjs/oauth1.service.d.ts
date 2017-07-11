import {PopupService} from './popup.service';
import {Response} from '@angular/http';
import {ConfigService, IOauth1Options} from './config.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {JwtHttp} from './jwt-http.service';

export declare class Oauth1Service {
    private http;
    private popup;
    private config;
    private static base;
    private defaults;
    constructor(http: JwtHttp, popup: PopupService, config: ConfigService);
    open(options?: IOauth1Options, userData?: any): Observable<Response>;
    private exchangeForToken(oauthData, userData?);
    private buildQueryString(obj);
}
