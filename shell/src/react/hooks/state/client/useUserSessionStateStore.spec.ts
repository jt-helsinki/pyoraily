import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import {
  useCanUserAccessResource,
  useUserRolesFromUseUserSessionStateStore,
  useUserSessionStateStore,
} from '@src/react/hooks/state/client/useUserSessionStateStore';
import { UserSessionState } from '@src/state/client/state/UserSessionState';
import { UserSessionStateManager } from '@src/state/client/UserSessionStateManager';
import { MOCK_USER_ROLES_NO_ADMIN } from '@src/tests/mocks/mockUserRoleServiceResponses';
import { mockFetchProfileResponseDate } from '@src/tests/mocks/mockUserServiceResponses';
import { renderHook } from '@testing-library/react';

describe('useUserSessionStateStore tests', () => {
  beforeEach(() => {
    UserSessionStateManager.resetToNew();
  });

  test('if the state is setup correctly', () => {
    const authenticated: Partial<UserSessionState> = renderHook(() => useUserSessionStateStore('authenticated')).result
      .current;
    expect(authenticated).toBeDefined();
    expect(authenticated).toEqual(false);

    const setAuthenticatedWithRoles: Partial<UserSessionState> = renderHook(() =>
      useUserSessionStateStore('setAuthenticatedWithRoles')
    ).result.current;
    expect(setAuthenticatedWithRoles).toBeDefined();
    expect(setAuthenticatedWithRoles instanceof Function).toBeTruthy();

    const setUnauthenticated: Partial<UserSessionState> = renderHook(() =>
      useUserSessionStateStore('setUnauthenticated')
    ).result.current;
    expect(setUnauthenticated).toBeDefined();
    expect(setUnauthenticated instanceof Function).toBeTruthy();
  });

  test('if the useUserRolesFromUseUserSessionStateStore() returns the correct full name', () => {
    const userSessionState: UserSessionState = UserSessionStateManager.currentState();
    userSessionState.setAuthenticatedWithRoles(mockFetchProfileResponseDate);
    expect(userSessionState).toBeDefined();
    expect(userSessionState.userRoles).toHaveLength(0);

    expect(UserSessionStateManager.currentState().userRoles).toEqual(MOCK_USER_ROLES_NO_ADMIN);
    expect(UserSessionStateManager.currentState().userRoles).toHaveLength(3);

    const userRoles: UserRole[] = renderHook(() => useUserRolesFromUseUserSessionStateStore()).result.current;
    expect(userRoles.length).toEqual(MOCK_USER_ROLES_NO_ADMIN.length);
    expect(userRoles).toEqual(MOCK_USER_ROLES_NO_ADMIN);
    expect(userRoles).toEqual(UserSessionStateManager.currentState().userRoles);
    expect(userRoles).toHaveLength(3);
  });

  test('if the useCanUserAccessResource() returns the correct full name', () => {
    const userSessionState: UserSessionState = UserSessionStateManager.currentState();
    userSessionState.setAuthenticatedWithRoles(mockFetchProfileResponseDate);
    expect(userSessionState).toBeDefined();
    expect(userSessionState.userRoles).toHaveLength(0);

    expect(UserSessionStateManager.currentState().userRoles).toEqual(MOCK_USER_ROLES_NO_ADMIN);
    expect(UserSessionStateManager.currentState().userRoles).toHaveLength(3);

    const canAccess: boolean = renderHook(() => useCanUserAccessResource([UserRole.ATHLETE])).result.current;
    const canAccess1: boolean = renderHook(() => useCanUserAccessResource(UserRole.HPY)).result.current;
    const canAccess2: boolean = renderHook(() => useCanUserAccessResource([UserRole.SP, UserRole.ADMIN])).result
      .current;
    const noAccess: boolean = renderHook(() => useCanUserAccessResource([UserRole.ADMIN])).result.current;
    const noAccess1: boolean = renderHook(() => useCanUserAccessResource(UserRole.ADMIN)).result.current;
    expect(canAccess).toEqual(true);
    expect(canAccess1).toEqual(true);
    expect(canAccess2).toEqual(true);
    expect(noAccess).toEqual(false);
    expect(noAccess1).toEqual(false);
  });
});
