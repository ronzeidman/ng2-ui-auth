/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { defaultProviders } from './config-providers';
import { StorageType } from './storage-type.enum';
/** @type {?} */
export const CONFIG_OPTIONS = new InjectionToken('config.options');
export class ConfigService {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = {
            withCredentials: false,
            tokenRoot: null,
            baseUrl: '/',
            loginUrl: '/auth/login',
            signupUrl: '/auth/signup',
            unlinkUrl: '/auth/unlink/',
            tokenName: 'token',
            tokenSeparator: '_',
            tokenPrefix: 'ng2-ui-auth',
            authHeader: 'Authorization',
            authToken: 'Bearer',
            storageType: StorageType.LOCAL_STORAGE,
            cordova: undefined,
            resolveToken: (/**
             * @param {?} response
             * @param {?} config
             * @return {?}
             */
            (response, config) => {
                /** @type {?} */
                const accessToken = response && (response.access_token || response.token || response.data);
                if (!accessToken) {
                    // console.warn('No token found');
                    return null;
                }
                if (typeof accessToken === 'string') {
                    return accessToken;
                }
                if (typeof accessToken !== 'object') {
                    // console.warn('No token found');
                    return null;
                }
                /** @type {?} */
                const tokenRootData = config.tokenRoot &&
                    config.tokenRoot.split('.').reduce((/**
                     * @param {?} o
                     * @param {?} x
                     * @return {?}
                     */
                    (o, x) => {
                        return o[x];
                    }), accessToken);
                /** @type {?} */
                const token = tokenRootData ? tokenRootData[config.tokenName] : accessToken[config.tokenName];
                if (token) {
                    return token;
                }
                // const tokenPath = this.tokenRoot ? this.tokenRoot + '.' + this.tokenName : this.tokenName;
                // console.warn('Expecting a token named "' + tokenPath);
                return null;
            }),
            providers: {}
        };
        this.options = Object.assign({}, this.options, options);
        this.mergeWithDefaultProviders();
    }
    /**
     * @param {?} providers
     * @return {?}
     */
    updateProviders(providers) {
        this.options.providers = Object.assign({}, (this.options.providers || {}), providers);
        this.mergeWithDefaultProviders();
    }
    /**
     * @return {?}
     */
    mergeWithDefaultProviders() {
        Object.keys(this.options.providers).forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            if (key in defaultProviders) {
                this.options.providers[key] = Object.assign({}, defaultProviders[key], this.options.providers[key]);
            }
        }));
    }
}
ConfigService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [CONFIG_OPTIONS,] }] }
];
if (false) {
    /** @type {?} */
    ConfigService.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFFbEQsTUFBTSxPQUFPLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBTSxnQkFBZ0IsQ0FBQztBQUV2RSxNQUFNLE9BQU8sYUFBYTs7OztJQTZDeEIsWUFBb0MsT0FBOEI7UUE1QzNELFlBQU8sR0FBRztZQUNmLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLEdBQUc7WUFDWixRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUUsY0FBYztZQUN6QixTQUFTLEVBQUUsZUFBZTtZQUMxQixTQUFTLEVBQUUsT0FBTztZQUNsQixjQUFjLEVBQUUsR0FBRztZQUNuQixXQUFXLEVBQUUsYUFBYTtZQUMxQixVQUFVLEVBQUUsZUFBZTtZQUMzQixTQUFTLEVBQUUsUUFBUTtZQUNuQixXQUFXLEVBQUUsV0FBVyxDQUFDLGFBQWE7WUFDdEMsT0FBTyxFQUFFLFNBQVM7WUFDbEIsWUFBWTs7Ozs7WUFBRSxDQUFDLFFBQWEsRUFBRSxNQUFzQixFQUFFLEVBQUU7O3NCQUNoRCxXQUFXLEdBQ2YsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hFLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ2hCLGtDQUFrQztvQkFDbEMsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBQ0QsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7b0JBQ25DLE9BQU8sV0FBVyxDQUFDO2lCQUNwQjtnQkFDRCxJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTtvQkFDbkMsa0NBQWtDO29CQUNsQyxPQUFPLElBQUksQ0FBQztpQkFDYjs7c0JBQ0ssYUFBYSxHQUNqQixNQUFNLENBQUMsU0FBUztvQkFDaEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTTs7Ozs7b0JBQUMsQ0FBQyxDQUFNLEVBQUUsQ0FBTSxFQUFFLEVBQUU7d0JBQ3BELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNkLENBQUMsR0FBRSxXQUFXLENBQUM7O3NCQUNYLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUM3RixJQUFJLEtBQUssRUFBRTtvQkFDVCxPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCw2RkFBNkY7Z0JBQzdGLHlEQUF5RDtnQkFDekQsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQUE7WUFDRCxTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFHQSxJQUFJLENBQUMsT0FBTyxxQkFDUCxJQUFJLENBQUMsT0FBTyxFQUNaLE9BQU8sQ0FDWCxDQUFDO1FBQ0YsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsU0FBcUI7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLHFCQUNqQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxFQUM5QixTQUFTLENBQ2IsQ0FBQztRQUNGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7Ozs7SUFFRCx5QkFBeUI7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUNoRCxJQUFJLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUN0QixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQy9CLENBQUM7YUFDSDtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBdkVGLFVBQVU7Ozs7NENBOENJLE1BQU0sU0FBQyxjQUFjOzs7O0lBNUNsQyxnQ0EwQ0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElDb25maWdPcHRpb25zLCBJUGFydGlhbENvbmZpZ09wdGlvbnMsIElQcm92aWRlcnMgfSBmcm9tICcuL2NvbmZpZy1pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgZGVmYXVsdFByb3ZpZGVycyB9IGZyb20gJy4vY29uZmlnLXByb3ZpZGVycyc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XHJcblxyXG5leHBvcnQgY29uc3QgQ09ORklHX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignY29uZmlnLm9wdGlvbnMnKTtcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29uZmlnU2VydmljZSB7XHJcbiAgcHVibGljIG9wdGlvbnMgPSB7XHJcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxyXG4gICAgdG9rZW5Sb290OiBudWxsLFxyXG4gICAgYmFzZVVybDogJy8nLFxyXG4gICAgbG9naW5Vcmw6ICcvYXV0aC9sb2dpbicsXHJcbiAgICBzaWdudXBVcmw6ICcvYXV0aC9zaWdudXAnLFxyXG4gICAgdW5saW5rVXJsOiAnL2F1dGgvdW5saW5rLycsXHJcbiAgICB0b2tlbk5hbWU6ICd0b2tlbicsXHJcbiAgICB0b2tlblNlcGFyYXRvcjogJ18nLFxyXG4gICAgdG9rZW5QcmVmaXg6ICduZzItdWktYXV0aCcsXHJcbiAgICBhdXRoSGVhZGVyOiAnQXV0aG9yaXphdGlvbicsXHJcbiAgICBhdXRoVG9rZW46ICdCZWFyZXInLFxyXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLkxPQ0FMX1NUT1JBR0UsXHJcbiAgICBjb3Jkb3ZhOiB1bmRlZmluZWQsXHJcbiAgICByZXNvbHZlVG9rZW46IChyZXNwb25zZTogYW55LCBjb25maWc6IElDb25maWdPcHRpb25zKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuOiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCB8IHVuZGVmaW5lZCA9XHJcbiAgICAgICAgcmVzcG9uc2UgJiYgKHJlc3BvbnNlLmFjY2Vzc190b2tlbiB8fCByZXNwb25zZS50b2tlbiB8fCByZXNwb25zZS5kYXRhKTtcclxuICAgICAgaWYgKCFhY2Nlc3NUb2tlbikge1xyXG4gICAgICAgIC8vIGNvbnNvbGUud2FybignTm8gdG9rZW4gZm91bmQnKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiBhY2Nlc3NUb2tlbjtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIC8vIGNvbnNvbGUud2FybignTm8gdG9rZW4gZm91bmQnKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB0b2tlblJvb3REYXRhID1cclxuICAgICAgICBjb25maWcudG9rZW5Sb290ICYmXHJcbiAgICAgICAgY29uZmlnLnRva2VuUm9vdC5zcGxpdCgnLicpLnJlZHVjZSgobzogYW55LCB4OiBhbnkpID0+IHtcclxuICAgICAgICAgIHJldHVybiBvW3hdO1xyXG4gICAgICAgIH0sIGFjY2Vzc1Rva2VuKTtcclxuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlblJvb3REYXRhID8gdG9rZW5Sb290RGF0YVtjb25maWcudG9rZW5OYW1lXSA6IGFjY2Vzc1Rva2VuW2NvbmZpZy50b2tlbk5hbWVdO1xyXG4gICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgIH1cclxuICAgICAgLy8gY29uc3QgdG9rZW5QYXRoID0gdGhpcy50b2tlblJvb3QgPyB0aGlzLnRva2VuUm9vdCArICcuJyArIHRoaXMudG9rZW5OYW1lIDogdGhpcy50b2tlbk5hbWU7XHJcbiAgICAgIC8vIGNvbnNvbGUud2FybignRXhwZWN0aW5nIGEgdG9rZW4gbmFtZWQgXCInICsgdG9rZW5QYXRoKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgcHJvdmlkZXJzOiB7fVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQ09ORklHX09QVElPTlMpIG9wdGlvbnM6IElQYXJ0aWFsQ29uZmlnT3B0aW9ucykge1xyXG4gICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgIC4uLm9wdGlvbnNcclxuICAgIH07XHJcbiAgICB0aGlzLm1lcmdlV2l0aERlZmF1bHRQcm92aWRlcnMoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVByb3ZpZGVycyhwcm92aWRlcnM6IElQcm92aWRlcnMpIHtcclxuICAgIHRoaXMub3B0aW9ucy5wcm92aWRlcnMgPSB7XHJcbiAgICAgIC4uLih0aGlzLm9wdGlvbnMucHJvdmlkZXJzIHx8IHt9KSxcclxuICAgICAgLi4ucHJvdmlkZXJzXHJcbiAgICB9O1xyXG4gICAgdGhpcy5tZXJnZVdpdGhEZWZhdWx0UHJvdmlkZXJzKCk7XHJcbiAgfVxyXG5cclxuICBtZXJnZVdpdGhEZWZhdWx0UHJvdmlkZXJzKCkge1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5vcHRpb25zLnByb3ZpZGVycykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBpZiAoa2V5IGluIGRlZmF1bHRQcm92aWRlcnMpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMucHJvdmlkZXJzW2tleV0gPSB7XHJcbiAgICAgICAgICAuLi5kZWZhdWx0UHJvdmlkZXJzW2tleV0sXHJcbiAgICAgICAgICAuLi50aGlzLm9wdGlvbnMucHJvdmlkZXJzW2tleV1cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19