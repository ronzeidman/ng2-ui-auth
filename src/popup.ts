import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {extend} from './utils';
import {Config, IPopupOptions} from './config';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';


/**
 * Created by Ron on 17/12/2015.
 */

@Injectable()
export class Popup {
    url = '';
    popupWindow: Window = null;

    private static prepareOptions(options: IPopupOptions) {
        options = options || {};
        let width = options.width || 500;
        let height = options.height || 500;
        return extend(
            {
                width: width,
                height: height,
                left: window.screenX + ((window.outerWidth - width) / 2),
                top: window.screenY + ((window.outerHeight - height) / 2.5)
            },
            options);
    }

    private static stringifyOptions(options: Object) {
        return Object.keys(options).map((key) => {
            return key + '=' + options[key];
        }).join(',');
    }

    private static parseQueryString(joinedKeyValue: string): any {
        let key, value;
        return joinedKeyValue.split('&').reduce(
            (obj, keyValue) => {
                if (keyValue) {
                    value = keyValue.split('=');
                    key = decodeURIComponent(value[0]);
                    obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
                }
                return obj;
            },
            {});
    }


    constructor(private config: Config) {}
    open(url: string, name: string, options: IPopupOptions) {
        this.url = url;

        let stringifiedOptions = Popup.stringifyOptions(Popup.prepareOptions(options));
        let UA = window.navigator.userAgent;
        let windowName = (this.config.cordova || UA.indexOf('CriOS') > -1) ? '_blank' : name;

        this.popupWindow = window.open(url, windowName, stringifiedOptions);

        window['popup'] = this.popupWindow;

        if (this.popupWindow && this.popupWindow.focus) {
            this.popupWindow.focus();
        }

        return this;
    }

    eventListener(redirectUri: string) {
        return Observable
            .fromEvent(this.popupWindow, 'loadstart')
            .concatMap((event: Event & { url: string }) => {
                if (!this.popupWindow || this.popupWindow.closed) {
                    return <any>['Popup Window Closed'];
                }
                if (event.url.indexOf(redirectUri) !== 0) {
                    return <any>[];
                }

                let parser = document.createElement('a');
                parser.href = event.url;

                if (parser.search || parser.hash) {
                    let queryParams = parser.search.substring(1).replace(/\/$/, '');
                    let hashParams = parser.hash.substring(1).replace(/\/$/, '');
                    let hash = Popup.parseQueryString(hashParams);
                    let qs = Popup.parseQueryString(queryParams);

                    extend(qs, hash);

                    this.popupWindow.close();

                    if (qs.error) {
                        throw qs.error;
                    } else {
                        return <any>[qs];
                    }
                }
                return <any>[];
            })
            .take(1)
            .takeWhile((response) => response !== 'Popup Window Closed');
    }

    pollPopup() {
        return Observable
            .interval(50)
            .concatMap(() => {
                if (!this.popupWindow || this.popupWindow.closed) {
                    return <any>['Popup Window Closed'];
                }
                let documentOrigin = document.location.host;
                let popupWindowOrigin = '';
                try {
                    popupWindowOrigin = this.popupWindow.location.host;
                } catch (error) {
                    // ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
                    //error instanceof DOMException && error.name === 'SecurityError'
                }
                if (popupWindowOrigin === documentOrigin && (this.popupWindow.location.search || this.popupWindow.location.hash)) {
                    let queryParams = this.popupWindow.location.search.substring(1).replace(/\/$/, '');
                    let hashParams = this.popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                    let hash = Popup.parseQueryString(hashParams);
                    let qs = Popup.parseQueryString(queryParams);
                    this.popupWindow.close();
                    extend(qs, hash);
                    if (qs.error) {
                        throw qs.error;
                    } else {
                        return <any>[qs];
                    }
                }
                return <any>[];
            })
            .take(1)
            .takeWhile((response) => response !== 'Popup Window Closed');
    }
}
