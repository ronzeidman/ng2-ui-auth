!function(e){function r(e,r,t){e in i||(i[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return c[e]||(c[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,s=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var s=0;s<i.dependencies.length;++s)i.dependencies[s]===o&&i.setters[s](a)}return o.locked=!1,r},r.name);o.setters=s.setters,o.execute=s.execute;for(var l=0,d=r.normalizedDeps.length;d>l;l++){var f,p=r.normalizedDeps[l],v=i[p],m=c[p];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=u(p),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[l]&&o.setters[l](f)}}}function o(e){var r={};if("object"==typeof e||"function"==typeof e)if(l){var t;for(var n in e)(t=Object.getOwnPropertyDescriptor(e,n))&&f(r,n,t)}else{var o=e&&e.hasOwnProperty;for(var n in e)(!o||e.hasOwnProperty(n))&&(r[n]=e[n])}return r["default"]=e,f(r,"__useDefault",{value:!0}),r}function a(r,t){var n=i[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,l=n.normalizedDeps.length;l>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(i[d]?a(d,t):u(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function u(e){if(v[e])return v[e];if("@node/"==e.substr(0,6))return p(e.substr(6));var r=i[e];if(!r)throw"Module "+e+" not present.";return n(i[e]),a(e,[]),i[e]=void 0,r.declarative&&f(r.module.exports,"__esModule",{value:!0}),v[e]=r.declarative?r.module.exports:r.esModule}var i={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},l=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(d){l=!1}var f;!function(){try{Object.defineProperty({},"a",{})&&(f=Object.defineProperty)}catch(e){f=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var c={},p="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,v={"@empty":{}};return function(e,t,n){return function(a){a(function(a){for(var i=0;i<t.length;i++)(function(e,r){r&&r.__esModule?v[e]=r:v[e]=o(r)})(t[i],arguments[i]);n({register:r});var s=u(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)u(e[i]);return s.__useDefault?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1"], ["6","7","f","8","e","10","11","12","13","14"], function($__System) {

$__System.register("2", ["6", "3", "4", "7", "5", "8"], function(exports_1) {
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      shared_1,
      config_1,
      http_1,
      utils_1;
  var Local;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(shared_1_1) {
      shared_1 = shared_1_1;
    }, function(config_1_1) {
      config_1 = config_1_1;
    }, function(http_1_1) {
      http_1 = http_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }, function(_1) {}],
    execute: function() {
      Local = (function() {
        function Local(http, shared, config) {
          this.http = http;
          this.shared = shared;
          this.config = config;
        }
        Local.prototype.login = function(user, opts) {
          var _this = this;
          opts = opts || {};
          var url = opts.url ? opts.url : utils_1.joinUrl(this.config.baseUrl, this.config.loginUrl);
          opts.body = JSON.stringify(user) || opts.body;
          opts.method = opts.method || 'POST';
          return this.http.request(url, opts).map(function(response) {
            _this.shared.setToken(response);
            return response;
          });
        };
        Local.prototype.signup = function(user, opts) {
          opts = opts || {};
          var url = opts.url ? opts.url : utils_1.joinUrl(this.config.baseUrl, this.config.signupUrl);
          opts.body = JSON.stringify(user) || opts.body;
          opts.method = opts.method || 'POST';
          return this.http.request(url, opts);
        };
        Local = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [http_1.Http, shared_1.Shared, config_1.Config])], Local);
        return Local;
      })();
      exports_1("Local", Local);
    }
  };
});

$__System.register("9", ["6", "a", "b", "3", "7", "5", "4", "8"], function(exports_1) {
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      oauth1_1,
      oauth2_1,
      shared_1,
      http_1,
      utils_1,
      config_1;
  var Oauth;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(oauth1_1_1) {
      oauth1_1 = oauth1_1_1;
    }, function(oauth2_1_1) {
      oauth2_1 = oauth2_1_1;
    }, function(shared_1_1) {
      shared_1 = shared_1_1;
    }, function(http_1_1) {
      http_1 = http_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }, function(config_1_1) {
      config_1 = config_1_1;
    }, function(_1) {}],
    execute: function() {
      Oauth = (function() {
        function Oauth(http, injector, shared, config) {
          this.http = http;
          this.injector = injector;
          this.shared = shared;
          this.config = config;
        }
        Oauth.prototype.authenticate = function(name, userData) {
          var _this = this;
          var provider = this.config.providers[name].type === '1.0' ? this.injector.get(oauth1_1.Oauth1) : this.injector.get(oauth2_1.Oauth2);
          return provider.open(this.config.providers[name], userData || {}).map(function(response) {
            if (_this.config.providers[name].url) {
              _this.shared.setToken(response);
            }
            return response;
          });
        };
        Oauth.prototype.unlink = function(provider, opts) {
          opts = opts || {};
          var url = opts.url ? opts.url : utils_1.joinUrl(this.config.baseUrl, this.config.unlinkUrl);
          opts.body = JSON.stringify({provider: provider}) || opts.body;
          opts.method = opts.method || 'POST';
          return this.http.request(url, opts);
        };
        Oauth = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [http_1.Http, core_1.Injector, shared_1.Shared, config_1.Config])], Oauth);
        return Oauth;
      })();
      exports_1("Oauth", Oauth);
    }
  };
});

