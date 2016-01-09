import {Injectable, Injector, provide} from 'angular2/core';
import {Http, RequestOptionsArgs} from 'angular2/http';
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
export function NG2_UI_AUTH_PROVIDERS(config: ICustomConfig) {
    return [provide(Config, { useFactory: () => { return new Config(config);}}), 
            provide(Storage, { useFactory: (providedConfig) => { return new Storage(providedConfig);}, deps: [Config]} ), 
            provide(Shared, { useFactory: (storage, providedConfig) => { return new Shared(storage, providedConfig);}, deps: [Storage, Config]} ), 
            provide(Oauth, { useFactory: (http, injector, shared, providedConfig) => { return new Oauth(http, injector, shared, providedConfig);}, deps: [Http, Injector, Shared, Config]} ), 
            provide(Popup, { useFactory: (providedConfig) => { return new Popup(providedConfig);}, deps: [Config]} ),
            provide(Oauth1, { useFactory: (http, popup, providedConfig) => { return new Oauth1(http, popup, providedConfig);}, deps: [Http, Popup, Config]} ),
            provide(Oauth2, { useFactory: (http, popup, storage, providedConfig) => { return new Oauth2(http, popup, storage, providedConfig);}, deps: [Http, Popup, Storage, Config]} ),
            provide(Local, { useFactory: (http, shared, providedConfig) => { return new Local(http, shared, providedConfig);}, deps: [Http, Shared, Config]} ),
            provide(Auth, { useFactory: (shared, local, oauth) => { return new Auth(shared, local, oauth);}, deps: [Shared, Local, Oauth]} )];
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
    getExpirationDate() {
        return this.shared.getExpirationDate();
    }
}
