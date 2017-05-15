"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var config_service_1 = require('./config.service');
var StorageService = (function () {
    function StorageService() {
    }
    return StorageService;
}());
exports.StorageService = StorageService;
var BrowserStorageService = (function (_super) {
    __extends(BrowserStorageService, _super);
    function BrowserStorageService(config) {
        _super.call(this);
        this.config = config;
        this.store = {};
        this.isStorageAvailable = this.checkIsStorageAvailable(config);
        if (!this.isStorageAvailable) {
            console.warn(config.storageType + ' is not available.');
        }
    }
    BrowserStorageService.prototype.get = function (key) {
        return this.isStorageAvailable ? window[this.config.storageType].getItem(key) : this.store[key];
    };
    BrowserStorageService.prototype.set = function (key, value) {
        this.isStorageAvailable ? window[this.config.storageType].setItem(key, value) : this.store[key] = value;
    };
    BrowserStorageService.prototype.remove = function (key) {
        this.isStorageAvailable ? window[this.config.storageType].removeItem(key) : delete this.store[key];
    };
    BrowserStorageService.prototype.checkIsStorageAvailable = function (config) {
        try {
            var supported = config.storageType in window && window[config.storageType] !== null;
            if (supported) {
                var key = Math.random().toString(36).substring(7);
                window[this.config.storageType].setItem(key, '');
                window[this.config.storageType].removeItem(key);
            }
            return supported;
        }
        catch (e) {
            return false;
        }
    };
    BrowserStorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [config_service_1.ConfigService])
    ], BrowserStorageService);
    return BrowserStorageService;
}(StorageService));
exports.BrowserStorageService = BrowserStorageService;
//# sourceMappingURL=storage.service.js.map