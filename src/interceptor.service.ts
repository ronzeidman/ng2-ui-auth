import { switchMapTo } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private _http: HttpClient,
        private _shared: SharedService,
        private _config: ConfigService,
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { authHeader, refreshBeforeExpiration, autoRefreshToken } = this._config;
        const token = this._shared.getToken();
        const isAuthenticated = this._shared.isAuthenticated;
        const exp = this._shared.getExpirationDate();
        const newReq = isAuthenticated
            ? req.clone({ setHeaders: { [authHeader]: this.getAuthHeaderString() } })
            : req;

        if (token &&
            (!exp || exp.getTime() + refreshBeforeExpiration > Date.now()) &&
            autoRefreshToken) {
            return this.refreshToken().pipe(switchMapTo(next.handle(newReq)));
        }
        if (this._config.tryTokenRefreshIfUnauthorized) {
            return next.handle(newReq)
                .pipe(catchError((response: HttpErrorResponse) => {
                    if (response.status === 401) {
                        return this.refreshToken().pipe(switchMapTo(next.handle(newReq)));
                    }
                    throw response;
                }));
        }
        return next.handle(newReq);
    }

    refreshToken(): Observable<any> {
        return this._http
            .get(this._config.refreshUrl, {
                headers: new HttpHeaders({ [this._config.authHeader]: this.getAuthHeaderString() }),
            })
            .pipe(tap(this._shared.setToken));
    }

    getAuthHeaderString() {
        return this._config.authToken + ' ' + this._shared.getToken();
    }

}