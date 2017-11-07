import { IOauth1Options, IOauth2Options } from './config.service';
import { Observable } from 'rxjs/Observable';

export interface IOauthService {
    open<T extends object | string>(options: IOauth2Options | IOauth1Options, userData: object): Observable<T>;
}
