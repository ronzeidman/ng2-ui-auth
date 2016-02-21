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
