import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { ConfigService } from './config.service';
import { joinUrl } from './utils';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';

/**
 * Created by Ron on 17/12/2015.
 */

@Injectable()
export class LocalService {
    constructor(
        private http: HttpClient,
        private shared: SharedService,
        private config: ConfigService) { }

    public login<T extends string | object>(user: string | object, url?: string): Observable<T> {
        return this.http.post<T>(url || joinUrl(this.config.options.baseUrl, this.config.options.loginUrl), user)
            .pipe(tap((data) => this.shared.setToken(data)));
    }

    public signup<T = any>(user: string | object, url?: string): Observable<T> {
        return this.http.post<T>(url || joinUrl(this.config.options.baseUrl, this.config.options.loginUrl), user);
    }
}
