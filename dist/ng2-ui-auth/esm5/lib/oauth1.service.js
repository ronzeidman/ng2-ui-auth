/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { PopupService } from './popup.service';
import { buildQueryString, joinUrl } from './utils';
var Oauth1Service = /** @class */ (function () {
    function Oauth1Service(http, popup, config) {
        this.http = http;
        this.popup = popup;
        this.config = config;
    }
    /**
     * @template T
     * @param {?} oauthOptions
     * @param {?} userData
     * @return {?}
     */
    Oauth1Service.prototype.open = /**
     * @template T
     * @param {?} oauthOptions
     * @param {?} userData
     * @return {?}
     */
    function (oauthOptions, userData) {
        var _this = this;
        /** @type {?} */
        var serverUrl = this.config.options.baseUrl ? joinUrl(this.config.options.baseUrl, oauthOptions.url) : oauthOptions.url;
        return this.popup.open('about:blank', oauthOptions, this.config.options.cordova).pipe(switchMap((/**
         * @param {?} popupWindow
         * @return {?}
         */
        function (popupWindow) {
            return _this.http.post(serverUrl, oauthOptions).pipe(tap((/**
             * @param {?} authorizationData
             * @return {?}
             */
            function (authorizationData) {
                return popupWindow
                    ? popupWindow.location.replace([oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'))
                    : undefined;
            })), switchMap((/**
             * @param {?} authorizationData
             * @return {?}
             */
            function (authorizationData) {
                return _this.popup
                    .waitForClose(popupWindow, _this.config.options.cordova, oauthOptions.redirectUri)
                    .pipe(map((/**
                 * @param {?} oauthData
                 * @return {?}
                 */
                function (oauthData) { return ({ authorizationData: authorizationData, oauthData: oauthData }); })));
            })));
        })), switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var authorizationData = _a.authorizationData, oauthData = _a.oauthData;
            return _this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
        })));
    };
    /**
     * @private
     * @template T
     * @param {?} oauthOptions
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    Oauth1Service.prototype.exchangeForToken = /**
     * @private
     * @template T
     * @param {?} oauthOptions
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    function (oauthOptions, authorizationData, oauthData, userData) {
        /** @type {?} */
        var body = { oauthOptions: oauthOptions, authorizationData: authorizationData, oauthData: oauthData, userData: userData };
        var _a = this.config.options, withCredentials = _a.withCredentials, baseUrl = _a.baseUrl;
        var _b = oauthOptions.method, method = _b === void 0 ? 'POST' : _b, url = oauthOptions.url;
        /** @type {?} */
        var exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
        return this.http.request(method, exchangeForTokenUrl, { body: body, withCredentials: withCredentials });
    };
    Oauth1Service.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Oauth1Service.ctorParameters = function () { return [
        { type: HttpClient },
        { type: PopupService },
        { type: ConfigService }
    ]; };
    return Oauth1Service;
}());
export { Oauth1Service };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Oauth1Service.prototype.http;
    /**
     * @type {?}
     * @private
     */
    Oauth1Service.prototype.popup;
    /**
     * @type {?}
     * @private
     */
    Oauth1Service.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgxLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9vYXV0aDEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXBEO0lBRUUsdUJBQW9CLElBQWdCLEVBQVUsS0FBbUIsRUFBVSxNQUFxQjtRQUE1RSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUFVLFdBQU0sR0FBTixNQUFNLENBQWU7SUFBRyxDQUFDOzs7Ozs7O0lBRXBHLDRCQUFJOzs7Ozs7SUFBSixVQUFzQyxZQUE0QixFQUFFLFFBQWdCO1FBQXBGLGlCQW1CQzs7WUFsQk8sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHO1FBQ3pILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ25GLFNBQVM7Ozs7UUFBQyxVQUFBLFdBQVc7WUFDbkIsT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBUyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUNsRCxHQUFHOzs7O1lBQUMsVUFBQSxpQkFBaUI7Z0JBQ25CLE9BQUEsV0FBVztvQkFDVCxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMscUJBQXFCLEVBQUUsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbkgsQ0FBQyxDQUFDLFNBQVM7WUFGYixDQUVhLEVBQ2QsRUFDRCxTQUFTOzs7O1lBQUMsVUFBQSxpQkFBaUI7Z0JBQ3pCLE9BQUEsS0FBSSxDQUFDLEtBQUs7cUJBQ1AsWUFBWSxDQUFDLFdBQVcsRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQztxQkFDaEYsSUFBSSxDQUFDLEdBQUc7Ozs7Z0JBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxDQUFDLEVBQUUsaUJBQWlCLG1CQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsQ0FBQyxFQUFsQyxDQUFrQyxFQUFDLENBQUM7WUFGN0QsQ0FFNkQsRUFDOUQsQ0FDRjtRQVhELENBV0MsRUFDRixFQUNELFNBQVM7Ozs7UUFBQyxVQUFDLEVBQWdDO2dCQUE5Qix3Q0FBaUIsRUFBRSx3QkFBUztZQUFPLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFJLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDO1FBQTlFLENBQThFLEVBQUMsQ0FDaEksQ0FBQztJQUNKLENBQUM7Ozs7Ozs7Ozs7SUFFTyx3Q0FBZ0I7Ozs7Ozs7OztJQUF4QixVQUE0QixZQUE0QixFQUFFLGlCQUF5QixFQUFFLFNBQWlCLEVBQUUsUUFBZ0I7O1lBQ2hILElBQUksR0FBRyxFQUFFLFlBQVksY0FBQSxFQUFFLGlCQUFpQixtQkFBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLFFBQVEsVUFBQSxFQUFFO1FBQy9ELElBQUEsd0JBQWtELEVBQWhELG9DQUFlLEVBQUUsb0JBQStCO1FBQ2hELElBQUEsd0JBQWUsRUFBZixvQ0FBZSxFQUFFLHNCQUFHOztZQUN0QixtQkFBbUIsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7UUFDakUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBSSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxlQUFlLGlCQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7O2dCQS9CRixVQUFVOzs7O2dCQVZGLFVBQVU7Z0JBT1YsWUFBWTtnQkFGWixhQUFhOztJQXFDdEIsb0JBQUM7Q0FBQSxBQWhDRCxJQWdDQztTQS9CWSxhQUFhOzs7Ozs7SUFDWiw2QkFBd0I7Ozs7O0lBQUUsOEJBQTJCOzs7OztJQUFFLCtCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBJT2F1dGgxT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IElPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBidWlsZFF1ZXJ5U3RyaW5nLCBqb2luVXJsIH0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPYXV0aDFTZXJ2aWNlIGltcGxlbWVudHMgSU9hdXRoU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIHBvcHVwOiBQb3B1cFNlcnZpY2UsIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7fVxyXG5cclxuICBvcGVuPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmcgPSBhbnk+KG9hdXRoT3B0aW9uczogSU9hdXRoMU9wdGlvbnMsIHVzZXJEYXRhOiBvYmplY3QpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIGNvbnN0IHNlcnZlclVybCA9IHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCA/IGpvaW5VcmwodGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsLCBvYXV0aE9wdGlvbnMudXJsKSA6IG9hdXRoT3B0aW9ucy51cmw7XHJcbiAgICByZXR1cm4gdGhpcy5wb3B1cC5vcGVuKCdhYm91dDpibGFuaycsIG9hdXRoT3B0aW9ucywgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhKS5waXBlKFxyXG4gICAgICBzd2l0Y2hNYXAocG9wdXBXaW5kb3cgPT5cclxuICAgICAgICB0aGlzLmh0dHAucG9zdDxvYmplY3Q+KHNlcnZlclVybCwgb2F1dGhPcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgdGFwKGF1dGhvcml6YXRpb25EYXRhID0+XHJcbiAgICAgICAgICAgIHBvcHVwV2luZG93XHJcbiAgICAgICAgICAgICAgPyBwb3B1cFdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKFtvYXV0aE9wdGlvbnMuYXV0aG9yaXphdGlvbkVuZHBvaW50LCBidWlsZFF1ZXJ5U3RyaW5nKGF1dGhvcml6YXRpb25EYXRhKV0uam9pbignPycpKVxyXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICAgc3dpdGNoTWFwKGF1dGhvcml6YXRpb25EYXRhID0+XHJcbiAgICAgICAgICAgIHRoaXMucG9wdXBcclxuICAgICAgICAgICAgICAud2FpdEZvckNsb3NlKHBvcHVwV2luZG93LCB0aGlzLmNvbmZpZy5vcHRpb25zLmNvcmRvdmEsIG9hdXRoT3B0aW9ucy5yZWRpcmVjdFVyaSlcclxuICAgICAgICAgICAgICAucGlwZShtYXAob2F1dGhEYXRhID0+ICh7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEgfSkpKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgKSxcclxuICAgICAgc3dpdGNoTWFwKCh7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEgfSkgPT4gdGhpcy5leGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXhjaGFuZ2VGb3JUb2tlbjxUPihvYXV0aE9wdGlvbnM6IElPYXV0aDFPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YTogb2JqZWN0LCBvYXV0aERhdGE6IG9iamVjdCwgdXNlckRhdGE6IG9iamVjdCkge1xyXG4gICAgY29uc3QgYm9keSA9IHsgb2F1dGhPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSB9O1xyXG4gICAgY29uc3QgeyB3aXRoQ3JlZGVudGlhbHMsIGJhc2VVcmwgfSA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XHJcbiAgICBjb25zdCB7IG1ldGhvZCA9ICdQT1NUJywgdXJsIH0gPSBvYXV0aE9wdGlvbnM7XHJcbiAgICBjb25zdCBleGNoYW5nZUZvclRva2VuVXJsID0gYmFzZVVybCA/IGpvaW5VcmwoYmFzZVVybCwgdXJsKSA6IHVybDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIGV4Y2hhbmdlRm9yVG9rZW5VcmwsIHsgYm9keSwgd2l0aENyZWRlbnRpYWxzIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=