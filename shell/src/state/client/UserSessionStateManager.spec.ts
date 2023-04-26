import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import { UserSessionState } from '@src/state/client/state/UserSessionState';
import { UserSessionStateManager } from '@src/state/client/UserSessionStateManager';
import { MOCK_USER_ROLES_NO_ADMIN } from '@src/tests/mocks/mockUserRoleServiceResponses';
import { mockFetchProfileResponseDate } from '@src/tests/mocks/mockUserServiceResponses';

describe('UserSessionStateManager tests', () => {
  beforeEach(() => {
    UserSessionStateManager.resetToNew();
  });

  test('if the state is setup correctly', () => {
    const userSessionState: UserSessionState = UserSessionStateManager.currentState();

    userSessionState.setAuthenticatedWithRoles(mockFetchProfileResponseDate);
    expect(userSessionState.setAuthenticatedWithRoles instanceof Function).toBeTruthy();
    expect(userSessionState.userRoles).toHaveLength(0);
    expect(userSessionState.authenticated).toEqual(false);

    const userSessionState1: UserSessionState = UserSessionStateManager.currentState();
    const userRoles1: UserRole[] = userSessionState1.userRoles;

    expect(userRoles1).toEqual(MOCK_USER_ROLES_NO_ADMIN);
    expect(userSessionState1.userRoles).toHaveLength(3);
    expect(userSessionState1.authenticated).toEqual(true);
  });

  test('if the authenticated state is modified correctly', () => {
    const userSessionState: UserSessionState = UserSessionStateManager.currentState();
    userSessionState.setAuthenticatedWithRoles(mockFetchProfileResponseDate);

    const userSessionState1: UserSessionState = UserSessionStateManager.currentState();
    const userRoles1: UserRole[] = userSessionState1.userRoles;

    expect(userRoles1).toEqual(MOCK_USER_ROLES_NO_ADMIN);
    expect(userSessionState1.userRoles).toHaveLength(3);
    userSessionState1.setUnauthenticated();

    const userSessionState2: UserSessionState = UserSessionStateManager.currentState();
    expect(userSessionState2.userRoles).toHaveLength(0);
    expect(userSessionState2.authenticated).toEqual(false);
  });
});
