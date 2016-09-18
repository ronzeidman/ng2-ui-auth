import {Injectable} from '@angular/core';
import {SharedService} from './shared.service';
import {ConfigService} from './config.service';
import {RequestOptionsArgs, Response} from '@angular/http';
import {joinUrl} from './utils';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {JwtHttp} from './jwt-http.service';

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
export class LocalService {
    constructor(private http: JwtHttp,
                private shared: SharedService,
                private config: ConfigService) {}

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