/*
 *
 * MIT License.
 *
 */
import { CookieOptions } from 'express';
import { getEnv, getEnvBoolean } from './config';

const getCookieOptions = (JwtSecondsToExpiryInSeconds: number): CookieOptions => {
  return {
    domain: getEnv('COOKIE_DOMAIN'),
    expires: new Date(JwtSecondsToExpiryInSeconds * 1000),
    httpOnly: getEnvBoolean('IS_OFFLINE', false) ? false : true,
    sameSite: getEnvBoolean('IS_OFFLINE', false) ? 'lax' : 'none',
    secure: getEnvBoolean('IS_OFFLINE', false) ? false : true,
  } as CookieOptions;
};

export default getCookieOptions;
