import { LOGIN_URL } from '@src/lib/constants';
import { GlobalNotification, GlobalNotificationType } from 'pyoraily-shared-frontend/utils/types';
import { NotificationKey } from '@src/react/types/NotificationKey';
import * as Api from '@src/services/api/Api';
import * as LoginService from '@src/services/LoginService';
import { UiStateManager } from '@src/state/client/UiStateManager';
import { UserSessionStateManager } from '@src/state/client/UserSessionStateManager';
import * as UserServerStateManager from '@src/state/server/UserServerStateManager';
import { mockExchangeTokenToJWTResponseData } from '@src/tests/mocks/mockLoginServiceResponses';
import { MOCK_USER_ROLES_NO_ADMIN } from '@src/tests/mocks/mockUserRoleServiceResponses';
import { mockFetchProfileResponseDate } from '@src/tests/mocks/mockUserServiceResponses';
import * as NavUtils from '../lib/NavUtils';

describe('LoginService tests', () => {
  const replaceMock = jest.fn();

  afterAll(() => {
    jest.restoreAllMocks();
    UserSessionStateManager.resetToNew();
    UiStateManager.resetToNew();
  });

  beforeEach(async () => {
    // @ts-ignore
    delete window.location;
    window.location = { replace: replaceMock } as any;
    UserSessionStateManager.resetToNew();
    UiStateManager.resetToNew();
    jest.resetModules();
    jest.resetAllMocks();

    const fetchUserRoles = jest.spyOn(UserServerStateManager, 'fetchUserRoles');
    fetchUserRoles.mockImplementation(
      () =>
        ({
          ...jest.requireActual('@src/state/server/UserServerStateManager').fetchUserRoles({ enabled: true }),
          queryFn: () => Promise.resolve(MOCK_USER_ROLES_NO_ADMIN),
        } as any)
    );

    expect(UserSessionStateManager.currentState().userRoles).toHaveLength(0);
    expect(UserSessionStateManager.currentState().authenticated).toEqual(false);
    await LoginService.signIn(mockFetchProfileResponseDate);
    expect(UserSessionStateManager.currentState().userRoles).toEqual(MOCK_USER_ROLES_NO_ADMIN);
    expect(UserSessionStateManager.currentState().authenticated).toEqual(true);
  });

  test('if signIn() sets the user on the state correctly', async () => {
    await LoginService.signIn(mockFetchProfileResponseDate);
    expect(UserSessionStateManager.currentState().userRoles).toEqual(MOCK_USER_ROLES_NO_ADMIN);
    expect(UserSessionStateManager.currentState().authenticated).toEqual(true);
  });

  test('if clearUser() clears the user on the state correctly', async () => {
    UiStateManager.store().getState().pushNotification({
      id: 'test',
      autoClose: true,
      content: 'content',
      timeout: 0,
      type: GlobalNotificationType.INFO,
    });
    expect(UserSessionStateManager.currentState().userRoles).toEqual(MOCK_USER_ROLES_NO_ADMIN);
    expect(UserSessionStateManager.currentState().authenticated).toEqual(true);

    LoginService.clearUser();
    expect(UserSessionStateManager.currentState().userRoles).toHaveLength(0);
  });

  test('if initLogin() works correctly', async () => {
    const { location } = window;
    LoginService.initLogin('/blah');
    expect(UserSessionStateManager.currentState().userRoles).toHaveLength(0);
    const url = `${LOGIN_URL}&state=${encodeURIComponent('/blah')}`;
    expect(replaceMock).toHaveBeenCalledWith(url);
  });

  test('if iamProviderCallback() works correctly', () => {
    const isOk = LoginService.iamProviderCallback('', '/dashboard', '', '');
    expect(isOk).resolves.toBeFalsy();
    const noJwtMessages = UiStateManager.store()
      .getState()
      .notifications.filter((value: GlobalNotification) => value.id === NotificationKey.NO_CODE_JWT_CODE);
    expect(noJwtMessages).toHaveLength(1);

    const isOk2 = LoginService.iamProviderCallback('', '/dashboard', 'unauthorized', 'user blocked');
    expect(isOk2).resolves.toBeFalsy();
    const noJwtMessages2 = UiStateManager.store()
      .getState()
      .notifications.filter((value: GlobalNotification) => value.id === NotificationKey.AUTH0_ERROR_DESCRIPTION);
    expect(noJwtMessages2).toHaveLength(1);
  });

  test('if signOut() works correctly', async () => {
    const navigateToAuthLogout = jest.spyOn(NavUtils, 'navigateToAuthLogout');
    navigateToAuthLogout.mockImplementation((returnToPath: any): any => {});
    const httpPost = jest.spyOn(Api, 'httpPost');
    httpPost.mockImplementation(
      () =>
        Promise.resolve({
          status: 201,
        }) as any
    );
    await LoginService.signOut('/somepath');
    expect(navigateToAuthLogout).toBeCalledTimes(1);
    expect(navigateToAuthLogout).toBeCalledWith(`/somepath`);
    expect(httpPost).toBeCalledTimes(1);
    expect(httpPost).toBeCalledWith(`/auth/logout`, {});
    expect(UserSessionStateManager.currentState().userRoles).toHaveLength(0);
  });

  test('if exchangeTokenToJWT() works correctly', async () => {
    const responseData = mockExchangeTokenToJWTResponseData;
    const httpPost = jest.spyOn(Api, 'httpPost');
    httpPost.mockImplementation(
      () =>
        Promise.resolve({
          status: 200,
          data: responseData,
        }) as any
    );
    const userResponse = await LoginService.exchangeTokenToJWT(
      'jnv0xZ_2tW2VbE8cb9Q1xkbKYE8ykLCSDyRnwwNM-XkLY',
      '/dashboard'
    );
    expect(httpPost).toBeCalledWith(`/auth/authorize`, {
      code: 'jnv0xZ_2tW2VbE8cb9Q1xkbKYE8ykLCSDyRnwwNM-XkLY',
      state: '/dashboard',
    });
    expect(httpPost).toBeCalledTimes(1);
    expect(userResponse).toEqual(responseData);
  });
});
