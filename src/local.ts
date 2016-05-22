import {Injectable} from '@angular/core';
import {Shared} from './shared';
import {Config} from './config';
import {Http, RequestOptionsArgs, Response} from '@angular/http';
import {joinUrl} from './utils';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/**
 * Created by Ron on 17/12/2015.
 */

@Injectable()
export class Local {
    constructor(private http: Http,
                private shared: Shared,
                private config: Config) {}
    login(user, opts?: RequestOptionsArgs): Observable<Response> {
        opts = opts || {};
        let url = opts.url ? opts.url : joinUrl(this.config.baseUrl, this.config.loginUrl);
        if (user) {
            opts.body = typeof user === 'string' ? user : JSON.stringify(user);
        }
        opts.method = opts.method || 'POST';

        return this.http.request(url, opts)
            .map((response: Response) => {
                this.shared.setToken(response);
                return response;
            });
    }
    signup(user, opts?: RequestOptionsArgs): Observable<Response> {
        opts = opts || {};
        let url = opts.url ? opts.url : joinUrl(this.config.baseUrl, this.config.signupUrl);
        opts.body = JSON.stringify(user) || opts.body;
        opts.method = opts.method || 'POST';

        return this.http.request(url, opts);
    }
}
