import { Observable } from 'rxjs/Observable';
import { ConfigService, IOauth2Options } from './config.service';
import { PopupService } from './popup.service';
import { StorageService } from './storage.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { JwtHttp } from './jwt-http.service';
export declare class Oauth2Service {
    private http;
    private popup;
    private storage;
    private config;
    private static base;
    private defaults;
    constructor(http: JwtHttp, popup: PopupService, storage: StorageService, config: ConfigService);
    open(options: IOauth2Options, userData?: any): Observable<{}>;
    private exchangeForToken(oauthData, userData?);
    private buildQueryString();
}
