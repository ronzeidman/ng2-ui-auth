import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { LocalService } from './local.service';
import { OauthService } from './oauth.service';
import { Observable } from 'rxjs/Observable';
import { StorageType } from './storage-type.enum';

/**
 * Created by Ron on 17/12/2015.
 */

@Injectable()
export class AuthService {
    constructor(private shared: SharedService,
        private local: LocalService,
        private oauth: OauthService) {
    }

    public login<T extends string | object = any>(user: string | object, url?: string): Observable<T> {
        return this.local.login<T>(user, url);
    }

    public signup<T = any>(user: string | object, url?: string): Observable<T> {
        return this.local.signup<T>(user, url);
    }

    public logout(): Observable<void> {
        return this.shared.logout();
    }

    public authenticate<T = any>(name: string, userData?: any): Observable<T> {
        return this.oauth.authenticate<T>(name, userData);
    }

    public link<T = any>(name: string, userData?: any): Observable<T> {
        return this.oauth.authenticate<T>(name, userData);
    }

    public unlink<T = any>(provider: string, url?: string): Observable<T> {
        return this.oauth.unlink<T>(provider, url);
    }

    public isAuthenticated(): boolean {
        return this.shared.isAuthenticated();
    }

    public getToken(): string | null {
        return this.shared.getToken();
    }

    public setToken(token: string | object): void {
        this.shared.setToken(token);
    }

    public removeToken(): void {
        this.shared.removeToken();
    }

    public getPayload(): any {
        return this.shared.getPayload();
    }

    public setStorageType(type: StorageType): boolean {
        return this.shared.setStorageType(type);
    }

    public getExpirationDate(): Date | null {
        return this.shared.getExpirationDate();
    }
}
