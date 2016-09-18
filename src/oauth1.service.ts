import {Injectable} from '@angular/core';
import {PopupService} from './popup.service';
import {Response} from '@angular/http';
import {joinUrl, assign} from './utils';
import {ConfigService, IOauth1Options} from './config.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap';
import {JwtHttp} from './jwt-http.service';

/**
 * Created by Ron on 17/12/2015.
 */


@Injectable()
export class Oauth1Service {
    private static base: IOauth1Options = {
        url: null,
        name: null,
        popupOptions: null,
        redirectUri: null,
        authorizationEndpoint: null
    };
    private defaults: IOauth1Options;
    constructor(private http: JwtHttp, private popup: PopupService, private config: ConfigService) {}
    open(options?: IOauth1Options, userData?: any): Observable<Response> {
        this.defaults = assign({}, Oauth1Service.base, options);
        let popupWindow;
        let serverUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;

        if (!this.config.cordova) {
            popupWindow = this.popup.open('', this.defaults.name, this.defaults.popupOptions/*, this.defaults.redirectUri*/);
        }

        return this.http.post(serverUrl, JSON.stringify(this.defaults))
            .concatMap((response: Response) => {
                if (this.config.cordova) {
                    popupWindow = this.popup.open(
                        [this.defaults.authorizationEndpoint, this.buildQueryString(response.json())].join('?'),
                        this.defaults.name,
                        this.defaults.popupOptions);
                } else {
                    popupWindow.popupWindow.location =
                        [this.defaults.authorizationEndpoint, this.buildQueryString(response.json())].join('?');
                }

                return this.config.cordova ? popupWindow.eventListener(this.defaults.redirectUri) : popupWindow.pollPopup();
            })
            .concatMap((response) => {
                return this.exchangeForToken(response, userData);
            });
    }
    private exchangeForToken(oauthData, userData?: any) {
        let data = assign({}, oauthData, userData);
        let exchangeForTokenUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        return this.http.post(exchangeForTokenUrl, data, { withCredentials: this.config.withCredentials });
    }
    private buildQueryString(obj: Object) {
        return Object.keys(obj).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }).join('&');
    }
}
