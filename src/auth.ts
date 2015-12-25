import {Injectable, provide} from 'angular2/core';
import {RequestOptionsArgs} from 'angular2/http';
import {Shared} from './shared';
import {Local} from './local';
import {Oauth} from './oauth';
import {Popup} from './popup';
import {Oauth2} from './oauth2';
import {Oauth1} from './oauth1';
import {Storage} from './storage';
import {ICustomConfig} from './config';
import {Config} from './config';

/**
 * Created by Ron on 17/12/2015.
 */
export function SATELLIZER_PROVIDERS(config: ICustomConfig) {
    return [provide(Config, { useFactory: () => {
        return new Config(config);
    }}), Auth, Oauth, Oauth1, Oauth2, Local, Shared, Popup, Storage];
}
@Injectable()
export class Auth {
    constructor(private shared: Shared,
                private local: Local,
                private oauth: Oauth) {}
    login(user, opts?: RequestOptionsArgs) {
        return this.local.login(user, opts);
    }
    signup(user, opts?: RequestOptionsArgs) {
        return this.local.signup(user, opts);
    }
    logout() {
        return this.shared.logout();
    }
    authenticate(name: string, userData?: any) {
        return this.oauth.authenticate(name, userData);
    }
    link(name: string, userData?: any) {
        return this.oauth.authenticate(name, userData);
    }
    unlink(provider: string, opts: RequestOptionsArgs) {
        return this.oauth.unlink(provider, opts);
    }
    isAuthenticated() {
        return this.shared.isAuthenticated();
    }
    getToken() {
        return this.shared.getToken();
    }
    setToken(token: string) {
        return this.shared.setToken(token);
    }
    removeToken() {
        return this.shared.removeToken();
    }
    getPayload() {
        return this.shared.getPayload();
    }
    setStorageType(type: string) {
        return this.shared.setStorageType(type);
    }
}
