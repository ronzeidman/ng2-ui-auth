/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { empty, fromEvent, interval, merge, Observable, of, throwError } from 'rxjs';
import { delay, map, switchMap, take } from 'rxjs/operators';
import { getWindowOrigin } from './utils';
var PopupService = /** @class */ (function () {
    function PopupService() {
    }
    /**
     * @param {?} url
     * @param {?} options
     * @param {?=} cordova
     * @return {?}
     */
    PopupService.prototype.open = /**
     * @param {?} url
     * @param {?} options
     * @param {?=} cordova
     * @return {?}
     */
    function (url, options, cordova) {
        if (cordova === void 0) { cordova = this.isCordovaApp(); }
        /** @type {?} */
        var stringifiedOptions = this.stringifyOptions(this.prepareOptions(options.popupOptions));
        /** @type {?} */
        var windowName = cordova ? '_blank' : options.name;
        /** @type {?} */
        var popupWindow = typeof window !== 'undefined' ? window.open(url, windowName, stringifiedOptions) : null;
        if (popupWindow) {
            if (popupWindow.focus) {
                popupWindow.focus();
            }
            return of(popupWindow);
        }
        return empty();
    };
    /**
     * @param {?} popupWindow
     * @param {?=} cordova
     * @param {?=} redirectUri
     * @return {?}
     */
    PopupService.prototype.waitForClose = /**
     * @param {?} popupWindow
     * @param {?=} cordova
     * @param {?=} redirectUri
     * @return {?}
     */
    function (popupWindow, cordova, redirectUri) {
        if (cordova === void 0) { cordova = this.isCordovaApp(); }
        if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
        return cordova ? this.eventListener(popupWindow, redirectUri) : this.pollPopup(popupWindow, redirectUri);
    };
    /**
     * @private
     * @param {?} popupWindow
     * @param {?=} redirectUri
     * @return {?}
     */
    PopupService.prototype.eventListener = /**
     * @private
     * @param {?} popupWindow
     * @param {?=} redirectUri
     * @return {?}
     */
    function (popupWindow, redirectUri) {
        var _this = this;
        if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
        if (!popupWindow) {
            throw new Error('Popup was not created');
        }
        return merge(fromEvent(popupWindow, 'exit').pipe(delay(100), map((/**
         * @return {?}
         */
        function () {
            throw new Error('Authentication Canceled');
        }))), fromEvent(popupWindow, 'loadstart')).pipe(switchMap((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (!popupWindow || popupWindow.closed) {
                return Observable.throw(new Error('Authentication Canceled'));
            }
            if (event.url.indexOf(redirectUri) !== 0) {
                return empty();
            }
            /** @type {?} */
            var parser = document.createElement('a');
            parser.href = event.url;
            if (parser.search || parser.hash) {
                /** @type {?} */
                var queryParams = parser.search.substring(1).replace(/\/$/, '');
                /** @type {?} */
                var hashParams = parser.hash.substring(1).replace(/\/$/, '');
                /** @type {?} */
                var hash = _this.parseQueryString(hashParams);
                /** @type {?} */
                var qs = _this.parseQueryString(queryParams);
                /** @type {?} */
                var allParams = tslib_1.__assign({}, qs, hash);
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
    };
    /**
     * @private
     * @param {?} popupWindow
     * @param {?=} redirectUri
     * @return {?}
     */
    PopupService.prototype.pollPopup = /**
     * @private
     * @param {?} popupWindow
     * @param {?=} redirectUri
     * @return {?}
     */
    function (popupWindow, redirectUri) {
        var _this = this;
        if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
        return interval(50).pipe(switchMap((/**
         * @return {?}
         */
        function () {
            if (!popupWindow || popupWindow.closed) {
                return throwError(new Error('Authentication Canceled'));
            }
            /** @type {?} */
            var popupWindowOrigin = getWindowOrigin(popupWindow);
            if (popupWindowOrigin &&
                (redirectUri.indexOf(popupWindowOrigin) === 0 || popupWindowOrigin.indexOf(redirectUri) === 0) &&
                (popupWindow.location.search || popupWindow.location.hash)) {
                /** @type {?} */
                var queryParams = popupWindow.location.search.substring(1).replace(/\/$/, '');
                /** @type {?} */
                var hashParams = popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                /** @type {?} */
                var hash = _this.parseQueryString(hashParams);
                /** @type {?} */
                var qs = _this.parseQueryString(queryParams);
                popupWindow.close();
                /** @type {?} */
                var allParams = tslib_1.__assign({}, qs, hash);
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return of(allParams);
                }
            }
            return empty();
        })), take(1));
    };
    /**
     * @private
     * @param {?=} options
     * @return {?}
     */
    PopupService.prototype.prepareOptions = /**
     * @private
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        options = options || {};
        /** @type {?} */
        var width = options.width || 500;
        /** @type {?} */
        var height = options.height || 500;
        return tslib_1.__assign({ width: width,
            height: height, left: window.screenX + (window.outerWidth - width) / 2, top: window.screenY + (window.outerHeight - height) / 2.5, toolbar: options.visibleToolbar ? 'yes' : 'no' }, options);
    };
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    PopupService.prototype.stringifyOptions = /**
     * @private
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return Object.keys(options)
            .map((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return (options[key] === null || options[key] === undefined ? key : key + '=' + options[key]); }))
            .join(',');
    };
    /**
     * @private
     * @param {?} joinedKeyValue
     * @return {?}
     */
    PopupService.prototype.parseQueryString = /**
     * @private
     * @param {?} joinedKeyValue
     * @return {?}
     */
    function (joinedKeyValue) {
        /** @type {?} */
        var key;
        /** @type {?} */
        var value;
        return joinedKeyValue.split('&').reduce((/**
         * @param {?} obj
         * @param {?} keyValue
         * @return {?}
         */
        function (obj, keyValue) {
            if (keyValue) {
                value = keyValue.split('=');
                key = decodeURIComponent(value[0]);
                obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
            }
            return obj;
        }), (/** @type {?} */ ({})));
    };
    /**
     * @private
     * @return {?}
     */
    PopupService.prototype.isCordovaApp = /**
     * @private
     * @return {?}
     */
    function () {
        return typeof cordova === 'object' || (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
    };
    PopupService.decorators = [
        { type: Injectable }
    ];
    return PopupService;
}());
export { PopupService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsibGliL3BvcHVwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckYsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFHMUM7SUFBQTtJQXlJQSxDQUFDOzs7Ozs7O0lBdklRLDJCQUFJOzs7Ozs7SUFBWCxVQUFZLEdBQVcsRUFBRSxPQUF3QyxFQUFFLE9BQTZCO1FBQTdCLHdCQUFBLEVBQUEsVUFBVSxJQUFJLENBQUMsWUFBWSxFQUFFOztZQUN4RixrQkFBa0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O1lBQ3JGLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUk7O1lBRTlDLFdBQVcsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBRTNHLElBQUksV0FBVyxFQUFFO1lBQ2YsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO2dCQUNyQixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDckI7WUFDRCxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN4QjtRQUNELE9BQU8sS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7Ozs7OztJQUVNLG1DQUFZOzs7Ozs7SUFBbkIsVUFBb0IsV0FBbUIsRUFBRSxPQUE2QixFQUFFLFdBQStCO1FBQTlELHdCQUFBLEVBQUEsVUFBVSxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQUUsNEJBQUEsRUFBQSxjQUFjLGVBQWUsRUFBRTtRQUNyRyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzNHLENBQUM7Ozs7Ozs7SUFFTyxvQ0FBYTs7Ozs7O0lBQXJCLFVBQXNCLFdBQW1CLEVBQUUsV0FBK0I7UUFBMUUsaUJBMkNDO1FBM0MwQyw0QkFBQSxFQUFBLGNBQWMsZUFBZSxFQUFFO1FBQ3hFLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxLQUFLLENBQ1YsU0FBUyxDQUFRLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQ3hDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFDVixHQUFHOzs7UUFBQztZQUNGLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUM3QyxDQUFDLEVBQUMsQ0FDSCxFQUNELFNBQVMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQ3BDLENBQUMsSUFBSSxDQUNKLFNBQVM7Ozs7UUFBQyxVQUFDLEtBQThCO1lBQ3ZDLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtnQkFDdEMsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQzthQUMvRDtZQUNELElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN4QyxPQUFPLEtBQUssRUFBRSxDQUFDO2FBQ2hCOztnQkFFSyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7WUFDMUMsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBRXhCLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFOztvQkFDMUIsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOztvQkFDM0QsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOztvQkFDeEQsSUFBSSxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7O29CQUN4QyxFQUFFLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQzs7b0JBQ3ZDLFNBQVMsd0JBQVEsRUFBRSxFQUFLLElBQUksQ0FBRTtnQkFFcEMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUVwQixJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7b0JBQ25CLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztpQkFDdkI7cUJBQU07b0JBQ0wsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3RCO2FBQ0Y7WUFDRCxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUMsRUFBQyxFQUNGLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUixDQUFDO0lBQ0osQ0FBQzs7Ozs7OztJQUVPLGdDQUFTOzs7Ozs7SUFBakIsVUFBa0IsV0FBbUIsRUFBRSxXQUErQjtRQUF0RSxpQkE4QkM7UUE5QnNDLDRCQUFBLEVBQUEsY0FBYyxlQUFlLEVBQUU7UUFDcEUsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUN0QixTQUFTOzs7UUFBQztZQUNSLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtnQkFDdEMsT0FBTyxVQUFVLENBQUMsSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO2FBQ3pEOztnQkFFSyxpQkFBaUIsR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDO1lBRXRELElBQ0UsaUJBQWlCO2dCQUNqQixDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUYsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUMxRDs7b0JBQ00sV0FBVyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQzs7b0JBQ3pFLFVBQVUsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7O29CQUN4RSxJQUFJLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQzs7b0JBQ3hDLEVBQUUsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUM3QyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7O29CQUNkLFNBQVMsd0JBQVEsRUFBRSxFQUFLLElBQUksQ0FBRTtnQkFDcEMsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFO29CQUNuQixNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7aUJBQ3ZCO3FCQUFNO29CQUNMLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUN0QjthQUNGO1lBQ0QsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDLEVBQUMsRUFDRixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1IsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVPLHFDQUFjOzs7OztJQUF0QixVQUF1QixPQUF1QjtRQUM1QyxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQzs7WUFDbEIsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksR0FBRzs7WUFDNUIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksR0FBRztRQUNwQywwQkFDRSxLQUFLLE9BQUE7WUFDTCxNQUFNLFFBQUEsRUFDTixJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUN0RCxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUN6RCxPQUFPLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQzNDLE9BQU8sRUFDVjtJQUNKLENBQUM7Ozs7OztJQUVPLHVDQUFnQjs7Ozs7SUFBeEIsVUFBeUIsT0FBMEU7UUFDakcsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUN4QixHQUFHOzs7O1FBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUF0RixDQUFzRixFQUFDO2FBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7Ozs7OztJQUVPLHVDQUFnQjs7Ozs7SUFBeEIsVUFBeUIsY0FBc0I7O1lBQ3pDLEdBQUc7O1lBQ0gsS0FBSztRQUNULE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNOzs7OztRQUNyQyxVQUFDLEdBQUcsRUFBRSxRQUFRO1lBQ1osSUFBSSxRQUFRLEVBQUU7Z0JBQ1osS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzthQUNsRjtZQUNELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxHQUNELG1CQUFBLEVBQUUsRUFBa0MsQ0FDckMsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRU8sbUNBQVk7Ozs7SUFBcEI7UUFDRSxPQUFPLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUgsQ0FBQzs7Z0JBeElGLFVBQVU7O0lBeUlYLG1CQUFDO0NBQUEsQUF6SUQsSUF5SUM7U0F4SVksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZW1wdHksIGZyb21FdmVudCwgaW50ZXJ2YWwsIG1lcmdlLCBPYnNlcnZhYmxlLCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWxheSwgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IElPYXV0aDFPcHRpb25zLCBJT2F1dGgyT3B0aW9ucywgSVBvcHVwT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBnZXRXaW5kb3dPcmlnaW4gfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmRlY2xhcmUgY29uc3QgY29yZG92YTogYW55O1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQb3B1cFNlcnZpY2Uge1xyXG4gIHB1YmxpYyBvcGVuKHVybDogc3RyaW5nLCBvcHRpb25zOiBJT2F1dGgyT3B0aW9ucyB8IElPYXV0aDFPcHRpb25zLCBjb3Jkb3ZhID0gdGhpcy5pc0NvcmRvdmFBcHAoKSkge1xyXG4gICAgY29uc3Qgc3RyaW5naWZpZWRPcHRpb25zID0gdGhpcy5zdHJpbmdpZnlPcHRpb25zKHRoaXMucHJlcGFyZU9wdGlvbnMob3B0aW9ucy5wb3B1cE9wdGlvbnMpKTtcclxuICAgIGNvbnN0IHdpbmRvd05hbWUgPSBjb3Jkb3ZhID8gJ19ibGFuaycgOiBvcHRpb25zLm5hbWU7XHJcblxyXG4gICAgY29uc3QgcG9wdXBXaW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5vcGVuKHVybCwgd2luZG93TmFtZSwgc3RyaW5naWZpZWRPcHRpb25zKSA6IG51bGw7XHJcblxyXG4gICAgaWYgKHBvcHVwV2luZG93KSB7XHJcbiAgICAgIGlmIChwb3B1cFdpbmRvdy5mb2N1cykge1xyXG4gICAgICAgIHBvcHVwV2luZG93LmZvY3VzKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG9mKHBvcHVwV2luZG93KTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbXB0eSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHdhaXRGb3JDbG9zZShwb3B1cFdpbmRvdzogV2luZG93LCBjb3Jkb3ZhID0gdGhpcy5pc0NvcmRvdmFBcHAoKSwgcmVkaXJlY3RVcmkgPSBnZXRXaW5kb3dPcmlnaW4oKSkge1xyXG4gICAgcmV0dXJuIGNvcmRvdmEgPyB0aGlzLmV2ZW50TGlzdGVuZXIocG9wdXBXaW5kb3csIHJlZGlyZWN0VXJpKSA6IHRoaXMucG9sbFBvcHVwKHBvcHVwV2luZG93LCByZWRpcmVjdFVyaSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV2ZW50TGlzdGVuZXIocG9wdXBXaW5kb3c6IFdpbmRvdywgcmVkaXJlY3RVcmkgPSBnZXRXaW5kb3dPcmlnaW4oKSkge1xyXG4gICAgaWYgKCFwb3B1cFdpbmRvdykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BvcHVwIHdhcyBub3QgY3JlYXRlZCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lcmdlKFxyXG4gICAgICBmcm9tRXZlbnQ8RXZlbnQ+KHBvcHVwV2luZG93LCAnZXhpdCcpLnBpcGUoXHJcbiAgICAgICAgZGVsYXkoMTAwKSxcclxuICAgICAgICBtYXAoKCkgPT4ge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICksXHJcbiAgICAgIGZyb21FdmVudChwb3B1cFdpbmRvdywgJ2xvYWRzdGFydCcpXHJcbiAgICApLnBpcGUoXHJcbiAgICAgIHN3aXRjaE1hcCgoZXZlbnQ6IEV2ZW50ICYgeyB1cmw6IHN0cmluZyB9KSA9PiB7XHJcbiAgICAgICAgaWYgKCFwb3B1cFdpbmRvdyB8fCBwb3B1cFdpbmRvdy5jbG9zZWQpIHtcclxuICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudC51cmwuaW5kZXhPZihyZWRpcmVjdFVyaSkgIT09IDApIHtcclxuICAgICAgICAgIHJldHVybiBlbXB0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgIHBhcnNlci5ocmVmID0gZXZlbnQudXJsO1xyXG5cclxuICAgICAgICBpZiAocGFyc2VyLnNlYXJjaCB8fCBwYXJzZXIuaGFzaCkge1xyXG4gICAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBwYXJzZXIuc2VhcmNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgY29uc3QgaGFzaFBhcmFtcyA9IHBhcnNlci5oYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhoYXNoUGFyYW1zKTtcclxuICAgICAgICAgIGNvbnN0IHFzID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5UGFyYW1zKTtcclxuICAgICAgICAgIGNvbnN0IGFsbFBhcmFtcyA9IHsgLi4ucXMsIC4uLmhhc2ggfTtcclxuXHJcbiAgICAgICAgICBwb3B1cFdpbmRvdy5jbG9zZSgpO1xyXG5cclxuICAgICAgICAgIGlmIChhbGxQYXJhbXMuZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgYWxsUGFyYW1zLmVycm9yO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGFsbFBhcmFtcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbXB0eSgpO1xyXG4gICAgICB9KSxcclxuICAgICAgdGFrZSgxKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcG9sbFBvcHVwKHBvcHVwV2luZG93OiBXaW5kb3csIHJlZGlyZWN0VXJpID0gZ2V0V2luZG93T3JpZ2luKCkpIHtcclxuICAgIHJldHVybiBpbnRlcnZhbCg1MCkucGlwZShcclxuICAgICAgc3dpdGNoTWFwKCgpID0+IHtcclxuICAgICAgICBpZiAoIXBvcHVwV2luZG93IHx8IHBvcHVwV2luZG93LmNsb3NlZCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBvcHVwV2luZG93T3JpZ2luID0gZ2V0V2luZG93T3JpZ2luKHBvcHVwV2luZG93KTtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgcG9wdXBXaW5kb3dPcmlnaW4gJiZcclxuICAgICAgICAgIChyZWRpcmVjdFVyaS5pbmRleE9mKHBvcHVwV2luZG93T3JpZ2luKSA9PT0gMCB8fCBwb3B1cFdpbmRvd09yaWdpbi5pbmRleE9mKHJlZGlyZWN0VXJpKSA9PT0gMCkgJiZcclxuICAgICAgICAgIChwb3B1cFdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggfHwgcG9wdXBXaW5kb3cubG9jYXRpb24uaGFzaClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gcG9wdXBXaW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgY29uc3QgaGFzaFBhcmFtcyA9IHBvcHVwV2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1tcXC8kXS8sICcnKTtcclxuICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaGFzaFBhcmFtcyk7XHJcbiAgICAgICAgICBjb25zdCBxcyA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgICBwb3B1cFdpbmRvdy5jbG9zZSgpO1xyXG4gICAgICAgICAgY29uc3QgYWxsUGFyYW1zID0geyAuLi5xcywgLi4uaGFzaCB9O1xyXG4gICAgICAgICAgaWYgKGFsbFBhcmFtcy5lcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBhbGxQYXJhbXMuZXJyb3I7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoYWxsUGFyYW1zKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5KCk7XHJcbiAgICAgIH0pLFxyXG4gICAgICB0YWtlKDEpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwcmVwYXJlT3B0aW9ucyhvcHRpb25zPzogSVBvcHVwT3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNTAwO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgNTAwO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgbGVmdDogd2luZG93LnNjcmVlblggKyAod2luZG93Lm91dGVyV2lkdGggLSB3aWR0aCkgLyAyLFxyXG4gICAgICB0b3A6IHdpbmRvdy5zY3JlZW5ZICsgKHdpbmRvdy5vdXRlckhlaWdodCAtIGhlaWdodCkgLyAyLjUsXHJcbiAgICAgIHRvb2xiYXI6IG9wdGlvbnMudmlzaWJsZVRvb2xiYXIgPyAneWVzJyA6ICdubycsXHJcbiAgICAgIC4uLm9wdGlvbnNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0cmluZ2lmeU9wdGlvbnMob3B0aW9uczogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkIH0pIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAubWFwKGtleSA9PiAob3B0aW9uc1trZXldID09PSBudWxsIHx8IG9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkID8ga2V5IDoga2V5ICsgJz0nICsgb3B0aW9uc1trZXldKSlcclxuICAgICAgLmpvaW4oJywnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VRdWVyeVN0cmluZyhqb2luZWRLZXlWYWx1ZTogc3RyaW5nKTogYW55IHtcclxuICAgIGxldCBrZXk7XHJcbiAgICBsZXQgdmFsdWU7XHJcbiAgICByZXR1cm4gam9pbmVkS2V5VmFsdWUuc3BsaXQoJyYnKS5yZWR1Y2UoXHJcbiAgICAgIChvYmosIGtleVZhbHVlKSA9PiB7XHJcbiAgICAgICAgaWYgKGtleVZhbHVlKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IGtleVZhbHVlLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWVbMF0pO1xyXG4gICAgICAgICAgb2JqW2tleV0gPSB0eXBlb2YgdmFsdWVbMV0gIT09ICd1bmRlZmluZWQnID8gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlWzFdKSA6IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgIH0sXHJcbiAgICAgIHt9IGFzIHsgW2s6IHN0cmluZ106IHN0cmluZyB8IHRydWUgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXNDb3Jkb3ZhQXBwKCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBjb3Jkb3ZhID09PSAnb2JqZWN0JyB8fCAoZG9jdW1lbnQuVVJMLmluZGV4T2YoJ2h0dHA6Ly8nKSA9PT0gLTEgJiYgZG9jdW1lbnQuVVJMLmluZGV4T2YoJ2h0dHBzOi8vJykgPT09IC0xKTtcclxuICB9XHJcbn1cclxuIl19