import { Injectable, Injector } from '@angular/core';
import { joinUrl } from './utils';
import { tap } from 'rxjs/operators';
import { Oauth1Service } from './oauth1.service';
import { Oauth2Service } from './oauth2.service';
import { Observable } from 'rxjs';
import { PopupService } from './popup.service';
import { ConfigService } from './config.service';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { IOauthService } from './oauth-service';

@Injectable()
export class OauthService {
  readonly depProviders = [
    { provide: HttpClient, useValue: this.http },
    { provide: PopupService, useValue: this.popup },
    { provide: ConfigService, useValue: this.config }
  ];
  readonly deps = [HttpClient, PopupService, ConfigService];

  constructor(private http: HttpClient, private shared: SharedService, private config: ConfigService, private popup: PopupService) {}

  public authenticate<T extends object | string>(name: string, userData?: any): Observable<T> {
    const provider: IOauthService =
      this.config.options.providers[name].oauthType === '1.0'
        ? Injector.create([...this.depProviders, { provide: Oauth1Service, deps: this.deps }]).get(Oauth1Service)
        : Injector.create([...this.depProviders, { provide: Oauth2Service, deps: this.deps }]).get(Oauth2Service);

    return provider.open<T>(this.config.options.providers[name], userData || {}).pipe(
      tap(response => {
        // this is for a scenario when someone wishes to opt out from
        // satellizer's magic by doing authorization code exchange and
        // saving a token manually.
        if (this.config.options.providers[name].url) {
          this.shared.setToken(response);
        }
      })
    );
  }

  public unlink<T>(provider: string, url = joinUrl(this.config.options.baseUrl, this.config.options.unlinkUrl), method = 'POST') {
    return this.http.request<T>(method, url, { body: { provider } });
  }
}
