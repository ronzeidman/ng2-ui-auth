import { Injectable } from '@angular/core';
import { StorageType } from './storage-type.enum';
import { Subscriber, Observable } from 'rxjs';
import { StorageService } from './storage-service';
import { ConfigService } from './config.service';

@Injectable()
export class SharedService {
  public tokenName = this.config.options.tokenPrefix
    ? [this.config.options.tokenPrefix, this.config.options.tokenName].join(this.config.options.tokenSeparator)
    : this.config.options.tokenName;

  constructor(private storage: StorageService, private config: ConfigService) {}

  public getToken() {
    return this.storage.get(this.tokenName);
  }

  public getPayload(token = this.getToken()) {
    if (token && token.split('.').length === 3) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(this.b64DecodeUnicode(base64));
      } catch (e) {
        return undefined;
      }
    }
  }

  public setToken(response: string | object) {
    if (!response) {
      // console.warn('Can\'t set token without passing a value');
      return;
    }

    let token: string;
    if (typeof response === 'string') {
      token = response;
    } else {
      token = this.config.options.resolveToken(response, this.config.options);
    }

    if (token) {
      const expDate = this.getExpirationDate(token);
      this.storage.set(this.tokenName, token, expDate ? expDate.toUTCString() : '');
    }
  }

  public removeToken() {
    this.storage.remove(this.tokenName);
  }

  public isAuthenticated(token = this.getToken()) {
    // a token is present
    if (token) {
      // token with a valid JWT format XXX.YYY.ZZZ
      if (token.split('.').length === 3) {
        // could be a valid JWT or an access token with the same format
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const exp = JSON.parse(this.b64DecodeUnicode(base64)).exp;
          // jwt with an optional expiration claims
          if (exp) {
            const isExpired = Math.round(new Date().getTime() / 1000) >= exp;
            if (isExpired) {
              // fail: Expired token
              this.storage.remove(this.tokenName);
              return false;
            } else {
              // pass: Non-expired token
              return true;
            }
          }
        } catch (e) {
          // pass: Non-JWT token that looks like JWT
          return true;
        }
      }
      // pass: All other tokens
      return true;
    }
    // lail: No token at all
    return false;
  }

  public getExpirationDate(token = this.getToken()) {
    const payload = this.getPayload(token);
    if (payload && payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
      const date = new Date(0);
      date.setUTCSeconds(payload.exp);
      return date;
    }
    return null;
  }

  public logout(): Observable<any> {
    return Observable.create((observer: Subscriber<any>) => {
      this.storage.remove(this.tokenName);
      observer.next();
      observer.complete();
    });
  }

  public setStorageType(type: StorageType) {
    return this.storage.updateStorageType(type);
  }

  private b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  }
}
