"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var utils_1 = require('./utils');
var config_service_1 = require('./config.service');
require('rxjs/add/observable/interval');
require('rxjs/add/observable/fromEvent');
require('rxjs/add/observable/throw');
require('rxjs/add/observable/empty');
require('rxjs/add/observable/merge');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/take');
require('rxjs/add/operator/takeWhile');
var PopupService = (function () {
    function PopupService(config) {
        this.config = config;
        this.url = '';
        this.popupWindow = null;
    }
    PopupService.prepareOptions = function (options) {
        options = options || {};
        var width = options.width || 500;
        var height = options.height || 500;
        return utils_1.assign({
            width: width,
            height: height,
            left: window.screenX + ((window.outerWidth - width) / 2),
            top: window.screenY + ((window.outerHeight - height) / 2.5)
        }, options);
    };
    PopupService.stringifyOptions = function (options) {
        return Object.keys(options).map(function (key) {
            return key + '=' + options[key];
        }).join(',');
    };
    PopupService.parseQueryString = function (joinedKeyValue) {
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
    PopupService.prototype.open = function (url, name, options) {
        this.url = url;
        var stringifiedOptions = PopupService.stringifyOptions(PopupService.prepareOptions(options));
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
        return Observable_1.Observable
            .merge(Observable_1.Observable.fromEvent(this.popupWindow, 'loadstop')
            .switchMap(function () {
            return Observable_1.Observable.throw(new Error('Authentication Canceled'));
        }), Observable_1.Observable.fromEvent(this.popupWindow, 'loadstart')
            .switchMap(function (event) {
            if (!_this.popupWindow || _this.popupWindow.closed) {
                return Observable_1.Observable.throw(new Error('Authentication Canceled'));
            }
            if (event.url.indexOf(redirectUri) !== 0) {
                return Observable_1.Observable.empty();
            }
            var parser = document.createElement('a');
            parser.href = event.url;
            if (parser.search || parser.hash) {
                var queryParams = parser.search.substring(1).replace(/\/$/, '');
                var hashParams = parser.hash.substring(1).replace(/\/$/, '');
                var hash = PopupService.parseQueryString(hashParams);
                var qs = PopupService.parseQueryString(queryParams);
                var allParams = utils_1.assign({}, qs, hash);
                _this.popupWindow.close();
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return Observable_1.Observable.of(allParams);
                }
            }
            return Observable_1.Observable.empty();
        })
            .take(1));
    };
    PopupService.prototype.pollPopup = function () {
        var _this = this;
        return Observable_1.Observable
            .interval(50)
            .switchMap(function () {
            if (!_this.popupWindow || _this.popupWindow.closed) {
                return Observable_1.Observable.throw(new Error('Authentication Canceled'));
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
                var hash = PopupService.parseQueryString(hashParams);
                var qs = PopupService.parseQueryString(queryParams);
                _this.popupWindow.close();
                var allParams = utils_1.assign({}, qs, hash);
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return Observable_1.Observable.of(allParams);
                }
            }
            return Observable_1.Observable.empty();
        })
            .take(1);
    };
    PopupService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [config_service_1.ConfigService])
    ], PopupService);
    return PopupService;
}());
exports.PopupService = PopupService;
//# sourceMappingURL=popup.service.js.map