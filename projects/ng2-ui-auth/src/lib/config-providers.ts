import { getWindowOrigin } from './utils';

export const facebook = {
  name: 'facebook',
  url: '/auth/facebook',
  redirectUri: `${getWindowOrigin()}/`,
  authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
  additionalUrlParams: {
    display: 'popup'
  },
  scope: ['email'],
  scopeDelimiter: ',',
  oauthType: '2.0',
  popupOptions: { width: 580, height: 400 }
};
export const google = {
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
  state: () =>
    encodeURIComponent(
      Math.random()
        .toString(36)
        .substr(2)
    )
};
export const github = {
  name: 'github',
  url: '/auth/github',
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  scope: ['user:email'],
  scopeDelimiter: ' ',
  oauthType: '2.0',
  popupOptions: { width: 1020, height: 618 }
};
export const instagram = {
  name: 'instagram',
  url: '/auth/instagram',
  authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
  scope: ['basic'],
  scopeDelimiter: '+',
  oauthType: '2.0'
};
export const linkedin = {
  name: 'linkedin',
  url: '/auth/linkedin',
  authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
  scope: ['r_emailaddress'],
  scopeDelimiter: ' ',
  oauthType: '2.0',
  popupOptions: { width: 527, height: 582 },
  state: 'STATE'
};
export const twitter = {
  name: 'twitter',
  url: '/auth/twitter',
  authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
  oauthType: '1.0',
  popupOptions: { width: 495, height: 645 }
};
export const twitch = {
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
};
export const live = {
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
};
export const yahoo = {
  name: 'yahoo',
  url: '/auth/yahoo',
  authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
  scope: [],
  scopeDelimiter: ',',
  oauthType: '2.0',
  popupOptions: { width: 559, height: 519 }
};
export const bitbucket = {
  name: 'bitbucket',
  url: '/auth/bitbucket',
  authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
  redirectUri: `${getWindowOrigin()}/`,
  scope: ['email'],
  scopeDelimiter: ',',
  oauthType: '2.0',
  popupOptions: { width: 1028, height: 529 }
};
export const spotify = {
  name: 'spotify',
  url: '/auth/spotify',
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  scope: ['', 'user-read-email'],
  scopeDelimiter: ',',
  oauthType: '2.0',
  popupOptions: { width: 500, height: 530 },
  state: () =>
    encodeURIComponent(
      Math.random()
        .toString(36)
        .substr(2)
    )
};
