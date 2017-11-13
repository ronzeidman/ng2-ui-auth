import { deepMerge, getWindowOrigin } from './utils';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigService, IPopupOptions, IOauth2Options, IOauth1Options } from './config.service';
import { switchMap, take, map, takeWhile, delay } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { _throw } from 'rxjs/observable/throw';
import { empty } from 'rxjs/observable/empty';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';

/**
 * Created by Ron on 17/12/2015.
 */

@Injectable()
export class PopupService {
    public open(url: string, options: IOauth2Options | IOauth1Options, cordova: boolean | null) {
        const stringifiedOptions = this.stringifyOptions(this.prepareOptions(options.popupOptions));
        const UA = window.navigator.userAgent;
        cordova = cordova === null ? this.isCordovaApp() : cordova;
        const windowName = cordova ? '_blank' : options.name;

        const popupWindow = window.open(url, windowName, stringifiedOptions);

        if (popupWindow && popupWindow.focus) {
            popupWindow.focus();
        }

        return cordova
            ? this.eventListener(popupWindow, options.redirectUri || getWindowOrigin())
            : this.pollPopup(popupWindow, options.redirectUri || getWindowOrigin());
    }

    public eventListener(popupWindow: Window, redirectUri: string) {
        if (!popupWindow) {
            throw new Error('Popup was not created');
        }
        return merge(
            fromEvent<Event>(popupWindow, 'exit').pipe(
                delay(100),
                map(() => { throw new Error('Authentication Canceled'); }),
            ),
            fromEvent(popupWindow, 'loadstart'),
        ).pipe(
            switchMap((event: Event & { url: string }) => {
                if (!popupWindow || popupWindow.closed) {
                    return Observable.throw(new Error('Authentication Canceled'));
                }
                if (event.url.indexOf(redirectUri) !== 0) {
                    return empty();
                }

                const parser = document.createElement('a');
                parser.href = event.url;

                if (parser.search || parser.hash) {
                    const queryParams = parser.search.substring(1).replace(/\/$/, '');
                    const hashParams = parser.hash.substring(1).replace(/\/$/, '');
                    const hash = this.parseQueryString(hashParams);
                    const qs = this.parseQueryString(queryParams);
                    const allParams = { ...qs, ...hash };

                    popupWindow.close();

                    if (allParams.error) {
                        throw allParams.error;
                    } else {
                        return of(allParams);
                    }
                }
                return empty();
            }),
            take(1),
        );
    }

    public pollPopup(popupWindow: Window, redirectUri: string) {
        return interval(50)
            .pipe(
            switchMap(() => {
                if (!popupWindow || popupWindow.closed) {
                    return _throw(new Error('Authentication Canceled'));
                }

                const popupWindowOrigin = getWindowOrigin(popupWindow);

                if (popupWindowOrigin &&
                    (redirectUri.indexOf(popupWindowOrigin) === 0 || popupWindowOrigin.indexOf(redirectUri) === 0) &&
                    (popupWindow.location.search || popupWindow.location.hash)) {
                    const queryParams = popupWindow.location.search.substring(1).replace(/\/$/, '');
                    const hashParams = popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                    const hash = this.parseQueryString(hashParams);
                    const qs = this.parseQueryString(queryParams);
                    popupWindow.close();
                    const allParams = { ...qs, ...hash };
                    if (allParams.error) {
                        throw allParams.error;
                    } else {
                        return of(allParams);
                    }
                }
                return empty();
            }),
            take(1),
        );
    }

    private prepareOptions(options?: IPopupOptions) {
        options = options || {};
        const width = options.width || 500;
        const height = options.height || 500;
        return {
            width,
            height,
            left: window.screenX + ((window.outerWidth - width) / 2),
            top: window.screenY + ((window.outerHeight - height) / 2.5),
            toolbar: options.visibleToolbar ? 'yes' : 'no',
            ...options,
        };
    }

    private stringifyOptions(options: { [index: string]: string | number | boolean | null | undefined }) {
        return Object.keys(options)
            .map((key) => options[key] === null || options[key] === undefined
                ? key
                : key + '=' + options[key],
        ).join(',');
    }

    private parseQueryString(joinedKeyValue: string): any {
        let key;
        let value;
        return joinedKeyValue.split('&').reduce(
            (obj, keyValue) => {
                if (keyValue) {
                    value = keyValue.split('=');
                    key = decodeURIComponent(value[0]);
                    obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
                }
                return obj;
            },
            {} as { [k: string]: string | true });
    }

    private isCordovaApp() {
        return !!(window && (
            (window as any).cordova ||
            window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('CriOS') > -1
        ));
    }
}
