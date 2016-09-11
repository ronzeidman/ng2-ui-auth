import {Observable} from 'rxjs/Observable';
import {Config, IOauth2Options} from './config';
import {Popup} from './popup';
import {Storage} from './storage';
import 'rxjs/add/operator/concatMap';
import {JwtHttp} from './jwtHttp';
export declare class Oauth2 {
    private http;
    private popup;
    private storage;
    private config;
    private static base;
    private defaults;
    constructor(http: JwtHttp, popup: Popup, storage: Storage, config: Config);
    open(options: IOauth2Options, userData?: any): Observable<{}>;
    private exchangeForToken(oauthData, userData?);
    private buildQueryString();
}
