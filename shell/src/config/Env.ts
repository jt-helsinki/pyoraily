/*
 *
 * MIT License.
 *
 */
import * as StringUtils from 'pyoraily-shared-frontend/utils/StringUtils';
import * as RootRoutePaths from '@src/react/routes/RootRoutePaths';

export const REACT_APP_USER_DOMAIN: string = StringUtils.removeTrailingSlash(
  process.env.REACT_APP_USER_MS_DOMAIN || 'http://localhost:5000'
);

export const REACT_APP_ATHLETE_MANAGER_REMOTE_DOMAIN: string = StringUtils.removeTrailingSlash(
  process.env.REACT_APP_ATHLETE_MANAGER_REMOTE_DOMAIN || 'http://localhost:3003/remoteEntry.js'
);

export const REACT_APP_HPY_MANAGER_REMOTE_DOMAIN: string = StringUtils.removeTrailingSlash(
  process.env.REACT_APP_HPY_MANAGER_REMOTE_DOMAIN || 'http://localhost:3004/remoteEntry.js'
);

export const AUTH_CLIENT_ID: string = process.env.REACT_APP_AUTH_CLIENT_ID || '';

export const AUTH_DOMAIN: string = StringUtils.removeTrailingSlash(process.env.REACT_APP_AUTH_DOMAIN || '');

export const REACT_APP_DOMAIN: string = StringUtils.removeTrailingSlash(
  process.env.REACT_APP_DOMAIN || 'http://localhost:3000'
);

export const REACT_APP_LOGOUT_DESTINATION: string = StringUtils.removeTrailingSlash(
  process.env.REACT_APP_LOGOUT_DESTINATION || `http://localhost:3000${RootRoutePaths.ROOT_ROUTE_PATHS.login}`
);

// export const REACT_APP_DASHBOARD_REMOTE_DOMAIN: string = StringUtils.removeTrailingSlash(
//   process.env.REACT_APP_DASHBOARD_REMOTE_DOMAIN || 'http://localhost:3001/remoteEntry.js'
// );

export const NODE_ENV: 'production' | 'test' | 'development' = process.env.NODE_ENV || 'development';
