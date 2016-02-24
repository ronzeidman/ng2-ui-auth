System.register(['../src/auth', '../src/config', '../src/shared', '../src/jwtHttp'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
            function (shared_1_1) {
                exports_1({
                    "Shared": shared_1_1["Shared"]
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