$__System.register("b", ["6", "7", "5", "4", "c", "d", "e"], function(exports_1) {
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      http_1,
      utils_1,
      config_1,
      popup_1,
      storage_1;
  var Oauth2;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(http_1_1) {
      http_1 = http_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }, function(config_1_1) {
      config_1 = config_1_1;
    }, function(popup_1_1) {
      popup_1 = popup_1_1;
    }, function(storage_1_1) {
      storage_1 = storage_1_1;
    }, function(_1) {}],
    execute: function() {
      Oauth2 = (function() {
        function Oauth2(http, popup, storage, config) {
          this.http = http;
          this.popup = popup;
          this.storage = storage;
          this.config = config;
        }
        Oauth2.prototype.open = function(options, userData) {
          var _this = this;
          this.defaults = utils_1.merge(options, Oauth2.base);
          var url;
          var openPopup;
          var stateName = this.defaults.name + '_state';
          var state = this.defaults.state;
          if (typeof state === 'string') {
            this.storage.set(stateName, state);
          } else if (typeof state === 'function') {
            this.storage.set(stateName, state());
          }
          url = [this.defaults.authorizationEndpoint, this.buildQueryString()].join('?');
          if (this.config.cordova) {
            openPopup = this.popup.open(url, this.defaults.name, this.defaults.popupOptions).eventListener(this.defaults.redirectUri);
          } else {
            openPopup = this.popup.open(url, this.defaults.name, this.defaults.popupOptions).pollPopup();
          }
          return openPopup.mergeMap(function(oauthData) {
            if (_this.defaults.responseType === 'token' || !_this.defaults.url) {
              return oauthData;
            }
            if (oauthData.state && oauthData.state !== _this.storage.get(stateName)) {
              throw 'OAuth "state" mismatch';
            }
            return _this.exchangeForToken(oauthData, userData);
          });
        };
        Oauth2.prototype.exchangeForToken = function(oauthData, userData) {
          var _this = this;
          var data = utils_1.extend({}, userData);
          Object.keys(this.defaults.responseParams).forEach(function(key) {
            switch (key) {
              case 'code':
                data[_this.defaults.responseParams[key]] = oauthData.code;
                break;
              case 'clientId':
                data[_this.defaults.responseParams[key]] = _this.defaults.clientId;
                break;
              case 'redirectUri':
                data[_this.defaults.responseParams[key]] = _this.defaults.redirectUri;
                break;
              default:
                data[_this.defaults.responseParams[key]] = oauthData[key];
            }
          });
          if (oauthData.state) {
            data.state = oauthData.state;
          }
          var exchangeForTokenUrl = this.config.baseUrl ? utils_1.joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
          return this.http.post(exchangeForTokenUrl, JSON.stringify(data));
        };
        Oauth2.prototype.buildQueryString = function() {
          var _this = this;
          var keyValuePairs = [];
          var urlParams = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];
          urlParams.forEach(function(params) {
            if (_this.defaults[params]) {
              _this.defaults[params].forEach(function(paramName) {
                var camelizedName = utils_1.camelCase(paramName);
                var paramValue = typeof _this.defaults[paramName] === 'function' ? _this.defaults[paramName]() : _this.defaults[camelizedName];
                if (paramName === 'state') {
                  var stateName = _this.defaults.name + '_state';
                  paramValue = encodeURIComponent(_this.storage.get(stateName));
                }
                if (paramName === 'scope' && Array.isArray(paramValue)) {
                  paramValue = paramValue.join(_this.defaults.scopeDelimiter);
                  if (_this.defaults.scopePrefix) {
                    paramValue = [_this.defaults.scopePrefix, paramValue].join(_this.defaults.scopeDelimiter);
                  }
                }
                keyValuePairs.push([paramName, paramValue]);
              });
            }
          });
          return keyValuePairs.map(function(pair) {
            return pair.join('=');
          }).join('&');
        };
        Oauth2.base = {
          defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
          responseType: 'code',
          responseParams: {
            code: 'code',
            clientId: 'clientId',
            redirectUri: 'redirectUri'
          }
        };
        Oauth2 = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [http_1.Http, popup_1.Popup, storage_1.Storage, config_1.Config])], Oauth2);
        return Oauth2;
      })();
      exports_1("Oauth2", Oauth2);
    }
  };
});

