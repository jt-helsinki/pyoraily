/*
 *
 * MIT License.
 *
 */
import * as NavUtils from '@src/lib/NavUtils';
import * as StringUtils from 'pyoraily-shared-frontend/utils/StringUtils';
import { User } from 'pyoraily-shared-frontend/model/User';
import { NotificationKey } from '@src/react/types/NotificationKey';
import * as Api from '@src/services/api/Api';
import * as UiService from '@src/services/UiService';
import { UiStateManager } from '@src/state/client/UiStateManager';
import { UserSessionStateManager } from '@src/state/client/UserSessionStateManager';
import { ServerState } from '@src/state/server/ServerState';
import { AxiosError } from 'axios';

export const clearUser = (): void => {
  UserSessionStateManager.currentState().setUnauthenticated();
  UiStateManager.resetToNew();
  ServerState.clear();
};

export const initLogin = (returnTo = '/'): void => {
  clearUser();
  NavUtils.navigateToAuthLogin(returnTo);
};

/**
 * Clear locally stored user and logout auth0 user
 *
 * @param returnToPath redirected url after logout
 */
export const authSignOut = (returnToPath?: string): void => {
  clearUser();
  NavUtils.navigateToAuthLogout(returnToPath);
};

export const signOut = async (returnToPath?: string): Promise<void> => {
  const response = await Api.httpPost('user-manager/auth/logout', {});

  if (response?.status === 200 || response?.status === 201) {
    authSignOut(returnToPath);
  }
};

export const signIn = async (user: User): Promise<void> => {
  UserSessionStateManager.currentState().setAuthenticatedWithRoles(user);
};

// eslint-disable-next-line class-methods-use-this
export const exchangeTokenToJWT = async (jwtToken: string, urlState: string): Promise<{ user: User }> => {
  try {
    const response = await Api.httpPost<{ user: User }>('user-manager/auth/authorize', {
      code: jwtToken,
      state: urlState,
    });
    return response.data;
  } catch (err) {
    throw new Error('Bad Request');
  }
};

/**
 * Will try to sign in a user based on the response data from Auth0
 * @param {string} jwtToken
 * @param {string} urlState
 * @param {string} error
 * @param {string} errorDescription
 * @return {Promise<boolean>} true if OK. false if there is an error.
 */
export const iamProviderCallback = async (
  jwtToken: string,
  urlState: string,
  error: string,
  errorDescription: string
): Promise<boolean> => {
  if (error.length && errorDescription.length) {
    UiService.notificationToasterError(
      NotificationKey.AUTH0_ERROR_DESCRIPTION,
      StringUtils.stringToSentenceCase(errorDescription),
      false
    );
    return false;
  }
  if (!jwtToken.length) {
    UiService.notificationToasterError(NotificationKey.NO_CODE_JWT_CODE, 'No code to exchange for JWT');
    return false;
  }

  const response = await exchangeTokenToJWT(jwtToken, urlState).catch((err: AxiosError) => {
    UiService.notificationToasterError(
      NotificationKey.TOKEN_EXHCHANGE_FAILURE_ERROR,
      StringUtils.stringToSentenceCase(err.name)
    );
  });

  if (response?.user) {
    // Sign in will set the user => change of state => rerender CallbackPage
    await signIn(response.user);
    return true;
  }
  UiService.notificationToasterError(NotificationKey.TOKEN_EXCHANGE_FAILURE, 'Failed to exchange token');
  return false;
};

/**
 * Send a Request with auth token to the server in order to receive a response with a status code.
 *
 *
 */
export const pingSession = (): void => {
  Api.httpGet('user-manager/ping-session', {});
};
