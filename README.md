An angular2 repository for authentication based on angular1's satellizer (https://satellizer.herokuapp.com/#/ https://github.com/sahat/satellizer) library. To use this run npm install ng2-ui-auth --save.

If you are migrating from version 7 or below, look at the changelog

for a full client + server-side example: ronzeidman/ng2-ui-auth-example.
for a Go Server and extended client example: pcdummy/ng2-ui-auth-example.
Just modify your main app module:

```ts
import {Ng2UiAuthModule} from 'ng2-ui-auth';

const GOOGLE_CLIENT_ID = '******\*\*******\*\*******\*\*******.apps.googleusercontent.com';

@NgModule({
imports: [
BrowserModule,
HttpClientModule,
Ng2UiAuthModule.forRoot({providers: {google: { clientId: GOOGLE_CLIENT_ID}}}),
...
]
...
})
AppModule {}
```

I will update https://github.com/ronzeidman/ng2-ui-auth-example with a more current and simpler example soon. If someone wishes to update it and send a pull request, he is more than welcome to do so.

If something doesn't work, feel free to issue a pull request and/or create a new issue, I'm not sure I'll be responsive though since I use it internally for my project and will only update and fix the repository if it affects my work.

If someone thinks that some of my code can be written better I encourage you to inform me.
