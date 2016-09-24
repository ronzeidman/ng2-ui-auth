#### master
* fix issue #47 using this library without server url causes exception.

#### 4.0.0
* Aligned default config with Satellizer (added Spotify)
* AOT compilation now works
* Peer dependency is now ^2.0.0
* **BREAKING CHANGE:** Changed service names to have "Service" postfix ("Auth" is now AuthService) all except JwtHttp which remains the same.
* **BREAKING CHANGE:** Initializing the library works like this now:
```typescript
export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = {google: {clientId: GOOGLE_CLIENT_ID}};
}

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        Ng2UiAuthModule.getWithConfig(MyAuthConfig),
        ...
    ]
    ...
```

#### 3.2.5
* Added "refresh token" flow, if you configure 'autoRefreshToken' to true then if you call a webservice when the token expires this library automatically sends it to the server using 'refreshUrl' endpoint (can be set in config default = '/auth/refresh') first and then sets a new token if it receives it and tries to call the original request. (issue #41)
* Added 'state' to the 'optionalUrlParams' of google according to issue #43

#### 3.2.2
* after testing issue #29 should be fixed

#### 3.2.1
* reverting to 3.1.2 since the 3.2.0 fix was not enough

#### 3.2.0
* fixed issue #29: extend() did not work causing custom options of popup window size to not work and `authenticate('provider', userCustomData)` with user custom data to not work properly

#### 3.1.2
* fixed issue #27: added missing `authHeader` to `ICustomConfig` interface

#### 3.1.0
* support rc2 "withCredentials" http flag

#### 3.0.5
* fixed issue #25: signup should accept "string" user and custom body

#### 3.0.3
* made a different folder for declarations so typescript won't try to re-compile the library

#### 3.0.2
* fixed issue: Not able to send a string user, or the user in the options body.

#### 3.0.0
* updated to support rc.0 and hopefully above

#### 2.1.0
* using rollup to bundle (fixes warning in webpack import)
* breaking change: adding default headers even without authentication
* removed dependency on "flatMap"
* updated peer dependencies to beta.12

#### 2.0.0
* breaking change: removed JWT_HTTP_PROVIDER, JwtHttp is provided in the default provider,
* breaking change: all internal calls use JwtHttp for their calls instead of Http
* added configurable default headers (`NG2_UI_AUTH_PROVIDERS({ defaultHeaders: {'Content-Type': 'application/json'}, providers: {google: {clientId: GOOGLE_CLIENT_ID}}})`)
* added configurable token seperator (`NG2_UI_AUTH_PROVIDERS({ tokenSeparator: '-', providers: {google: {clientId: GOOGLE_CLIENT_ID}}})`)
* fix for JwtHttp to support "Request" class as a parameter.

#### 1.1.0
* bundled the entire sources to dist/ng2-ui-auth.js and provided a minified version
* added a provider for plain JwtHttp (JWT_HTTP_PROVIDER)
* bumped peer dependency to beta.7

#### 1.0.15
* bumped to angular 2.0.0-beta.2
* changed dependencies to angular2 being a "peerDependency"

#### 1.0.14
* fixed http "unlink" call

#### 1.0.13
* changed module from system to commonjs

#### 1.0.10
* Removed dependency on angular-jwt (you can now use the included JwtHttp)
* Readded "authHeader" to the configuration
* Added an api for getting token expiration date (auth.getExpirationDate())
* changed default token prefix and the name of the providers from SATELLIZER_PROVIDERS to NG2_UI_AUTH_PROVIDERS 

#### 1.0.9
* everything is working!
