import {Injectable} from 'angular2/core';
import {Popup} from './popup';
import {Http, Response} from 'angular2/http';
import {extend, joinUrl} from './utils';
import {Config, IOauth1Options} from './config';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

/**
 * Created by Ron on 17/12/2015.
 */


@Injectable()
export class Oauth1 {
    private static base: IOauth1Options = {
        url: null,
        name: null,
        popupOptions: null,
        redirectUri: null,
        authorizationEndpoint: null
    };
    private defaults: IOauth1Options;
    constructor(private http: Http, private popup: Popup, private config: Config) {}
    open(options?: IOauth1Options, userData?: any): Observable<Response> {
        this.defaults = extend(options, Oauth1.base);
        let popupWindow;
        let serverUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;

        if (!this.config.cordova) {
            popupWindow = this.popup.open('', this.defaults.name, this.defaults.popupOptions/*, this.defaults.redirectUri*/);
        }

        return this.http.post(serverUrl, JSON.stringify(this.defaults))
            .mergeMap((response: Response) => {
                if (this.config.cordova) {
                    popupWindow = this.popup.open(
                        [this.defaults.authorizationEndpoint, this.buildQueryString(response.json())].join('?'),
                        this.defaults.name,
                        this.defaults.popupOptions/*, this.defaults.redirectUri*/);
                } else {
                    popupWindow.popupWindow.location =
                        [this.defaults.authorizationEndpoint, this.buildQueryString(response.json())].join('?');
                }

                return this.config.cordova ? popupWindow.eventListener(this.defaults.redirectUri) : popupWindow.pollPopup();
            })
            .mergeMap((response) => {
                return this.exchangeForToken(response, userData);
            });
    }
    private exchangeForToken(oauthData, userData?: any) {
        let data = extend({}, userData);
        extend(data, oauthData);
        let exchangeForTokenUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        return this.http.post(exchangeForTokenUrl, data/*TODO: support, { withCredentials: this.config.withCredentials }*/);
    }
    private buildQueryString(obj: Object) {
        return Object.keys(obj).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }).join('&');
    }
}
