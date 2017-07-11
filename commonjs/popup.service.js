import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {assign} from './utils';
import {ConfigService} from './config.service';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/delay';

var PopupService = (function () {
    function PopupService(config) {
        this.config = config;
        this.url = '';
        this.popupWindow = null;
    }
    PopupService.prototype.open = function (url, name, options) {
        this.url = url;
        var stringifiedOptions = this.stringifyOptions(this.prepareOptions(options));
        var UA = window.navigator.userAgent;
        var windowName = (this.config.cordova || UA.indexOf('CriOS') > -1) ? '_blank' : name;
        this.popupWindow = window.open(url, windowName, stringifiedOptions);
        window['popup'] = this.popupWindow;
        if (this.popupWindow && this.popupWindow.focus) {
            this.popupWindow.focus();
        }
        return this;
    };
    PopupService.prototype.eventListener = function (redirectUri) {
        var _this = this;
        return Observable
            .merge(Observable.fromEvent(this.popupWindow, 'loadstart')
            .switchMap(function (event) {
            if (!_this.popupWindow || _this.popupWindow.closed) {
                return Observable.throw(new Error('Authentication Canceled'));
            }
            if (event.url.indexOf(redirectUri) !== 0) {
                return Observable.empty();
            }
            var parser = document.createElement('a');
            parser.href = event.url;
            if (parser.search || parser.hash) {
                var queryParams = parser.search.substring(1).replace(/\/$/, '');
                var hashParams = parser.hash.substring(1).replace(/\/$/, '');
                var hash = _this.parseQueryString(hashParams);
                var qs = _this.parseQueryString(queryParams);
                var allParams = assign({}, qs, hash);
                _this.popupWindow.close();
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return Observable.of(allParams);
                }
            }
            return Observable.empty();
        }), Observable.fromEvent(this.popupWindow, 'exit').delay(100).map(function () { throw new Error('Authentication Canceled'); })).take(1);
    };
    PopupService.prototype.pollPopup = function () {
        var _this = this;
        return Observable
            .interval(50)
            .switchMap(function () {
            if (!_this.popupWindow || _this.popupWindow.closed) {
                return Observable.throw(new Error('Authentication Canceled'));
            }
            var documentOrigin = document.location.host;
            var popupWindowOrigin = '';
            try {
                popupWindowOrigin = _this.popupWindow.location.host;
            }
            catch (error) {
            }
            if (popupWindowOrigin === documentOrigin && (_this.popupWindow.location.search || _this.popupWindow.location.hash)) {
                var queryParams = _this.popupWindow.location.search.substring(1).replace(/\/$/, '');
                var hashParams = _this.popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                var hash = _this.parseQueryString(hashParams);
                var qs = _this.parseQueryString(queryParams);
                _this.popupWindow.close();
                var allParams = assign({}, qs, hash);
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return Observable.of(allParams);
                }
            }
            return Observable.empty();
        })
            .take(1);
    };
    PopupService.prototype.prepareOptions = function (options) {
        options = options || {};
        var width = options.width || 500;
        var height = options.height || 500;
        return assign({
            width: width,
            height: height,
            left: window.screenX + ((window.outerWidth - width) / 2),
            top: window.screenY + ((window.outerHeight - height) / 2.5),
            toolbar: options.visibleToolbar ? 'yes' : 'no'
        }, options);
    };
    PopupService.prototype.stringifyOptions = function (options) {
        return Object.keys(options).map(function (key) {
            return key + '=' + options[key];
        }).join(',');
    };
    PopupService.prototype.parseQueryString = function (joinedKeyValue) {
        var key, value;
        return joinedKeyValue.split('&').reduce(function (obj, keyValue) {
            if (keyValue) {
                value = keyValue.split('=');
                key = decodeURIComponent(value[0]);
                obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
            }
            return obj;
        }, {});
    };
    PopupService.decorators = [
        { type: Injectable },
    ];
    PopupService.ctorParameters = function () { return [
        { type: ConfigService, },
    ]; };
    return PopupService;
}());
export { PopupService };
//# sourceMappingURL=popup.service.js.map