$__System.register("c", ["6", "f", "5", "4", "10", "11", "12", "13", "14"], function(exports_1) {
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      Observable_1,
      utils_1,
      config_1;
  var Popup;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(Observable_1_1) {
      Observable_1 = Observable_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }, function(config_1_1) {
      config_1 = config_1_1;
    }, function(_1) {}, function(_2) {}, function(_3) {}, function(_4) {}, function(_5) {}],
    execute: function() {
      Popup = (function() {
        function Popup(config) {
          this.config = config;
          this.url = '';
          this.popupWindow = null;
        }
        Popup.prepareOptions = function(options) {
          options = options || {};
          var width = options.width || 500;
          var height = options.height || 500;
          return utils_1.extend({
            width: width,
            height: height,
            left: window.screenX + ((window.outerWidth - width) / 2),
            top: window.screenY + ((window.outerHeight - height) / 2.5)
          }, options);
        };
        Popup.stringifyOptions = function(options) {
          return Object.keys(options).map(function(key) {
            return key + '=' + options[key];
          }).join(',');
        };
        Popup.parseQueryString = function(joinedKeyValue) {
          var key,
              value;
          return joinedKeyValue.split('&').reduce(function(obj, keyValue) {
            if (keyValue) {
              value = keyValue.split('=');
              key = decodeURIComponent(value[0]);
              obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
            }
            return obj;
          }, {});
        };
        Popup.prototype.open = function(url, name, options) {
          this.url = url;
          var stringifiedOptions = Popup.stringifyOptions(Popup.prepareOptions(options));
          var UA = window.navigator.userAgent;
          var windowName = (this.config.cordova || UA.indexOf('CriOS') > -1) ? '_blank' : name;
          this.popupWindow = window.open(url, windowName, stringifiedOptions);
          window['popup'] = this.popupWindow;
          if (this.popupWindow && this.popupWindow.focus) {
            this.popupWindow.focus();
          }
          return this;
        };
        Popup.prototype.eventListener = function(redirectUri) {
          var _this = this;
          return Observable_1.Observable.fromEvent(this.popupWindow, 'loadstart').concatMap(function(event) {
            if (!_this.popupWindow || _this.popupWindow.closed) {
              return ['Popup Window Closed'];
            }
            if (event.url.indexOf(redirectUri) !== 0) {
              return [];
            }
            var parser = document.createElement('a');
            parser.href = event.url;
            if (parser.search || parser.hash) {
              var queryParams = parser.search.substring(1).replace(/\/$/, '');
              var hashParams = parser.hash.substring(1).replace(/\/$/, '');
              var hash = Popup.parseQueryString(hashParams);
              var qs = Popup.parseQueryString(queryParams);
              utils_1.extend(qs, hash);
              _this.popupWindow.close();
              if (qs.error) {
                throw qs.error;
              } else {
                return [qs];
              }
            }
            return [];
          }).take(1).takeWhile(function(response) {
            return response !== 'Popup Window Closed';
          });
        };
        Popup.prototype.pollPopup = function() {
          var _this = this;
          return Observable_1.Observable.interval(50).concatMap(function() {
            if (!_this.popupWindow || _this.popupWindow.closed) {
              return ['Popup Window Closed'];
            }
            var documentOrigin = document.location.host;
            var popupWindowOrigin = '';
            try {
              popupWindowOrigin = _this.popupWindow.location.host;
            } catch (error) {}
            if (popupWindowOrigin === documentOrigin && (_this.popupWindow.location.search || _this.popupWindow.location.hash)) {
              var queryParams = _this.popupWindow.location.search.substring(1).replace(/\/$/, '');
              var hashParams = _this.popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
              var hash = Popup.parseQueryString(hashParams);
              var qs = Popup.parseQueryString(queryParams);
              _this.popupWindow.close();
              utils_1.extend(qs, hash);
              if (qs.error) {
                throw qs.error;
              } else {
                return [qs];
              }
            }
            return [];
          }).take(1).takeWhile(function(response) {
            return response !== 'Popup Window Closed';
          });
        };
        Popup = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [config_1.Config])], Popup);
        return Popup;
      })();
      exports_1("Popup", Popup);
    }
  };
});

