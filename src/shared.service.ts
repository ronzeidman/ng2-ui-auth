/**
 * Created by Ron on 17/12/2015.
 */
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {ConfigService} from './config.service';
import {StorageService} from './storage.service';
/**
 * Created by Ron on 17/12/2015.
 */

@Injectable()
export class SharedService {
    tokenName = this.config.tokenPrefix ? [this.config.tokenPrefix, this.config.tokenName].join(this.config.tokenSeparator) : this.config.tokenName;
    constructor(private storage: StorageService, private config: ConfigService) {}
    getToken() {
        return this.storage.get(this.tokenName);
    }
    getPayload() {
        let token = this.getToken();

        if (token && token.split('.').length === 3) {
            try {
                let base64Url = token.split('.')[1];
                let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(decodeURIComponent(encodeURIComponent(window.atob(base64))));
            } catch (e) {
                return undefined;
            }
        }
    }
    setToken(response: string | Response) {
        if (!response) {
            console.warn('Can\'t set token without passing a value');
            return;
        }

        let token: string;
        if (typeof response === 'string') {
            token = response;
        } else {
            let accessToken = response && response.json() && (response.json().access_token || response.json().token);
            let tokenObject: { data: any };

            if (accessToken) {
                if (typeof accessToken === 'object' && typeof accessToken.data === 'object') {
                    tokenObject = <{data: any}>accessToken;
                } else if (typeof accessToken === 'string') {
                    token = accessToken;
                }
            }

            if (!token && tokenObject) {
                let tokenRootData = this.config.tokenRoot &&
                    this.config.tokenRoot.split('.').reduce(
                        (o, x) => {
                            return o[x];
                        },
                        tokenObject.data);
                token = tokenRootData ? tokenRootData[this.config.tokenName] : tokenObject.data[this.config.tokenName];
            }

            if (!token) {
                let tokenPath = this.config.tokenRoot ? this.config.tokenRoot + '.' + this.config.tokenName : this.config.tokenName;
                console.warn('Expecting a token named "' + tokenPath);
                return;
            }
        }

        this.storage.set(this.tokenName, token);
    }
    removeToken() {
        this.storage.remove(this.tokenName);
    }
    isAuthenticated() {
        let token = this.getToken();

        // a token is present
        if (token) {
            // token with a valid JWT format XXX.YYY.ZZZ
            if (token.split('.').length === 3) {
                // could be a valid JWT or an access token with the same format
                try {
                    let base64Url = token.split('.')[1];
                    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    let exp = JSON.parse(window.atob(base64)).exp;
                    // jwt with an optional expiration claims
                    if (exp) {
                        let isExpired = Math.round(new Date().getTime() / 1000) >= exp;
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
    getExpirationDate() {
        let payload = this.getPayload();
        if (payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
            let date = new Date(0);
            date.setUTCSeconds(payload.exp);
            return date;
        }
        return null;
    }
    logout(): Observable<any> {
        this.storage.remove(this.tokenName);
        return Observable.create((observer: Subscriber<any>) => {
            observer.next();
            observer.complete();
        });
    }
    setStorageType(type) {
        this.config.storageType = type;
    }
}
