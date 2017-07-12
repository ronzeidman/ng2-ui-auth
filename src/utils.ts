/**
 * Created by Ron on 17/12/2015.
 */

export function assign(target: any, ...src: any[]): any {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (let index = 1; index < arguments.length; index++) {
        let source = arguments[index];
        if (source != null) {
            for (let key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
}

export function joinUrl(baseUrl: string, url: string) {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
        return url;
    }

    let joined = [baseUrl, url].join('/');

    let normalize = function(str) {
        return str
            .replace(/[\/]+/g, '/')
            .replace(/\/\?/g, '?')
            .replace(/\/\#/g, '#')
            .replace(/\:\//g, '://');
    };

    return normalize(joined);
}

export function merge(obj1: object, obj2: object): any {
    let result = {};
    for (let i in obj1) {
        if (obj1.hasOwnProperty(i)) {
            if ((i in obj2) && (typeof obj1[i] === 'object') && (i !== null)) {
                result[i] = merge(obj1[i], obj2[i]);
            } else {
                result[i] = obj1[i];
            }
        }
    }
    for (let i in obj2) {
        if (obj2.hasOwnProperty(i)) {
            if (i in result) {
                continue;
            }
            result[i] = obj2[i];
        }

    }
    return result;
}

export function camelCase(name) {
    return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    });
}
