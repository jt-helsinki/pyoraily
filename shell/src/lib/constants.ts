/*
 *
 * MIT License.
 *
 */
import * as Env from '@src/config/Env';

export enum AUTH {
  TOKEN = 'ID_TOKEN',
  USER = 'USER',
}

export const LOGIN_URL = `${Env.AUTH_DOMAIN}/authorize?response_type=code&client_id=${
  Env.AUTH_CLIENT_ID
}&redirect_uri=${encodeURIComponent(Env.REACT_APP_DOMAIN || '')}/auth/callback&scope=openid%20profile%20email`;

export const LOGOUT_URL = `${Env.AUTH_DOMAIN}/v2/logout?client_id=${Env.AUTH_CLIENT_ID}`;
