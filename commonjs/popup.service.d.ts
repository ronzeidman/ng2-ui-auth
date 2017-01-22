import { Observable } from 'rxjs/Observable';
import { ConfigService, IPopupOptions } from './config.service';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';
export declare class PopupService {
    private config;
    url: string;
    popupWindow: Window;
    private static prepareOptions(options);
    private static stringifyOptions(options);
    private static parseQueryString(joinedKeyValue);
    constructor(config: ConfigService);
    open(url: string, name: string, options: IPopupOptions): this;
    eventListener(redirectUri: string): Observable<any>;
    pollPopup(): Observable<any>;
}
