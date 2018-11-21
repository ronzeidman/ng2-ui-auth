import { Injectable } from '@angular/core';
import { empty, fromEvent, interval, merge, Observable, of, throwError } from 'rxjs';
import { delay, map, switchMap, take } from 'rxjs/operators';
import { IOauth1Options, IOauth2Options, IPopupOptions } from './config-interfaces';
import { getWindowOrigin } from './utils';

declare const cordova: any;
@Injectable()
export class PopupService {
  public open(url: string, options: IOauth2Options | IOauth1Options, cordova = this.isCordovaApp()) {
    const stringifiedOptions = this.stringifyOptions(this.prepareOptions(options.popupOptions));
    const windowName = cordova ? '_blank' : options.name;

    const popupWindow = typeof window !== 'undefined' ? window.open(url, windowName, stringifiedOptions) : null;

    if (popupWindow) {
      if (popupWindow.focus) {
        popupWindow.focus();
      }
      return of(popupWindow);
    }
    return empty();
  }

  public waitForClose(popupWindow: Window, cordova = this.isCordovaApp(), redirectUri = getWindowOrigin()) {
    return cordova ? this.eventListener(popupWindow, redirectUri) : this.pollPopup(popupWindow, redirectUri);
  }

  private eventListener(popupWindow: Window, redirectUri = getWindowOrigin()) {
    if (!popupWindow) {
      throw new Error('Popup was not created');
    }
    return merge(
      fromEvent<Event>(popupWindow, 'exit').pipe(
        delay(100),
        map(() => {
          throw new Error('Authentication Canceled');
        })
      ),
      fromEvent(popupWindow, 'loadstart')
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
      take(1)
    );
  }

  private pollPopup(popupWindow: Window, redirectUri = getWindowOrigin()) {
    return interval(50).pipe(
      switchMap(() => {
        if (!popupWindow || popupWindow.closed) {
          return throwError(new Error('Authentication Canceled'));
        }

        const popupWindowOrigin = getWindowOrigin(popupWindow);

        if (
          popupWindowOrigin &&
          (redirectUri.indexOf(popupWindowOrigin) === 0 || popupWindowOrigin.indexOf(redirectUri) === 0) &&
          (popupWindow.location.search || popupWindow.location.hash)
        ) {
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
      take(1)
    );
  }

  private prepareOptions(options?: IPopupOptions) {
    options = options || {};
    const width = options.width || 500;
    const height = options.height || 500;
    return {
      width,
      height,
      left: window.screenX + (window.outerWidth - width) / 2,
      top: window.screenY + (window.outerHeight - height) / 2.5,
      toolbar: options.visibleToolbar ? 'yes' : 'no',
      ...options
    };
  }

  private stringifyOptions(options: { [index: string]: string | number | boolean | null | undefined }) {
    return Object.keys(options)
      .map(key => (options[key] === null || options[key] === undefined ? key : key + '=' + options[key]))
      .join(',');
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
      {} as { [k: string]: string | true }
    );
  }

  private isCordovaApp() {
    return typeof cordova === 'object' || (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
  }
}
