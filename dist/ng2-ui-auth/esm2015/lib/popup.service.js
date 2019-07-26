/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { empty, fromEvent, interval, merge, Observable, of, throwError } from 'rxjs';
import { delay, map, switchMap, take } from 'rxjs/operators';
import { getWindowOrigin } from './utils';
export class PopupService {
    /**
     * @param {?} url
     * @param {?} options
     * @param {?=} cordova
     * @return {?}
     */
    open(url, options, cordova = this.isCordovaApp()) {
        /** @type {?} */
        const stringifiedOptions = this.stringifyOptions(this.prepareOptions(options.popupOptions));
        /** @type {?} */
        const windowName = cordova ? '_blank' : options.name;
        /** @type {?} */
        const popupWindow = typeof window !== 'undefined' ? window.open(url, windowName, stringifiedOptions) : null;
        if (popupWindow) {
            if (popupWindow.focus) {
                popupWindow.focus();
            }
            return of(popupWindow);
        }
        return empty();
    }
    /**
     * @param {?} popupWindow
     * @param {?=} cordova
     * @param {?=} redirectUri
     * @return {?}
     */
    waitForClose(popupWindow, cordova = this.isCordovaApp(), redirectUri = getWindowOrigin()) {
        return cordova ? this.eventListener(popupWindow, redirectUri) : this.pollPopup(popupWindow, redirectUri);
    }
    /**
     * @private
     * @param {?} popupWindow
     * @param {?=} redirectUri
     * @return {?}
     */
    eventListener(popupWindow, redirectUri = getWindowOrigin()) {
        if (!popupWindow) {
            throw new Error('Popup was not created');
        }
        return merge(fromEvent(popupWindow, 'exit').pipe(delay(100), map((/**
         * @return {?}
         */
        () => {
            throw new Error('Authentication Canceled');
        }))), fromEvent(popupWindow, 'loadstart')).pipe(switchMap((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (!popupWindow || popupWindow.closed) {
                return Observable.throw(new Error('Authentication Canceled'));
            }
            if (event.url.indexOf(redirectUri) !== 0) {
                return empty();
            }
            /** @type {?} */
            const parser = document.createElement('a');
            parser.href = event.url;
            if (parser.search || parser.hash) {
                /** @type {?} */
                const queryParams = parser.search.substring(1).replace(/\/$/, '');
                /** @type {?} */
                const hashParams = parser.hash.substring(1).replace(/\/$/, '');
                /** @type {?} */
                const hash = this.parseQueryString(hashParams);
                /** @type {?} */
                const qs = this.parseQueryString(queryParams);
                /** @type {?} */
                const allParams = Object.assign({}, qs, hash);
                popupWindow.close();
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return of(allParams);
                }
            }
            return empty();
        })), take(1));
    }
    /**
     * @private
     * @param {?} popupWindow
     * @param {?=} redirectUri
     * @return {?}
     */
    pollPopup(popupWindow, redirectUri = getWindowOrigin()) {
        return interval(50).pipe(switchMap((/**
         * @return {?}
         */
        () => {
            if (!popupWindow || popupWindow.closed) {
                return throwError(new Error('Authentication Canceled'));
            }
            /** @type {?} */
            const popupWindowOrigin = getWindowOrigin(popupWindow);
            if (popupWindowOrigin &&
                (redirectUri.indexOf(popupWindowOrigin) === 0 || popupWindowOrigin.indexOf(redirectUri) === 0) &&
                (popupWindow.location.search || popupWindow.location.hash)) {
                /** @type {?} */
                const queryParams = popupWindow.location.search.substring(1).replace(/\/$/, '');
                /** @type {?} */
                const hashParams = popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                /** @type {?} */
                const hash = this.parseQueryString(hashParams);
                /** @type {?} */
                const qs = this.parseQueryString(queryParams);
                popupWindow.close();
                /** @type {?} */
                const allParams = Object.assign({}, qs, hash);
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return of(allParams);
                }
            }
            return empty();
        })), take(1));
    }
    /**
     * @private
     * @param {?=} options
     * @return {?}
     */
    prepareOptions(options) {
        options = options || {};
        /** @type {?} */
        const width = options.width || 500;
        /** @type {?} */
        const height = options.height || 500;
        return Object.assign({ width,
            height, left: window.screenX + (window.outerWidth - width) / 2, top: window.screenY + (window.outerHeight - height) / 2.5, toolbar: options.visibleToolbar ? 'yes' : 'no' }, options);
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    stringifyOptions(options) {
        return Object.keys(options)
            .map((/**
         * @param {?} key
         * @return {?}
         */
        key => (options[key] === null || options[key] === undefined ? key : key + '=' + options[key])))
            .join(',');
    }
    /**
     * @private
     * @param {?} joinedKeyValue
     * @return {?}
     */
    parseQueryString(joinedKeyValue) {
        /** @type {?} */
        let key;
        /** @type {?} */
        let value;
        return joinedKeyValue.split('&').reduce((/**
         * @param {?} obj
         * @param {?} keyValue
         * @return {?}
         */
        (obj, keyValue) => {
            if (keyValue) {
                value = keyValue.split('=');
                key = decodeURIComponent(value[0]);
                obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
            }
            return obj;
        }), (/** @type {?} */ ({})));
    }
    /**
     * @private
     * @return {?}
     */
    isCordovaApp() {
        return typeof cordova === 'object' || (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
    }
}
PopupService.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsibGliL3BvcHVwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRixPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUkxQyxNQUFNLE9BQU8sWUFBWTs7Ozs7OztJQUNoQixJQUFJLENBQUMsR0FBVyxFQUFFLE9BQXdDLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7O2NBQ3hGLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7Y0FDckYsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSTs7Y0FFOUMsV0FBVyxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFFM0csSUFBSSxXQUFXLEVBQUU7WUFDZixJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3JCLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNyQjtZQUNELE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3hCO1FBQ0Qs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RyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQ2xGO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEdBQ0QsbUJBQUEsRUFBRSxFQUFrQyxDQUNyQyxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFTyxZQUFZO1FBQ2xCLE9BQU8sT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1SCxDQUFDOzs7WUF4SUYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZW1wdHksIGZyb21FdmVudCwgaW50ZXJ2YWwsIG1lcmdlLCBPYnNlcnZhYmxlLCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWxheSwgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IElPYXV0aDFPcHRpb25zLCBJT2F1dGgyT3B0aW9ucywgSVBvcHVwT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBnZXRXaW5kb3dPcmlnaW4gfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmRlY2xhcmUgY29uc3QgY29yZG92YTogYW55O1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQb3B1cFNlcnZpY2Uge1xyXG4gIHB1YmxpYyBvcGVuKHVybDogc3RyaW5nLCBvcHRpb25zOiBJT2F1dGgyT3B0aW9ucyB8IElPYXV0aDFPcHRpb25zLCBjb3Jkb3ZhID0gdGhpcy5pc0NvcmRvdmFBcHAoKSkge1xyXG4gICAgY29uc3Qgc3RyaW5naWZpZWRPcHRpb25zID0gdGhpcy5zdHJpbmdpZnlPcHRpb25zKHRoaXMucHJlcGFyZU9wdGlvbnMob3B0aW9ucy5wb3B1cE9wdGlvbnMpKTtcclxuICAgIGNvbnN0IHdpbmRvd05hbWUgPSBjb3Jkb3ZhID8gJ19ibGFuaycgOiBvcHRpb25zLm5hbWU7XHJcblxyXG4gICAgY29uc3QgcG9wdXBXaW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5vcGVuKHVybCwgd2luZG93TmFtZSwgc3RyaW5naWZpZWRPcHRpb25zKSA6IG51bGw7XHJcblxyXG4gICAgaWYgKHBvcHVwV2luZG93KSB7XHJcbiAgICAgIGlmIChwb3B1cFdpbmRvdy5mb2N1cykge1xyXG4gICAgICAgIHBvcHVwV2luZG93LmZvY3VzKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG9mKHBvcHVwV2luZG93KTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbXB0eSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHdhaXRGb3JDbG9zZShwb3B1cFdpbmRvdzogV2luZG93LCBjb3Jkb3ZhID0gdGhpcy5pc0NvcmRvdmFBcHAoKSwgcmVkaXJlY3RVcmkgPSBnZXRXaW5kb3dPcmlnaW4oKSkge1xyXG4gICAgcmV0dXJuIGNvcmRvdmEgPyB0aGlzLmV2ZW50TGlzdGVuZXIocG9wdXBXaW5kb3csIHJlZGlyZWN0VXJpKSA6IHRoaXMucG9sbFBvcHVwKHBvcHVwV2luZG93LCByZWRpcmVjdFVyaSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV2ZW50TGlzdGVuZXIocG9wdXBXaW5kb3c6IFdpbmRvdywgcmVkaXJlY3RVcmkgPSBnZXRXaW5kb3dPcmlnaW4oKSkge1xyXG4gICAgaWYgKCFwb3B1cFdpbmRvdykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BvcHVwIHdhcyBub3QgY3JlYXRlZCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lcmdlKFxyXG4gICAgICBmcm9tRXZlbnQ8RXZlbnQ+KHBvcHVwV2luZG93LCAnZXhpdCcpLnBpcGUoXHJcbiAgICAgICAgZGVsYXkoMTAwKSxcclxuICAgICAgICBtYXAoKCkgPT4ge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICksXHJcbiAgICAgIGZyb21FdmVudChwb3B1cFdpbmRvdywgJ2xvYWRzdGFydCcpXHJcbiAgICApLnBpcGUoXHJcbiAgICAgIHN3aXRjaE1hcCgoZXZlbnQ6IEV2ZW50ICYgeyB1cmw6IHN0cmluZyB9KSA9PiB7XHJcbiAgICAgICAgaWYgKCFwb3B1cFdpbmRvdyB8fCBwb3B1cFdpbmRvdy5jbG9zZWQpIHtcclxuICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudC51cmwuaW5kZXhPZihyZWRpcmVjdFVyaSkgIT09IDApIHtcclxuICAgICAgICAgIHJldHVybiBlbXB0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgIHBhcnNlci5ocmVmID0gZXZlbnQudXJsO1xyXG5cclxuICAgICAgICBpZiAocGFyc2VyLnNlYXJjaCB8fCBwYXJzZXIuaGFzaCkge1xyXG4gICAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBwYXJzZXIuc2VhcmNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgY29uc3QgaGFzaFBhcmFtcyA9IHBhcnNlci5oYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhoYXNoUGFyYW1zKTtcclxuICAgICAgICAgIGNvbnN0IHFzID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5UGFyYW1zKTtcclxuICAgICAgICAgIGNvbnN0IGFsbFBhcmFtcyA9IHsgLi4ucXMsIC4uLmhhc2ggfTtcclxuXHJcbiAgICAgICAgICBwb3B1cFdpbmRvdy5jbG9zZSgpO1xyXG5cclxuICAgICAgICAgIGlmIChhbGxQYXJhbXMuZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgYWxsUGFyYW1zLmVycm9yO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGFsbFBhcmFtcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbXB0eSgpO1xyXG4gICAgICB9KSxcclxuICAgICAgdGFrZSgxKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcG9sbFBvcHVwKHBvcHVwV2luZG93OiBXaW5kb3csIHJlZGlyZWN0VXJpID0gZ2V0V2luZG93T3JpZ2luKCkpIHtcclxuICAgIHJldHVybiBpbnRlcnZhbCg1MCkucGlwZShcclxuICAgICAgc3dpdGNoTWFwKCgpID0+IHtcclxuICAgICAgICBpZiAoIXBvcHVwV2luZG93IHx8IHBvcHVwV2luZG93LmNsb3NlZCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBvcHVwV2luZG93T3JpZ2luID0gZ2V0V2luZG93T3JpZ2luKHBvcHVwV2luZG93KTtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgcG9wdXBXaW5kb3dPcmlnaW4gJiZcclxuICAgICAgICAgIChyZWRpcmVjdFVyaS5pbmRleE9mKHBvcHVwV2luZG93T3JpZ2luKSA9PT0gMCB8fCBwb3B1cFdpbmRvd09yaWdpbi5pbmRleE9mKHJlZGlyZWN0VXJpKSA9PT0gMCkgJiZcclxuICAgICAgICAgIChwb3B1cFdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggfHwgcG9wdXBXaW5kb3cubG9jYXRpb24uaGFzaClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gcG9wdXBXaW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgY29uc3QgaGFzaFBhcmFtcyA9IHBvcHVwV2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1tcXC8kXS8sICcnKTtcclxuICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaGFzaFBhcmFtcyk7XHJcbiAgICAgICAgICBjb25zdCBxcyA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgICBwb3B1cFdpbmRvdy5jbG9zZSgpO1xyXG4gICAgICAgICAgY29uc3QgYWxsUGFyYW1zID0geyAuLi5xcywgLi4uaGFzaCB9O1xyXG4gICAgICAgICAgaWYgKGFsbFBhcmFtcy5lcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBhbGxQYXJhbXMuZXJyb3I7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoYWxsUGFyYW1zKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5KCk7XHJcbiAgICAgIH0pLFxyXG4gICAgICB0YWtlKDEpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwcmVwYXJlT3B0aW9ucyhvcHRpb25zPzogSVBvcHVwT3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNTAwO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgNTAwO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgbGVmdDogd2luZG93LnNjcmVlblggKyAod2luZG93Lm91dGVyV2lkdGggLSB3aWR0aCkgLyAyLFxyXG4gICAgICB0b3A6IHdpbmRvdy5zY3JlZW5ZICsgKHdpbmRvdy5vdXRlckhlaWdodCAtIGhlaWdodCkgLyAyLjUsXHJcbiAgICAgIHRvb2xiYXI6IG9wdGlvbnMudmlzaWJsZVRvb2xiYXIgPyAneWVzJyA6ICdubycsXHJcbiAgICAgIC4uLm9wdGlvbnNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0cmluZ2lmeU9wdGlvbnMob3B0aW9uczogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkIH0pIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAubWFwKGtleSA9PiAob3B0aW9uc1trZXldID09PSBudWxsIHx8IG9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkID8ga2V5IDoga2V5ICsgJz0nICsgb3B0aW9uc1trZXldKSlcclxuICAgICAgLmpvaW4oJywnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VRdWVyeVN0cmluZyhqb2luZWRLZXlWYWx1ZTogc3RyaW5nKTogYW55IHtcclxuICAgIGxldCBrZXk7XHJcbiAgICBsZXQgdmFsdWU7XHJcbiAgICByZXR1cm4gam9pbmVkS2V5VmFsdWUuc3BsaXQoJyYnKS5yZWR1Y2UoXHJcbiAgICAgIChvYmosIGtleVZhbHVlKSA9PiB7XHJcbiAgICAgICAgaWYgKGtleVZhbHVlKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IGtleVZhbHVlLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWVbMF0pO1xyXG4gICAgICAgICAgb2JqW2tleV0gPSB0eXBlb2YgdmFsdWVbMV0gIT09ICd1bmRlZmluZWQnID8gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlWzFdKSA6IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgIH0sXHJcbiAgICAgIHt9IGFzIHsgW2s6IHN0cmluZ106IHN0cmluZyB8IHRydWUgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXNDb3Jkb3ZhQXBwKCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBjb3Jkb3ZhID09PSAnb2JqZWN0JyB8fCAoZG9jdW1lbnQuVVJMLmluZGV4T2YoJ2h0dHA6Ly8nKSA9PT0gLTEgJiYgZG9jdW1lbnQuVVJMLmluZGV4T2YoJ2h0dHBzOi8vJykgPT09IC0xKTtcclxuICB9XHJcbn1cclxuIl19