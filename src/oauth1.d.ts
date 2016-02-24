import { Popup } from './popup';
import { Http, Response } from 'angular2/http';
import { Config, IOauth1Options } from './config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
export declare class Oauth1 {
    private http;
    private popup;
    private config;
    private static base;
    private defaults;
    constructor(http: Http, popup: Popup, config: Config);
    open(options?: IOauth1Options, userData?: any): Observable<Response>;
    private exchangeForToken(oauthData, userData?);
    private buildQueryString(obj);
}
