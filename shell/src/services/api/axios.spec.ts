import * as Env from '@src/config/Env';
import * as LoginService from '@src/services/LoginService';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as Api from './Api';

describe('AxiosInterceptor Tests', (): void => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  test('response interceptor with 401', async () => {
    mock.onAny('/test').replyOnce(() => {
      return [401, {}];
    });
    const mockAuthSignOut = jest.spyOn(LoginService, 'authSignOut').mockImplementation(() => {});
    Api.httpGet('/test').catch(() => {
      expect(mockAuthSignOut).toHaveBeenCalledWith(Env.REACT_APP_LOGOUT_DESTINATION);
    });
  });
});
