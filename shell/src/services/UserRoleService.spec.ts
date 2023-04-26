import * as Api from '@src/services/api/Api';
import * as UserRoleService from '@src/services/UserRoleService';
import { MOCK_USER_ROLES_NO_ADMIN } from '@src/tests/mocks/mockUserRoleServiceResponses';

describe('UserRoleService tests', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    // @ts-ignore
    jest.resetModules();
    jest.resetAllMocks();
  });

  test('if fetchUserRoles() works correctly', async () => {
    const responseData = MOCK_USER_ROLES_NO_ADMIN;
    const httpPost = jest.spyOn(Api, 'httpGet');
    httpPost.mockImplementation(
      () =>
        Promise.resolve({
          status: 200,
          data: responseData,
        }) as any
    );
    const userRolesResponse = await UserRoleService.fetchUserRoles();
    expect(httpPost).toBeCalledWith(`/user-roles`);
    expect(httpPost).toBeCalledTimes(1);
    expect(userRolesResponse).toEqual(responseData);
  });
});
