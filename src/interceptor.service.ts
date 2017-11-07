import { switchMapTo } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { SharedService } from './shared.service';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private shared: SharedService,
        private config: ConfigService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { authHeader, authToken } = this.config.options;
        const token = this.shared.getToken();
        const isAuthenticated = this.shared.isAuthenticated;
        const newReq = isAuthenticated && !req.headers.has(authHeader)
            ? req.clone({ setHeaders: { [authHeader]: `${authToken} ${token}` } })
            : req;
        return next.handle(newReq);
    }

}