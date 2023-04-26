import {
  useCreateUserServerStateStore,
  useFetchProfileServerStateStore,
  useFetchUserRolesServerStateStore,
  useFetchUsersServerStateStore,
  useUpdateUserServerStateStore,
} from '@src/react/hooks/state/server/useUserServerStateStore';
import { UserSessionStateManager } from '@src/state/client/UserSessionStateManager';
import * as UserServerStateManager from '@src/state/server/UserServerStateManager';
import { MOCK_USER_ROLES_NO_ADMIN } from '@src/tests/mocks/mockUserRoleServiceResponses';
import {
  mockCreateUserResponseData,
  mockFetchProfileResponseDate,
  mockFetchUsersResponseData,
  mockUpdateUserResponseData,
} from '@src/tests/mocks/mockUserServiceResponses';
import { QueryClientWrapper } from '@src/tests/utils';
import { renderHook, waitFor } from '@testing-library/react';
import * as React from 'react';

describe('useUserServerStateStore tests', () => {
  beforeEach(() => {
    UserSessionStateManager.currentState().setAuthenticatedWithRoles(mockFetchProfileResponseDate);
    jest.resetModules();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    UserSessionStateManager.resetToNew();
  });

  const fetchUsers = async () => {
    const fetchUsers = jest.spyOn(UserServerStateManager, 'fetchUsers');
    fetchUsers.mockImplementation(
      () =>
        ({
          ...jest.requireActual('@src/state/server/UserServerStateManager').fetchUserRoles({ enabled: true }),
          queryFn: () => Promise.resolve(mockFetchUsersResponseData),
        } as any)
    );
    const { result } = renderHook(() => useFetchUsersServerStateStore(), {
      wrapper: QueryClientWrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    return result.current;
  };

  test('if useFetchUsersServerStateStore() works correctly', async () => {
    const { data } = await fetchUsers();

    expect(data).toEqual(mockFetchUsersResponseData);
  });

  test('if useFetchUserRolesServerStateStore() works correctly', async () => {
    const fetchUserRoles = jest.spyOn(UserServerStateManager, 'fetchUserRoles');
    fetchUserRoles.mockImplementation(
      () =>
        ({
          ...jest.requireActual('@src/state/server/UserServerStateManager').fetchUserRoles({ enabled: true }),
          queryFn: () => Promise.resolve(MOCK_USER_ROLES_NO_ADMIN),
        } as any)
    );
    const { result } = renderHook(() => useFetchUserRolesServerStateStore(), { wrapper: QueryClientWrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(await result.current.data).toEqual(MOCK_USER_ROLES_NO_ADMIN);
  });

  test('if useFetchProfileServerStateStore() works correctly', async () => {
    const fetchUserRoles = jest.spyOn(UserServerStateManager, 'fetchProfile');
    fetchUserRoles.mockImplementation(
      () =>
        ({
          ...jest.requireActual('@src/state/server/UserServerStateManager').fetchProfile({ enabled: true }),
          queryFn: () => Promise.resolve(mockFetchProfileResponseDate),
        } as any)
    );
    const { result } = renderHook(() => useFetchProfileServerStateStore(), { wrapper: QueryClientWrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(await result.current.data).toEqual(mockFetchProfileResponseDate);
  });

  test('if useUpdateUserServerStateStore() works correctly', async () => {
    const fetchUserRoles = jest.spyOn(UserServerStateManager, 'createUser');
    fetchUserRoles.mockImplementation(
      () =>
        ({
          ...jest.requireActual('@src/state/server/UserServerStateManager').createUser({ enabled: true }),
          mutationFn: () => Promise.resolve(mockUpdateUserResponseData),
        } as any)
    );
    const { result } = renderHook(() => useUpdateUserServerStateStore(), {
      wrapper: QueryClientWrapper,
    });
    expect(await result.current.mutate).toBeDefined();
  });

  test('if useCreateUserServerStateStore() works correctly', async () => {
    const fetchUserRoles = jest.spyOn(UserServerStateManager, 'updateUser');
    fetchUserRoles.mockImplementation(
      () =>
        ({
          ...jest.requireActual('@src/state/server/UserServerStateManager').updateUser({ enabled: true }),
          mutationFn: () => mockCreateUserResponseData,
        } as any)
    );
    const { result } = renderHook(() => useCreateUserServerStateStore(), {
      wrapper: QueryClientWrapper,
    });
    expect(await result.current.mutate).toBeDefined();
  });
});
