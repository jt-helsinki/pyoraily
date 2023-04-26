import * as Api from '@src/services/api/Api';
import * as UserService from '@src/services/UserService';
import {
  mockCreateUserRequestData,
  mockCreateUserResponseData,
  mockFetchProfileResponseDate,
  mockFetchUsersResponseData,
  mockUpdateUserRequestData,
  mockUpdateUserResponseData,
} from '@src/tests/mocks/mockUserServiceResponses';

describe('UserService tests', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  test('if fetchProfile() works correctly', async () => {
    const responseData = mockFetchProfileResponseDate;
    const httpPost = jest.spyOn(Api, 'httpGet');
    httpPost.mockImplementation(
      () =>
        Promise.resolve({
          status: 200,
          data: responseData,
        }) as any
    );
    const userRolesResponse = await UserService.fetchProfile();
    expect(httpPost).toBeCalledWith('/users/me');
    expect(httpPost).toBeCalledTimes(1);
    expect(userRolesResponse).toEqual(responseData);
  });

  test('if fetchUsers() works correctly', async () => {
    const responseData = mockFetchUsersResponseData;
    const httpPost = jest.spyOn(Api, 'httpGet');
    httpPost.mockImplementation(
      () =>
        Promise.resolve({
          status: 200,
          data: responseData,
        }) as any
    );
    const userRolesResponse = await UserService.fetchUsers();
    expect(httpPost).toBeCalledWith(`/users`);
    expect(httpPost).toBeCalledTimes(1);
    expect(userRolesResponse).toEqual(responseData);
  });

  test('if createUser() works correctly', async () => {
    const requestData = mockCreateUserRequestData;
    const responseData = mockCreateUserResponseData;
    const httpPost = jest.spyOn(Api, 'httpPost');
    httpPost.mockImplementation(
      () =>
        Promise.resolve({
          status: 201,
          data: responseData,
        }) as any
    );

    const userRolesResponse = await UserService.createUser(requestData);
    expect(httpPost).toBeCalledWith('/users', requestData);
    expect(httpPost).toBeCalledTimes(1);
    expect(userRolesResponse).toEqual(responseData);
  });

  test('if updateUser() works correctly', async () => {
    const requestData = mockUpdateUserRequestData;
    const responseData = mockUpdateUserResponseData;
    const httpPatch = jest.spyOn(Api, 'httpPatch');
    httpPatch.mockImplementation(
      () =>
        Promise.resolve({
          status: 200,
          data: responseData,
        }) as any
    );

    const userRolesResponse = await UserService.updateUser('auth0|634fa3a6305f8dc31e16378b', requestData);
    expect(httpPatch).toBeCalledWith(`/users/auth0|634fa3a6305f8dc31e16378b`, requestData);
    expect(httpPatch).toBeCalledTimes(1);
    expect(userRolesResponse).toEqual(responseData);
  });
});
