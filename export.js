System.register(['./src/auth', './src/config', './src/jwtHttp'], function(exports_1) {
    "use strict";
    return {
        setters:[
            function (auth_1_1) {
                exports_1({
                    "Auth": auth_1_1["Auth"],
                    "NG2_UI_AUTH_PROVIDERS": auth_1_1["NG2_UI_AUTH_PROVIDERS"]
                });
            },
            function (config_1_1) {
                exports_1({
                    "Config": config_1_1["Config"]
                });
            },
            function (jwtHttp_1_1) {
                exports_1({
                    "JwtHttp": jwtHttp_1_1["JwtHttp"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=export.js.map