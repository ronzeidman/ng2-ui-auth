System.register(['./src/auth', './src/config'], function(exports_1) {
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
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=export.js.map