import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Config, IOauth2Options } from './config';
import { Popup } from './popup';
import { Storage } from './storage';
import 'rxjs/add/operator/mergeMap';
export declare class Oauth2 {
    private http;
    private popup;
    private storage;
    private config;
    private static base;
    private defaults;
    constructor(http: Http, popup: Popup, storage: Storage, config: Config);
    open(options: IOauth2Options, userData?: any): Observable<{}>;
    private exchangeForToken(oauthData, userData?);
    private buildQueryString();
}