$__System.register("5", [], function(exports_1) {
  function extend(dst, src) {
    Object.keys(src).forEach(function(key) {
      dst[key] = dst[key];
    });
    return dst;
  }
  exports_1("extend", extend);
  function joinUrl(baseUrl, url) {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
      return url;
    }
    var joined = [baseUrl, url].join('/');
    var normalize = function(str) {
      return str.replace(/[\/]+/g, '/').replace(/\/\?/g, '?').replace(/\/\#/g, '#').replace(/\:\//g, '://');
    };
    return normalize(joined);
  }
  exports_1("joinUrl", joinUrl);
  function merge(obj1, obj2) {
    var result = {};
    for (var i in obj1) {
      if (obj1.hasOwnProperty(i)) {
        if ((i in obj2) && (typeof obj1[i] === 'object') && (i !== null)) {
          result[i] = merge(obj1[i], obj2[i]);
        } else {
          result[i] = obj1[i];
        }
      }
    }
    for (i in obj2) {
      if (obj2.hasOwnProperty(i)) {
        if (i in result) {
          continue;
        }
        result[i] = obj2[i];
      }
    }
    return result;
  }
  exports_1("merge", merge);
  function camelCase(name) {
    return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    });
  }
  exports_1("camelCase", camelCase);
  return {
    setters: [],
    execute: function() {}
  };
});

$__System.register("a", ["6", "c", "7", "5", "4", "e"], function(exports_1) {
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      popup_1,
      http_1,
      utils_1,
      config_1;
  var Oauth1;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(popup_1_1) {
      popup_1 = popup_1_1;
    }, function(http_1_1) {
      http_1 = http_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }, function(config_1_1) {
      config_1 = config_1_1;
    }, function(_1) {}],
    execute: function() {
      Oauth1 = (function() {
        function Oauth1(http, popup, config) {
          this.http = http;
          this.popup = popup;
          this.config = config;
        }
        Oauth1.prototype.open = function(options, userData) {
          var _this = this;
          this.defaults = utils_1.extend(options, Oauth1.base);
          var popupWindow;
          var serverUrl = this.config.baseUrl ? utils_1.joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
          if (!this.config.cordova) {
            popupWindow = this.popup.open('', this.defaults.name, this.defaults.popupOptions);
          }
          return this.http.post(serverUrl, JSON.stringify(this.defaults)).mergeMap(function(response) {
            if (_this.config.cordova) {
              popupWindow = _this.popup.open([_this.defaults.authorizationEndpoint, _this.buildQueryString(response.json())].join('?'), _this.defaults.name, _this.defaults.popupOptions);
            } else {
              popupWindow.popupWindow.location = [_this.defaults.authorizationEndpoint, _this.buildQueryString(response.json())].join('?');
            }
            return _this.config.cordova ? popupWindow.eventListener(_this.defaults.redirectUri) : popupWindow.pollPopup();
          }).mergeMap(function(response) {
            return _this.exchangeForToken(response, userData);
          });
        };
        Oauth1.prototype.exchangeForToken = function(oauthData, userData) {
          var data = utils_1.extend({}, userData);
          utils_1.extend(data, oauthData);
          var exchangeForTokenUrl = this.config.baseUrl ? utils_1.joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
          return this.http.post(exchangeForTokenUrl, data);
        };
        Oauth1.prototype.buildQueryString = function(obj) {
          return Object.keys(obj).map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
          }).join('&');
        };
        Oauth1.base = {
          url: null,
          name: null,
          popupOptions: null,
          redirectUri: null,
          authorizationEndpoint: null
        };
        Oauth1 = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [http_1.Http, popup_1.Popup, config_1.Config])], Oauth1);
        return Oauth1;
      })();
      exports_1("Oauth1", Oauth1);
    }
  };
});

