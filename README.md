# ng2-ui-auth
an angular2 repository for authentication based on angular1's satellizer
This is mostly copy-paste from the great satellizer (https://satellizer.herokuapp.com/#/ https://github.com/sahat/satellizer) library (even the default token prefix remained "satellizer").
To use this run `npm install angular2-jwt ronzeidman/ng2-ui-auth --save`.
For configuration do the following:
```typescript
import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AuthHttp} from 'angular2-jwt';
import {Config, SATELLIZER_PROVIDERS, Auth} from 'ng2-ui-auth';
import {Main} from './main';

const GOOGLE_CLIENT_ID = '******************************.apps.googleusercontent.com';

bootstrap(Main, [
    HTTP_PROVIDERS,
    SATELLIZER_PROVIDERS({providers: {google: {clientId: GOOGLE_CLIENT_ID}}}),
    provide(AuthHttp, {
        useFactory: (auth: Auth, config: Config) => {
            return new AuthHttp({
                tokenName: config.tokenName,
                tokenGetter: () => auth.getToken(),
            });
        },
        deps: [Auth, Config],
    }),
]);
```

For usage look at the satellizer project it's 99% the same (instead of promises it uses Observables)

```typescript
import {Component, AfterContentInit, ElementRef, Renderer} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FormBuilder, ControlGroup, Validators} from 'angular2/common';
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

If someone thinks that some of my code can be written better I encurage you to inform me.
