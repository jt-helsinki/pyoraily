/*
 *
 * MIT License.
 *
 */
import * as UserUtils from 'pyoraily-shared-frontend/utils/UserUtils';
import { User } from 'pyoraily-shared-frontend/model/User';
import { AbstractStateManager } from 'pyoraily-shared-frontend/state/client/AbstractStateManager';
import { UserSessionState } from '@src/state/client/state/UserSessionState';

class StateManager extends AbstractStateManager<UserSessionState> {
  constructor() {
    super('USER_SESSION_STATE_STORE', true, false);
  }

  protected setInitialState(set: (setFunction: (partial: UserSessionState) => void) => any): UserSessionState {
    return {
      authenticated: false,
      isAdmin: false,
      userRoles: [],
      setUnauthenticated: (): void => {
        // prefer to use setAuthenticatedWithRoles() when setting up the user's current session.
        // Generally, use this for logout.
        set((draftState: UserSessionState) => {
          draftState.authenticated = false;
          draftState.userRoles = [];
          draftState.isAdmin = false;
        });
      },
      setAuthenticatedWithRoles: (user: User): void => {
        set((draftState: UserSessionState) => {
          const authenticated = !!user;
          const selectedUserRoles = authenticated ? user.userRoles : [];
          draftState.authenticated = authenticated;
          draftState.userRoles = selectedUserRoles;
          draftState.isAdmin = UserUtils.isAdminUser(selectedUserRoles);
        });
      },
    };
  }
}

export const UserSessionStateManager = new StateManager();