$__System.register("15", ["6", "7", "3", "2", "9", "c", "b", "a", "d", "4"], function(exports_1) {
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      http_1,
      shared_1,
      local_1,
      oauth_1,
      popup_1,
      oauth2_1,
      oauth1_1,
      storage_1,
      config_1;
  var Auth;
  function NG2_UI_AUTH_PROVIDERS(config) {
    return [core_1.provide(config_1.Config, {useFactory: function() {
        return new config_1.Config(config);
      }}), core_1.provide(storage_1.Storage, {
      useFactory: function(providedConfig) {
        return new storage_1.Storage(providedConfig);
      },
      deps: [config_1.Config]
    }), core_1.provide(shared_1.Shared, {
      useFactory: function(storage, providedConfig) {
        return new shared_1.Shared(storage, providedConfig);
      },
      deps: [storage_1.Storage, config_1.Config]
    }), core_1.provide(oauth_1.Oauth, {
      useFactory: function(http, injector, shared, providedConfig) {
        return new oauth_1.Oauth(http, injector, shared, providedConfig);
      },
      deps: [http_1.Http, core_1.Injector, shared_1.Shared, config_1.Config]
    }), core_1.provide(popup_1.Popup, {
      useFactory: function(providedConfig) {
        return new popup_1.Popup(providedConfig);
      },
      deps: [config_1.Config]
    }), core_1.provide(oauth1_1.Oauth1, {
      useFactory: function(http, popup, providedConfig) {
        return new oauth1_1.Oauth1(http, popup, providedConfig);
      },
      deps: [http_1.Http, popup_1.Popup, config_1.Config]
    }), core_1.provide(oauth2_1.Oauth2, {
      useFactory: function(http, popup, storage, providedConfig) {
        return new oauth2_1.Oauth2(http, popup, storage, providedConfig);
      },
      deps: [http_1.Http, popup_1.Popup, storage_1.Storage, config_1.Config]
    }), core_1.provide(local_1.Local, {
      useFactory: function(http, shared, providedConfig) {
        return new local_1.Local(http, shared, providedConfig);
      },
      deps: [http_1.Http, shared_1.Shared, config_1.Config]
    }), core_1.provide(Auth, {
      useFactory: function(shared, local, oauth) {
        return new Auth(shared, local, oauth);
      },
      deps: [shared_1.Shared, local_1.Local, oauth_1.Oauth]
    })];
  }
  exports_1("NG2_UI_AUTH_PROVIDERS", NG2_UI_AUTH_PROVIDERS);
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(http_1_1) {
      http_1 = http_1_1;
    }, function(shared_1_1) {
      shared_1 = shared_1_1;
    }, function(local_1_1) {
      local_1 = local_1_1;
    }, function(oauth_1_1) {
      oauth_1 = oauth_1_1;
    }, function(popup_1_1) {
      popup_1 = popup_1_1;
    }, function(oauth2_1_1) {
      oauth2_1 = oauth2_1_1;
    }, function(oauth1_1_1) {
      oauth1_1 = oauth1_1_1;
    }, function(storage_1_1) {
      storage_1 = storage_1_1;
    }, function(config_1_1) {
      config_1 = config_1_1;
    }],
    execute: function() {
      Auth = (function() {
        function Auth(shared, local, oauth) {
          this.shared = shared;
          this.local = local;
          this.oauth = oauth;
        }
        Auth.prototype.login = function(user, opts) {
          return this.local.login(user, opts);
        };
        Auth.prototype.signup = function(user, opts) {
          return this.local.signup(user, opts);
        };
        Auth.prototype.logout = function() {
          return this.shared.logout();
        };
        Auth.prototype.authenticate = function(name, userData) {
          return this.oauth.authenticate(name, userData);
        };
        Auth.prototype.link = function(name, userData) {
          return this.oauth.authenticate(name, userData);
        };
        Auth.prototype.unlink = function(provider, opts) {
          return this.oauth.unlink(provider, opts);
        };
        Auth.prototype.isAuthenticated = function() {
          return this.shared.isAuthenticated();
        };
        Auth.prototype.getToken = function() {
          return this.shared.getToken();
        };
        Auth.prototype.setToken = function(token) {
          this.shared.setToken(token);
        };
        Auth.prototype.removeToken = function() {
          this.shared.removeToken();
        };
        Auth.prototype.getPayload = function() {
          return this.shared.getPayload();
        };
        Auth.prototype.setStorageType = function(type) {
          this.shared.setStorageType(type);
        };
        Auth.prototype.getExpirationDate = function() {
          return this.shared.getExpirationDate();
        };
        Auth = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [shared_1.Shared, local_1.Local, oauth_1.Oauth])], Auth);
        return Auth;
      })();
      exports_1("Auth", Auth);
    }
  };
});

