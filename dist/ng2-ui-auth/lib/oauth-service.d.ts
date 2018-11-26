import { IOauth2Options, IOauth1Options } from './config-interfaces';
import { Observable } from 'rxjs';
export interface IOauthService {
    open<T extends object | string>(options: IOauth2Options | IOauth1Options, userData: object): Observable<T>;
}
