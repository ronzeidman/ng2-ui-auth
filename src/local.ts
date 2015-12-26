import {Injectable} from 'angular2/core';
import {Shared} from './shared';
import {Config} from './config';
import {Http, RequestOptionsArgs, Response} from 'angular2/http';
import {joinUrl} from './utils';

/**
 * Created by Ron on 17/12/2015.
 */

@Injectable()
export class Local {
    constructor(private http: Http,
                private shared: Shared,
                private config: Config) {}
    login(user, opts?: RequestOptionsArgs) {
        opts = opts || {};
        let url = opts.url ? opts.url : joinUrl(this.config.baseUrl, this.config.loginUrl);
        opts.body = JSON.stringify(user) || opts.body;
        opts.method = opts.method || 'POST';
        /*opts.headers = new Headers({
            'Content-Type': 'application/json'
        });*/

        return this.http.request(url, opts)
            .map((response: Response) => {
                this.shared.setToken(response);
                return response;
            });
    }
    signup(user, opts?: RequestOptionsArgs) {
        opts = opts || {};
        let url = opts.url ? opts.url : joinUrl(this.config.baseUrl, this.config.signupUrl);
        opts.body = JSON.stringify(user) || opts.body;
        opts.method = opts.method || 'POST';

        return this.http.request(url, opts);
    }
}