$__System.register("4", ["6"], function(exports_1) {
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1;
  var Config;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }],
    execute: function() {
      Config = (function() {
        function Config(config) {
          var _this = this;
          this.tokenRoot = null;
          this.cordova = false;
          this.baseUrl = '/';
          this.loginUrl = '/auth/login';
          this.signupUrl = '/auth/signup';
          this.unlinkUrl = '/auth/unlink/';
          this.tokenName = 'token';
          this.tokenSeparator = '_';
          this.tokenPrefix = 'ng2-ui-auth';
          this.authHeader = 'Authorization';
          this.authToken = 'Bearer';
          this.storageType = 'localStorage';
          this.defaultHeaders = null;
          this.providers = {
            facebook: {
              name: 'facebook',
              url: '/auth/facebook',
              authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
              redirectUri: window.location.origin + '/',
              requiredUrlParams: ['display', 'scope'],
              scope: ['email'],
              scopeDelimiter: ',',
              display: 'popup',
              type: '2.0',
              popupOptions: {
                width: 580,
                height: 400
              }
            },
            google: {
              name: 'google',
              url: '/auth/google',
              authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
              redirectUri: window.location.origin,
              requiredUrlParams: ['scope'],
              optionalUrlParams: ['display'],
              scope: ['profile', 'email'],
              scopePrefix: 'openid',
              scopeDelimiter: ' ',
              display: 'popup',
              type: '2.0',
              popupOptions: {
                width: 452,
                height: 633
              }
            },
            github: {
              name: 'github',
              url: '/auth/github',
              authorizationEndpoint: 'https://github.com/login/oauth/authorize',
              redirectUri: window.location.origin,
              optionalUrlParams: ['scope'],
              scope: ['user:email'],
              scopeDelimiter: ' ',
              type: '2.0',
              popupOptions: {
                width: 1020,
                height: 618
              }
            },
            instagram: {
              name: 'instagram',
              url: '/auth/instagram',
              authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
              redirectUri: window.location.origin,
              requiredUrlParams: ['scope'],
              scope: ['basic'],
              scopeDelimiter: '+',
              type: '2.0'
            },
            linkedin: {
              name: 'linkedin',
              url: '/auth/linkedin',
              authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
              redirectUri: window.location.origin,
              requiredUrlParams: ['state'],
              scope: ['r_emailaddress'],
              scopeDelimiter: ' ',
              state: 'STATE',
              type: '2.0',
              popupOptions: {
                width: 527,
                height: 582
              }
            },
            twitter: {
              name: 'twitter',
              url: '/auth/twitter',
              authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
              redirectUri: window.location.origin,
              type: '1.0',
              popupOptions: {
                width: 495,
                height: 645
              }
            },
            twitch: {
              name: 'twitch',
              url: '/auth/twitch',
              authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
              redirectUri: window.location.origin,
              requiredUrlParams: ['scope'],
              scope: ['user_read'],
              scopeDelimiter: ' ',
              display: 'popup',
              type: '2.0',
              popupOptions: {
                width: 500,
                height: 560
              }
            },
            live: {
              name: 'live',
              url: '/auth/live',
              authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
              redirectUri: window.location.origin,
              requiredUrlParams: ['display', 'scope'],
              scope: ['wl.emails'],
              scopeDelimiter: ' ',
              display: 'popup',
              type: '2.0',
              popupOptions: {
                width: 500,
                height: 560
              }
            },
            yahoo: {
              name: 'yahoo',
              url: '/auth/yahoo',
              authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
              redirectUri: window.location.origin,
              scope: [],
              scopeDelimiter: ',',
              type: '2.0',
              popupOptions: {
                width: 559,
                height: 519
              }
            },
            bitbucket: {
              name: 'bitbucket',
              url: '/auth/bitbucket',
              authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
              redirectUri: window.location.origin + '/',
              requiredUrlParams: ['scope'],
              scope: ['email'],
              scopeDelimiter: ',',
              type: '2.0',
              popupOptions: {
                width: 1028,
                height: 529
              }
            }
          };
          Object.keys(config).forEach(function(key) {
            if (key !== 'providers') {
              _this[key] = config[key];
            } else {
              Object.keys(config[key]).forEach(function(provider) {
                if (typeof _this.providers[provider] === 'undefined') {
                  _this.providers[provider] = config.providers[provider];
                } else {
                  Object.keys(config.providers[provider]).forEach(function(prop) {
                    _this.providers[provider][prop] = config.providers[provider][prop];
                  });
                }
              });
            }
          });
        }
        Config = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [Object])], Config);
        return Config;
      })();
      exports_1("Config", Config);
    }
  };
});

