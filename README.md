# ng2-ui-auth [![npm version](https://badge.fury.io/js/ng2-ui-auth.svg)](https://badge.fury.io/js/ng2-ui-auth)

An angular2 repository for authentication based on angular1's satellizer
This is mostly copy-paste from the great satellizer (https://satellizer.herokuapp.com/#/ https://github.com/sahat/satellizer) library.
To use this run `npm install ng2-ui-auth --save`.

**If you are migrating from version 5 or below, replace `Ng2UiAuthModule.getWithConfig(MyConfig)` with `Ng2UiAuthModule.forRoot(MyConfig)`**

- for a full client + server-side example: [ronzeidman/ng2-ui-auth-example](https://github.com/ronzeidman/ng2-ui-auth-example).
- for a Go Server and extended client example: [pcdummy/ng2-ui-auth-example](https://github.com/pcdummy/ng2-ui-auth-example).

Just modify your main app module:
```typescript
import {Ng2UiAuthModule, CustomConfig} from 'ng2-ui-auth';

export const GOOGLE_CLIENT_ID = '******************************.apps.googleusercontent.com';
export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = {google: {clientId: GOOGLE_CLIENT_ID}};
}

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        Ng2UiAuthModule.forRoot(MyAuthConfig),
        ...
    ]
    ...
})
AppModule {}
```

For usage look at the satellizer project it's 99% the same (instead of promises it uses Observables),
Hopefully I will update https://github.com/ronzeidman/ng2-ui-auth-example with a more current and simpler example soon

If something doesn't work, feel free to issue a pull request and/or create a new issue, I'm not sure I'll be responsive though since I use it internally for my project and will only update and fix the repository if it affects my work.
If someone (like let's say @shahat) will want to take control of this repository and maintain it he is more than welcome to do so.

If someone thinks that some of my code can be written better I encourage you to inform me.
