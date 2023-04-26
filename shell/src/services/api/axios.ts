/*
 *
 * MIT License.
 *
 */
import * as Env from '@src/config/Env';
import * as LoginService from '@src/services/LoginService';
import axios from 'axios';

axios.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 401) {
    LoginService.authSignOut(Env.REACT_APP_LOGOUT_DESTINATION);
  }
  return Promise.reject(error);
});

export default axios;
