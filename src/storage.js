System.register(['angular2/core', './config'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, config_1;
    var Storage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            Storage = (function () {
                function Storage(config) {
                    var _this = this;
                    this.config = config;
                    this.store = {};
                    this.isStorageAvailable = (function () {
                        try {
                            var supported = config.storageType in window && window[config.storageType] !== null;
                            if (supported) {
                                var key = Math.random().toString(36).substring(7);
                                window[_this.config.storageType].setItem(key, '');
                                window[_this.config.storageType].removeItem(key);
                            }
                            return supported;
                        }
                        catch (e) {
                            return false;
                        }
                    })();
                    if (!this.isStorageAvailable) {
                        console.warn(config.storageType + ' is not available.');
                    }
                }
                Storage.prototype.get = function (key) {
                    return this.isStorageAvailable ? window[this.config.storageType].getItem(key) : this.store[key];
                };
                Storage.prototype.set = function (key, value) {
                    return this.isStorageAvailable ? window[this.config.storageType].setItem(key, value) : this.store[key] = value;
                };
                Storage.prototype.remove = function (key) {
                    return this.isStorageAvailable ? window[this.config.storageType].removeItem(key) : delete this.store[key];
                };
                Storage = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [config_1.Config])
                ], Storage);
                return Storage;
            }());
            exports_1("Storage", Storage);
        }
    }
});
//# sourceMappingURL=storage.js.map