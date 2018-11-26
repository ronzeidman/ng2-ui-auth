/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getWindowOrigin } from './utils';
/** @type {?} */
export var defaultProviders = {
    facebook: {
        name: 'facebook',
        url: '/auth/facebook',
        redirectUri: getWindowOrigin() + "/",
        authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
        additionalUrlParams: {
            display: 'popup'
        },
        scope: ['email'],
        scopeDelimiter: ',',
        oauthType: '2.0',
        popupOptions: { width: 580, height: 400 }
    },
    google: {
        name: 'google',
        url: '/auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        additionalUrlParams: {
            display: 'popup',
            prompt: undefined,
            login_hint: undefined,
            access_type: undefined,
            include_granted_scopes: undefined,
            'openid.realm': undefined,
            hd: undefined
        },
        scope: ['openid', 'profile', 'email'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: { width: 452, height: 633 },
        state: function () {
            return encodeURIComponent(Math.random()
                .toString(36)
                .substr(2));
        }
    },
    github: {
        name: 'github',
        url: '/auth/github',
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        scope: ['user:email'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: { width: 1020, height: 618 }
    },
    instagram: {
        name: 'instagram',
        url: '/auth/instagram',
        authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
        scope: ['basic'],
        scopeDelimiter: '+',
        oauthType: '2.0'
    },
    linkedin: {
        name: 'linkedin',
        url: '/auth/linkedin',
        authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
        scope: ['r_emailaddress'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: { width: 527, height: 582 },
        state: 'STATE'
    },
    twitter: {
        name: 'twitter',
        url: '/auth/twitter',
        authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
        oauthType: '1.0',
        popupOptions: { width: 495, height: 645 }
    },
    twitch: {
        name: 'twitch',
        url: '/auth/twitch',
        authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
        scope: ['user_read'],
        scopeDelimiter: ' ',
        additionalUrlParams: {
            display: 'popup'
        },
        oauthType: '2.0',
        popupOptions: { width: 500, height: 560 }
    },
    live: {
        name: 'live',
        url: '/auth/live',
        authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
        additionalUrlParams: {
            display: 'popup'
        },
        scope: ['wl.emails'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: { width: 500, height: 560 }
    },
    yahoo: {
        name: 'yahoo',
        url: '/auth/yahoo',
        authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
        scope: [],
        scopeDelimiter: ',',
        oauthType: '2.0',
        popupOptions: { width: 559, height: 519 }
    },
    bitbucket: {
        name: 'bitbucket',
        url: '/auth/bitbucket',
        authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
        redirectUri: getWindowOrigin() + "/",
        scope: ['email'],
        scopeDelimiter: ',',
        oauthType: '2.0',
        popupOptions: { width: 1028, height: 529 }
    },
    spotify: {
        name: 'spotify',
        url: '/auth/spotify',
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        scope: ['', 'user-read-email'],
        scopeDelimiter: ',',
        oauthType: '2.0',
        popupOptions: { width: 500, height: 530 },
        state: function () {
            return encodeURIComponent(Math.random()
                .toString(36)
                .substr(2));
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsibGliL2NvbmZpZy1wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7O0FBRzFDLE1BQU0sS0FBTyxnQkFBZ0IsR0FBZTtJQUMxQyxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsVUFBVTtRQUNoQixHQUFHLEVBQUUsZ0JBQWdCO1FBQ3JCLFdBQVcsRUFBSyxlQUFlLEVBQUUsTUFBRztRQUNwQyxxQkFBcUIsRUFBRSw0Q0FBNEM7UUFDbkUsbUJBQW1CLEVBQUU7WUFDbkIsT0FBTyxFQUFFLE9BQU87U0FDakI7UUFDRCxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDaEIsY0FBYyxFQUFFLEdBQUc7UUFDbkIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0tBQzFDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxHQUFHLEVBQUUsY0FBYztRQUNuQixxQkFBcUIsRUFBRSwyQ0FBMkM7UUFDbEUsbUJBQW1CLEVBQUU7WUFDbkIsT0FBTyxFQUFFLE9BQU87WUFDaEIsTUFBTSxFQUFFLFNBQVM7WUFDakIsVUFBVSxFQUFFLFNBQVM7WUFDckIsV0FBVyxFQUFFLFNBQVM7WUFDdEIsc0JBQXNCLEVBQUUsU0FBUztZQUNqQyxjQUFjLEVBQUUsU0FBUztZQUN6QixFQUFFLEVBQUUsU0FBUztTQUNkO1FBQ0QsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUM7UUFDckMsY0FBYyxFQUFFLEdBQUc7UUFDbkIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVB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LEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDaEIsY0FBYyxFQUFFLEdBQUc7UUFDbkIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0tBQzNDO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFNBQVM7UUFDZixHQUFHLEVBQUUsZUFBZTtRQUNwQixxQkFBcUIsRUFBRSx3Q0FBd0M7UUFDL0QsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLGlCQUFpQixDQUFDO1FBQzlCLGNBQWMsRUFBRSxHQUFHO1FBQ25CLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtRQUN6QyxLQUFLLEVBQUU7WUFDTCxPQUFBLGtCQUFrQixDQUNoQixJQUFJLENBQUMsTUFBTSxFQUFFO2lCQUNWLFFBQVEsQ0FBQyxFQUFFLENBQUM7aUJBQ1osTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUNiO1FBSkQsQ0FJQztLQUNKO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRXaW5kb3dPcmlnaW4gfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgSVByb3ZpZGVycyB9IGZyb20gJy4uL3B1YmxpY19hcGknO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRQcm92aWRlcnM6IElQcm92aWRlcnMgPSB7XHJcbiAgZmFjZWJvb2s6IHtcclxuICAgIG5hbWU6ICdmYWNlYm9vaycsXHJcbiAgICB1cmw6ICcvYXV0aC9mYWNlYm9vaycsXHJcbiAgICByZWRpcmVjdFVyaTogYCR7Z2V0V2luZG93T3JpZ2luKCl9L2AsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vdjIuNS9kaWFsb2cvb2F1dGgnLFxyXG4gICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICBkaXNwbGF5OiAncG9wdXAnXHJcbiAgICB9LFxyXG4gICAgc2NvcGU6IFsnZW1haWwnXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1ODAsIGhlaWdodDogNDAwIH1cclxuICB9LFxyXG4gIGdvb2dsZToge1xyXG4gICAgbmFtZTogJ2dvb2dsZScsXHJcbiAgICB1cmw6ICcvYXV0aC9nb29nbGUnLFxyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgnLFxyXG4gICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICBkaXNwbGF5OiAncG9wdXAnLFxyXG4gICAgICBwcm9tcHQ6IHVuZGVmaW5lZCxcclxuICAgICAgbG9naW5faGludDogdW5kZWZpbmVkLFxyXG4gICAgICBhY2Nlc3NfdHlwZTogdW5kZWZpbmVkLFxyXG4gICAgICBpbmNsdWRlX2dyYW50ZWRfc2NvcGVzOiB1bmRlZmluZWQsXHJcbiAgICAgICdvcGVuaWQucmVhbG0nOiB1bmRlZmluZWQsXHJcbiAgICAgIGhkOiB1bmRlZmluZWRcclxuICAgIH0sXHJcbiAgICBzY29wZTogWydvcGVuaWQnLCAncHJvZmlsZScsICdlbWFpbCddLFxyXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ1MiwgaGVpZ2h0OiA2MzMgfSxcclxuICAgIHN0YXRlOiAoKSA9PlxyXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoXHJcbiAgICAgICAgTWF0aC5yYW5kb20oKVxyXG4gICAgICAgICAgLnRvU3RyaW5nKDM2KVxyXG4gICAgICAgICAgLnN1YnN0cigyKVxyXG4gICAgICApXHJcbiAgfSxcclxuICBnaXRodWI6IHtcclxuICAgIG5hbWU6ICdnaXRodWInLFxyXG4gICAgdXJsOiAnL2F1dGgvZ2l0aHViJyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9sb2dpbi9vYXV0aC9hdXRob3JpemUnLFxyXG4gICAgc2NvcGU6IFsndXNlcjplbWFpbCddLFxyXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDEwMjAsIGhlaWdodDogNjE4IH1cclxuICB9LFxyXG4gIGluc3RhZ3JhbToge1xyXG4gICAgbmFtZTogJ2luc3RhZ3JhbScsXHJcbiAgICB1cmw6ICcvYXV0aC9pbnN0YWdyYW0nLFxyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkuaW5zdGFncmFtLmNvbS9vYXV0aC9hdXRob3JpemUnLFxyXG4gICAgc2NvcGU6IFsnYmFzaWMnXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnKycsXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnXHJcbiAgfSxcclxuICBsaW5rZWRpbjoge1xyXG4gICAgbmFtZTogJ2xpbmtlZGluJyxcclxuICAgIHVybDogJy9hdXRoL2xpbmtlZGluJyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS91YXMvb2F1dGgyL2F1dGhvcml6YXRpb24nLFxyXG4gICAgc2NvcGU6IFsncl9lbWFpbGFkZHJlc3MnXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MjcsIGhlaWdodDogNTgyIH0sXHJcbiAgICBzdGF0ZTogJ1NUQVRFJ1xyXG4gIH0sXHJcbiAgdHdpdHRlcjoge1xyXG4gICAgbmFtZTogJ3R3aXR0ZXInLFxyXG4gICAgdXJsOiAnL2F1dGgvdHdpdHRlcicsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS50d2l0dGVyLmNvbS9vYXV0aC9hdXRoZW50aWNhdGUnLFxyXG4gICAgb2F1dGhUeXBlOiAnMS4wJyxcclxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNDk1LCBoZWlnaHQ6IDY0NSB9XHJcbiAgfSxcclxuICB0d2l0Y2g6IHtcclxuICAgIG5hbWU6ICd0d2l0Y2gnLFxyXG4gICAgdXJsOiAnL2F1dGgvdHdpdGNoJyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLnR3aXRjaC50di9rcmFrZW4vb2F1dGgyL2F1dGhvcml6ZScsXHJcbiAgICBzY29wZTogWyd1c2VyX3JlYWQnXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgIGRpc3BsYXk6ICdwb3B1cCdcclxuICAgIH0sXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTYwIH1cclxuICB9LFxyXG4gIGxpdmU6IHtcclxuICAgIG5hbWU6ICdsaXZlJyxcclxuICAgIHVybDogJy9hdXRoL2xpdmUnLFxyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9sb2dpbi5saXZlLmNvbS9vYXV0aDIwX2F1dGhvcml6ZS5zcmYnLFxyXG4gICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICBkaXNwbGF5OiAncG9wdXAnXHJcbiAgICB9LFxyXG4gICAgc2NvcGU6IFsnd2wuZW1haWxzJ10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDU2MCB9XHJcbiAgfSxcclxuICB5YWhvbzoge1xyXG4gICAgbmFtZTogJ3lhaG9vJyxcclxuICAgIHVybDogJy9hdXRoL3lhaG9vJyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLmxvZ2luLnlhaG9vLmNvbS9vYXV0aDIvcmVxdWVzdF9hdXRoJyxcclxuICAgIHNjb3BlOiBbXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1NTksIGhlaWdodDogNTE5IH1cclxuICB9LFxyXG4gIGJpdGJ1Y2tldDoge1xyXG4gICAgbmFtZTogJ2JpdGJ1Y2tldCcsXHJcbiAgICB1cmw6ICcvYXV0aC9iaXRidWNrZXQnLFxyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9iaXRidWNrZXQub3JnL3NpdGUvb2F1dGgyL2F1dGhvcml6ZScsXHJcbiAgICByZWRpcmVjdFVyaTogYCR7Z2V0V2luZG93T3JpZ2luKCl9L2AsXHJcbiAgICBzY29wZTogWydlbWFpbCddLFxyXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDEwMjgsIGhlaWdodDogNTI5IH1cclxuICB9LFxyXG4gIHNwb3RpZnk6IHtcclxuICAgIG5hbWU6ICdzcG90aWZ5JyxcclxuICAgIHVybDogJy9hdXRoL3Nwb3RpZnknLFxyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5zcG90aWZ5LmNvbS9hdXRob3JpemUnLFxyXG4gICAgc2NvcGU6IFsnJywgJ3VzZXItcmVhZC1lbWFpbCddLFxyXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1MzAgfSxcclxuICAgIHN0YXRlOiAoKSA9PlxyXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoXHJcbiAgICAgICAgTWF0aC5yYW5kb20oKVxyXG4gICAgICAgICAgLnRvU3RyaW5nKDM2KVxyXG4gICAgICAgICAgLnN1YnN0cigyKVxyXG4gICAgICApXHJcbiAgfVxyXG59O1xyXG4iXX0=