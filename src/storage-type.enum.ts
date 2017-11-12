// ngc (Tsickle) doesn't support typescript 2.4 string enums in libraries yet, using consts as a workarount
export const NONE = 'none';
export const MEMORY = 'memory';
export const LOCAL_STORAGE = 'localStorage';
export const SESSION_STORAGE = 'sessionStorage';
export const COOKIE = 'cookie';
export const SESSION_COOKIE = 'sessionCookie';

export type StorageType = typeof NONE | typeof MEMORY
    | typeof LOCAL_STORAGE | typeof SESSION_STORAGE
    | typeof COOKIE | typeof SESSION_COOKIE;
