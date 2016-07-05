/**
 * Created by Ron on 17/12/2015.
 */

export function extend<T, S>(dst: T, src: S): T & S {
    Object.keys(src)
        .forEach((key) => {
            dst[key] = src[key];
        });
    return <any>dst;
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

export function merge(obj1, obj2) {
    let result = {};
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

export function camelCase(name) {
    return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    });
}