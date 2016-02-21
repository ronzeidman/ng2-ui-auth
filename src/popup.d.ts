import { Observable } from 'rxjs/Observable';
import { Config, IPopupOptions } from './config';
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
