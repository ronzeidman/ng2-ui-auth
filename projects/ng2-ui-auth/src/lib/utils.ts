import { HttpHeaders, HttpParams } from '@angular/common/http';

/**
 * Created by Ron on 17/12/2015.
 */

export function joinUrl(baseUrl: string, url: string) {
  if (/^(?:[a-z]+:)?\/\//i.test(url)) {
    return url;
  }

  const joined = [baseUrl, url].join('/');

  return joined
    .replace(/[\/]+/g, '/')
    .replace(/\/\?/g, '?')
    .replace(/\/\#/g, '#')
    .replace(/\:\//g, '://');
}

export function buildQueryString(obj: object) {
  return Object.keys(obj)
    .map(key => (!!obj[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}` : key))
    .join('&');
}

export function getWindowOrigin(w?: Window) {
  if (!w && typeof window !== 'undefined') {
    w = window;
  }
  try {
    if (!w || !w.location) {
      return null;
    }
    if (!w.location.origin) {
      return `${w.location.protocol}//${w.location.hostname}${w.location.port ? ':' + w.location.port : ''}`;
    }
    return w.location.origin;
  } catch (error) {
    return null;
    // ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
    // error instanceof DOMException && error.name === 'SecurityError'
  }
}
