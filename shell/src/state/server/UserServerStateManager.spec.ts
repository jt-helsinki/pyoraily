import * as UserRoleService from '@src/services/UserRoleService';
import * as UserService from '@src/services/UserService';
import * as UserServerStateManager from '@src/state/server/UserServerStateManager';

jest.mock('@src/services/UserService');
jest.mock('@src/services/UserRoleService');

describe('UserServerStateManager tests', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  test('if fetchUsers() works correctly', async () => {
    const serviceFn = jest.spyOn(UserService, 'fetchUsers');
    const fetchUsers: any = UserServerStateManager.fetchUsers({
      enabled: false,
    });
    fetchUsers.queryFn();
    expect(fetchUsers).toBeDefined();
    expect(fetchUsers.enabled).toBeDefined();
    expect(fetchUsers.enabled).toEqual(false);
    expect(fetchUsers.queryFn).toBeDefined();
    expect(serviceFn).toBeCalledTimes(1);
    expect(fetchUsers.queryKey).toBeDefined();
  });

  test('if fetchProfile() works correctly', async () => {
    const serviceFn = jest.spyOn(UserService, 'fetchProfile');
    const fetchProfile: any = UserServerStateManager.fetchProfile({ enabled: false });
    fetchProfile.queryFn();
    expect(fetchProfile).toBeDefined();
    expect(fetchProfile.enabled).toBeDefined();
    expect(fetchProfile.enabled).toEqual(false);
    expect(fetchProfile.queryFn).toBeDefined();
    expect(serviceFn).toBeCalledTimes(1);
    expect(fetchProfile.queryKey).toBeDefined();
  });

  test('if fetchUserRoles() works correctly', async () => {
    const serviceFn = jest.spyOn(UserRoleService, 'fetchUserRoles');
    const fetchUserRoles: any = UserServerStateManager.fetchUserRoles({ enabled: false });
    fetchUserRoles.queryFn();
    expect(fetchUserRoles).toBeDefined();
    expect(fetchUserRoles.enabled).toBeDefined();
    expect(fetchUserRoles.enabled).toEqual(false);
    expect(fetchUserRoles.queryFn).toBeDefined();
    expect(serviceFn).toBeCalledTimes(1);
    expect(fetchUserRoles.queryKey).toBeDefined();
  });

  test('if createUser() works correctly', async () => {
    const serviceFn = jest.spyOn(UserService, 'createUser');
    const createUser = UserServerStateManager.createUser();
    createUser.mutationFn({} as any);
    expect(createUser).toBeDefined();
    expect(createUser.mutationFn).toBeDefined();
    expect(serviceFn).toBeCalledTimes(1);
    expect((createUser as any).queryFn).toBeUndefined();
    expect((createUser as any).queryKey).toBeUndefined();
  });

  test('if updateUser() works correctly', async () => {
    const serviceFn = jest.spyOn(UserService, 'updateUser');
    const updateUser = UserServerStateManager.updateUser();
    updateUser.mutationFn({ id: 'id', blocked: false, email: '', name: '', roles: [] } as any);
    expect(updateUser).toBeDefined();
    expect(updateUser.mutationFn).toBeDefined();
    expect(serviceFn).toBeCalledTimes(1);
    expect((updateUser as any).queryFn).toBeUndefined();
    expect((updateUser as any).queryKey).toBeUndefined();
  });
});
