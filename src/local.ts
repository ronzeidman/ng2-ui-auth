import {Injectable} from '@angular/core';
import {Shared} from './shared';
import {Config} from './config';
import {Http, RequestOptionsArgs, Response} from '@angular/http';
import {joinUrl} from './utils';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

/**
 * Created by Ron on 17/12/2015.
 */

function getFullOpts(user: string | Object, userOpts?: RequestOptionsArgs) {
    const opts = userOpts || {};
    if (user) {
        opts.body = typeof user === 'string' ? user : JSON.stringify(user);
    }
    opts.method = opts.method || 'POST';
    return opts;
}

@Injectable()
export class Local {
    constructor(private http: Http,
                private shared: Shared,
                private config: Config) {}

    login(user: string | Object, opts?: RequestOptionsArgs): Observable<Response> {
        const fullOpts = getFullOpts(user, opts);
        const url = fullOpts.url ? fullOpts.url : joinUrl(this.config.baseUrl, this.config.loginUrl);

        return this.http.request(url, fullOpts)
            .do((response: Response) => this.shared.setToken(response));
    }

    signup(user: string | Object, opts?: RequestOptionsArgs): Observable<Response> {
        const fullOpts = getFullOpts(user, opts);
        const url = fullOpts.url ? fullOpts.url : joinUrl(this.config.baseUrl, this.config.signupUrl);

        return this.http.request(url, getFullOpts(user, fullOpts));
    }
}