$__System.register("d", ["6", "4"], function(exports_1) {
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      config_1;
  var Storage;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(config_1_1) {
      config_1 = config_1_1;
    }],
    execute: function() {
      Storage = (function() {
        function Storage(config) {
          var _this = this;
          this.config = config;
          this.store = {};
          this.isStorageAvailable = (function() {
            try {
              var supported = config.storageType in window && window[config.storageType] !== null;
              if (supported) {
                var key = Math.random().toString(36).substring(7);
                window[_this.config.storageType].setItem(key, '');
                window[_this.config.storageType].removeItem(key);
              }
              return supported;
            } catch (e) {
              return false;
            }
          })();
          if (!this.isStorageAvailable) {
            console.warn(config.storageType + ' is not available.');
          }
        }
        Storage.prototype.get = function(key) {
          return this.isStorageAvailable ? window[this.config.storageType].getItem(key) : this.store[key];
        };
        Storage.prototype.set = function(key, value) {
          return this.isStorageAvailable ? window[this.config.storageType].setItem(key, value) : this.store[key] = value;
        };
        Storage.prototype.remove = function(key) {
          return this.isStorageAvailable ? window[this.config.storageType].removeItem(key) : delete this.store[key];
        };
        Storage = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [config_1.Config])], Storage);
        return Storage;
      })();
      exports_1("Storage", Storage);
    }
  };
});

$__System.register("3", ["f", "6", "4", "d"], function(exports_1) {
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var Observable_1,
      core_1,
      config_1,
      storage_1;
  var Shared;
  return {
    setters: [function(Observable_1_1) {
      Observable_1 = Observable_1_1;
    }, function(core_1_1) {
      core_1 = core_1_1;
    }, function(config_1_1) {
      config_1 = config_1_1;
    }, function(storage_1_1) {
      storage_1 = storage_1_1;
    }],
    execute: function() {
      Shared = (function() {
        function Shared(storage, config) {
          this.storage = storage;
          this.config = config;
          this.tokenName = this.config.tokenPrefix ? [this.config.tokenPrefix, this.config.tokenName].join(this.config.tokenSeparator) : this.config.tokenName;
        }
        Shared.prototype.getToken = function() {
          return this.storage.get(this.tokenName);
        };
        Shared.prototype.getPayload = function() {
          var token = this.getToken();
          if (token && token.split('.').length === 3) {
            try {
              var base64Url = token.split('.')[1];
              var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              return JSON.parse(decodeURIComponent(encodeURIComponent(window.atob(base64))));
            } catch (e) {
              return undefined;
            }
          }
        };
        Shared.prototype.setToken = function(response) {
          if (!response) {
            console.warn('Can\'t set token without passing a value');
            return;
          }
          var token;
          if (typeof response === 'string') {
            token = response;
          } else {
            var accessToken = response && response.json() && (response.json().access_token || response.json().token);
            var tokenObject;
            if (accessToken) {
              if (typeof accessToken === 'object' && typeof accessToken.data === 'object') {
                tokenObject = accessToken;
              } else if (typeof accessToken === 'string') {
                token = accessToken;
              }
            }
            if (!token && tokenObject) {
              var tokenRootData = this.config.tokenRoot && this.config.tokenRoot.split('.').reduce(function(o, x) {
                return o[x];
              }, tokenObject.data);
              token = tokenRootData ? tokenRootData[this.config.tokenName] : tokenObject.data[this.config.tokenName];
            }
            if (!token) {
              var tokenPath = this.config.tokenRoot ? this.config.tokenRoot + '.' + this.config.tokenName : this.config.tokenName;
              console.warn('Expecting a token named "' + tokenPath);
              return;
            }
          }
          this.storage.set(this.tokenName, token);
        };
        Shared.prototype.removeToken = function() {
          this.storage.remove(this.tokenName);
        };
        Shared.prototype.isAuthenticated = function() {
          var token = this.getToken();
          if (token) {
            if (token.split('.').length === 3) {
              try {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var exp = JSON.parse(window.atob(base64)).exp;
                if (exp) {
                  var isExpired = Math.round(new Date().getTime() / 1000) >= exp;
                  if (isExpired) {
                    this.storage.remove(this.tokenName);
                    return false;
                  } else {
                    return true;
                  }
                }
              } catch (e) {
                return true;
              }
            }
            return true;
          }
          return false;
        };
        Shared.prototype.getExpirationDate = function() {
          var payload = this.getPayload();
          if (payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
            var date = new Date(0);
            date.setUTCSeconds(payload.exp);
            return date;
          }
          return null;
        };
        Shared.prototype.logout = function() {
          this.storage.remove(this.tokenName);
          return Observable_1.Observable.create(function(observer) {
            observer.next();
            observer.complete();
          });
        };
        Shared.prototype.setStorageType = function(type) {
          this.config.storageType = type;
        };
        Shared = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [storage_1.Storage, config_1.Config])], Shared);
        return Shared;
      })();
      exports_1("Shared", Shared);
    }
  };
});

