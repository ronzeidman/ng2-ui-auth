System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function extend(dst, src) {
        Object.keys(src)
            .forEach(function (key) {
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
        var normalize = function (str) {
            return str
                .replace(/[\/]+/g, '/')
                .replace(/\/\?/g, '?')
                .replace(/\/\#/g, '#')
                .replace(/\:\//g, '://');
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
                }
                else {
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
        return name.replace(/([\:\-\_]+(.))/g, function (_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        });
    }
    exports_1("camelCase", camelCase);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=utils.js.map