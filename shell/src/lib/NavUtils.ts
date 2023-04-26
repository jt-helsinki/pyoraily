/*
 *
 * MIT License.
 *
 */
import * as Env from '@src/config/Env';
import * as Constants from '@src/lib/constants';

/**
 * Builds a login URL and navigates the window to it.
 * @param returnTo A path on our domain to return to from the external site.
 */
export const navigateToAuthLogin = (returnTo?: string): void => {
  const returnToUrl = returnTo || window.location.pathname;
  const url = `${Constants.LOGIN_URL}&state=${encodeURIComponent(returnToUrl)}`;
  window.location.replace(url);
};

/**
 * Builds a logout URL and navigates the window to it
 * @param returnTo A path on our domain to return to from the external site.
 */
export const navigateToAuthLogout = (returnTo?: string): void => {
  const returnToUrl = returnTo || `${Env.REACT_APP_DOMAIN}/login`;
  const url = `${Constants.LOGOUT_URL}&returnTo=${encodeURIComponent(returnToUrl)}`;
  window.location.replace(url);
};