$__System.register("16", ["6", "7", "4", "3"], function(exports_1) {
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      http_1,
      config_1,
      shared_1;
  var JwtHttp,
      JWT_HTTP_PROVIDER;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(http_1_1) {
      http_1 = http_1_1;
    }, function(config_1_1) {
      config_1 = config_1_1;
    }, function(shared_1_1) {
      shared_1 = shared_1_1;
    }],
    execute: function() {
      JwtHttp = (function(_super) {
        __extends(JwtHttp, _super);
        function JwtHttp(_backend, _defaultOptions, _shared, _config) {
          _super.call(this, _backend, _defaultOptions);
          this._shared = _shared;
          this._config = _config;
        }
        JwtHttp.prototype.request = function(url, options) {
          if (this._shared.isAuthenticated()) {
            if (url instanceof http_1.Request) {
              url.headers = url.headers || new http_1.Headers();
              this.setHeaders(url);
            } else {
              options = options || {};
              this.setHeaders(options);
            }
          }
          return _super.prototype.request.call(this, url, options);
        };
        JwtHttp.prototype.get = function(url, options) {
          options = options || {};
          options.method = http_1.RequestMethod.Get;
          return this.request(url, options);
        };
        JwtHttp.prototype.post = function(url, body, options) {
          options = options || {};
          options.method = http_1.RequestMethod.Post;
          options.body = body;
          return this.request(url, options);
        };
        JwtHttp.prototype.put = function(url, body, options) {
          options = options || {};
          options.method = http_1.RequestMethod.Put;
          options.body = body;
          return this.request(url, options);
        };
        JwtHttp.prototype.delete = function(url, options) {
          options = options || {};
          options.method = http_1.RequestMethod.Delete;
          return this.request(url, options);
        };
        JwtHttp.prototype.patch = function(url, body, options) {
          options = options || {};
          options.method = http_1.RequestMethod.Patch;
          options.body = body;
          return this.request(url, options);
        };
        JwtHttp.prototype.head = function(url, options) {
          options = options || {};
          options.method = http_1.RequestMethod.Head;
          return this.request(url, options);
        };
        JwtHttp.prototype.setHeaders = function(obj) {
          var _this = this;
          obj.headers = obj.headers || new http_1.Headers();
          if (this._config.defaultHeaders) {
            Object.keys(this._config.defaultHeaders).forEach(function(defaultHeader) {
              if (!obj.headers.has(defaultHeader)) {
                obj.headers.set(defaultHeader, _this._config.defaultHeaders[defaultHeader]);
              }
            });
          }
          obj.headers.set(this._config.authHeader, this._config.authToken + ' ' + this._shared.getToken());
        };
        JwtHttp = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, shared_1.Shared, config_1.Config])], JwtHttp);
        return JwtHttp;
      })(http_1.Http);
      exports_1("JwtHttp", JwtHttp);
      exports_1("JWT_HTTP_PROVIDER", JWT_HTTP_PROVIDER = core_1.provide(JwtHttp, {
        useFactory: function(xhrBackend, requestOptions, shared, config, router) {
          return new JwtHttp(xhrBackend, requestOptions, shared, config);
        },
        deps: [http_1.XHRBackend, http_1.RequestOptions, shared_1.Shared, config_1.Config]
      }));
    }
  };
});

$__System.register("1", ["15", "4", "3", "16"], function(exports_1) {
  return {
    setters: [function(auth_1_1) {
      exports_1({
        "Auth": auth_1_1["Auth"],
        "NG2_UI_AUTH_PROVIDERS": auth_1_1["NG2_UI_AUTH_PROVIDERS"]
      });
    }, function(config_1_1) {
      exports_1({"Config": config_1_1["Config"]});
    }, function(shared_1_1) {
      exports_1({"Shared": shared_1_1["Shared"]});
    }, function(jwtHttp_1_1) {
      exports_1({
        "JwtHttp": jwtHttp_1_1["JwtHttp"],
        "JWT_HTTP_PROVIDER": jwtHttp_1_1["JWT_HTTP_PROVIDER"]
      });
    }],
    execute: function() {}
  };
});

})
(function(factory) {
  module.exports = factory(require("angular2/core"), require("angular2/http"), require("rxjs/Observable"), require("rxjs/add/operator/map"), require("rxjs/add/operator/mergeMap"), require("rxjs/add/observable/interval"), require("rxjs/add/observable/fromEvent"), require("rxjs/add/operator/concatMap"), require("rxjs/add/operator/take"), require("rxjs/add/operator/takeWhile"));
});
//# sourceMappingURL=ng2-ui-auth.js.map