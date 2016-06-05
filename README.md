# ng2-ui-auth
an angular2 repository for authentication based on angular1's satellizer
This is mostly copy-paste from the great satellizer (https://satellizer.herokuapp.com/#/ https://github.com/sahat/satellizer) library.
To use this run `npm install ng2-ui-auth --save`.

for a full client + server-side example: https://github.com/ronzeidman/ng2-ui-auth-example

For configuration do the following:
```typescript
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {NG2_UI_AUTH_PROVIDERS, JwtHttp} from 'ng2-ui-auth';
import {Main} from './main';
const DEFAULT_POST_HEADER: {[name: string]: string} = {
  'Content-Type': 'application/json'
};
const GOOGLE_CLIENT_ID = '******************************.apps.googleusercontent.com';

bootstrap(Main, [
    HTTP_PROVIDERS,
    NG2_UI_AUTH_PROVIDERS({defaultHeaders: DEFAULT_POST_HEADER, providers: {google: {clientId: GOOGLE_CLIENT_ID}}}),
]);
```
or if you want to provide your own http implementation (or replace existing http):
```typescript
import {Http,RequestOptions,BaseRequestOptions,ResponseOptions,BaseResponseOptions,BrowserXhr,XHRBackend} from '@angular/http';
import {JwtHttp, Config, Shared} from 'ng2-ui-auth';

export class MyHttp extends JwtHttp {
    constructor(backend: ConnectionBackend,
                defaultOptions: RequestOptions,
                shared: Shared,
                config: Config) {
        super(backend, defaultOptions, shared, config);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        options = options || {};
        if (!options.headers) {
            options.headers = new Headers();
        }
        if (!options.headers.has('Content-Type')) {
            options.headers.set('Content-Type', 'application/json');
        }
        return super.request(url, options)
            .catch((err, source, caught) => {
                handleError(err);
                return Observable.empty();
            });
    }
}

export const MY_HTTP_PROVIDERS = [
    provide(
        MyHttp, // If you replace the JwtHttp or the Http itself make sure you are not changing the response type since NG2_UI_AUTH_PROVIDERS is using JwtHttp and expects the default response type
        {
            useFactory:
                (xhrBackend, requestOptions, shared, config, router) =>
                    new MyHttp(xhrBackend, requestOptions, shared, config),
            deps: [XHRBackend, RequestOptions, Shared, Config],
        }),
    DefaultHandlers,
    BrowserXhr,
    provide(RequestOptions, {useClass: BaseRequestOptions}),
    provide(ResponseOptions, {useClass: BaseResponseOptions}),
    XHRBackend,
];

//in the bootstrap file:
bootstrap(Main, [
    NG2_UI_AUTH_PROVIDERS({providers: {google: {clientId: GOOGLE_CLIENT_ID}}}),
    MY_HTTP_PROVIDERS,
]);
```


For usage look at the satellizer project it's 99% the same (instead of promises it uses Observables)

```typescript
import {Component, AfterContentInit, ElementRef, Renderer} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {Auth} from 'ng2-ui-auth';
import {NgMessages} from '../formComponents/ngMessages';
import {CustomValidators} from '../formComponents/customValidators';
import {DefaultHandlers} from '../httpDefaults';

/**
 * Created by Ron on 18/12/2015.
 */

@Component({
    selector: 'app-login',
    templateUrl: './src/login/login.html',
    directives: [NgMessages, ROUTER_DIRECTIVES],
})
export class Login implements AfterContentInit {
    form: ControlGroup;
    user = { email: '', password: '' };
    userControlsConfig = {
        email: ['', Validators.compose([Validators.required, CustomValidators.email])],
        password: ['', Validators.required],
    };
    login() {
        this.auth.login(this.user)
            .subscribe(
                () => this.goToMain(),
                this.handlers.error
            );
    }
    authenticate(provider: string) {
        this.auth.authenticate(provider)
            .subscribe(
                () => this.goToMain(),
                this.handlers.error
            );
    }
    goToMain() {
        this.router.navigate(['Main']);
    }
    ngAfterContentInit() {
        this.renderer.setElementClass(this.element, 'app', true);
        if (this.auth.isAuthenticated()) {
            this.goToMain();
        }
    }
    constructor(private auth: Auth,
                private fb: FormBuilder,
                private router: Router,
                private element: ElementRef,
                private renderer: Renderer,
                private handlers: DefaultHandlers) {
        this.form = fb.group(this.userControlsConfig);
    }
}
```

The corresponding html (also migrated from satellizer):
```html
<div class="row main-container">
    <div class="center-form panel">
        <div class="panel-body">
            <h2 class="text-center">Log in</h2>

            <form (ngSubmit)="login()" [ngFormModel]="form" #f="ngForm">
                <div class="form-group has-feedback" [class.has-error]="f.form.controls.email.dirty && !f.form.controls.email.valid">
                    <input type="text" ngControl="email" class="form-control input-lg" [(ngModel)]="user.email" placeholder="Email" autofocus>
                    <i class="fa form-control-feedback fa-at"></i>
                    <ng-messages [errors]="f.form.controls.email.errors"></ng-messages>
                </div>
                <div class="form-group has-feedback" [class.has-error]="f.form.controls.password.dirty && !f.form.controls.password.valid">
                    <input type="password" ngControl="password" class="form-control input-lg" [(ngModel)]="user.password" placeholder="Password">
                    <i class="fa form-control-feedback fa-key"></i>
                    <ng-messages [errors]="f.form.controls.password.errors"></ng-messages>
                </div>
                <button type="submit" [disabled]="!f.form.valid" class="btn btn-lg btn-block btn-success">Log in</button>
                <br>
                <p class="text-center text-muted" >
                    <small>Don&apos;t have an account yet?</small>
                    <a [routerLink]="['Signup']">Sign up</a>
                </p>
                <div class="signup-or-separator">
                    <h6 class="text">or</h6>
                    <hr>
                </div>
            </form>

            <button class="btn btn-block btn-google-plus" (click)="authenticate('google')">
                <i class="fa fa-google-plus"></i>
                sign in with Google
            </button>
        </div>
    </div>
</div>
```

If something doesn't work, feel free to issue a pull request and/or create a new issue, I'm not sure I'll be responsive though since I use it internally for my project and will only update and fix the repository if it affects my work.
If someone (like let's say @shahat) will want to take control of this repository and maintain it he is more than welcome to do so.

If someone thinks that some of my code can be written better I encourage you to inform me.
