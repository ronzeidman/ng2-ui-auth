import { Observable } from 'rxjs/Observable';
import { Config, IPopupOptions } from './config';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';
export declare class Popup {
    private config;
    url: string;
    popupWindow: Window;
    private static prepareOptions(options);
    private static stringifyOptions(options);
    private static parseQueryString(joinedKeyValue);
    constructor(config: Config);
    open(url: string, name: string, options: IPopupOptions): this;
    eventListener(redirectUri: string): Observable<{}>;
    pollPopup(): Observable<{}>;
}
