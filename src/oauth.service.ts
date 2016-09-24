import {Injectable, Injector} from '@angular/core';
import {Oauth1Service} from './oauth1.service';
import {Oauth2Service} from './oauth2.service';
import {SharedService} from './shared.service';
import {Response, RequestOptionsArgs} from '@angular/http';
import {joinUrl} from './utils';
import {ConfigService, IOauth1Options} from './config.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {JwtHttp} from './jwt-http.service';

/**
 * Created by Ron on 17/12/2015.
 */

@Injectable()
export class OauthService {
    constructor(private http: JwtHttp,
                private injector: Injector,
                private shared: SharedService,
                private config: ConfigService) {}
    authenticate(name: string, userData?: any): Observable<Response> {
        // var injector = Injector.resolveAndCreate([Oauth1, Oauth2]);
        const provider: { open(options?: IOauth1Options, userData?: any): Observable<Response> } = this.config.providers[name].oauthType === '1.0' ? this.injector.get(Oauth1Service) : this.injector.get(Oauth2Service);
        return provider.open(this.config.providers[name], userData || {})
            .do((response: Response) => {
                // this is for a scenario when someone wishes to opt out from
                // satellizer's magic by doing authorization code exchange and
                // saving a token manually.
                if (this.config.providers[name].url) {
                    this.shared.setToken(response);
                }
            });
    }
    unlink(provider: string, opts: RequestOptionsArgs) {
        opts = opts || {};
        let url = opts.url ? opts.url : joinUrl(this.config.baseUrl, this.config.unlinkUrl);
        opts.body = JSON.stringify({ provider: provider }) || opts.body;
        opts.method = opts.method || 'POST';
        
        return this.http.request(url, opts);
    }
}
