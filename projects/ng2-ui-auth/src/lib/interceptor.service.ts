import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { SharedService } from './shared.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private shared: SharedService, private config: ConfigService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { authHeader, authToken } = this.config.options;
    const token = this.shared.getToken();
    const isAuthenticated = this.shared.isAuthenticated();
    const newReq =
      isAuthenticated && !req.headers.has(authHeader) ? req.clone({ setHeaders: { [authHeader]: `${authToken} ${token}` } }) : req;
    return next.handle(newReq);
  }
}
