/*
 *
 * MIT License.
 *
 */
import * as StringUtils from 'pyoraily-shared-frontend/utils/StringUtils';

export const REACT_APP_ATHLETE_MANAGER_DOMAIN: string = StringUtils.removeTrailingSlash(
  process.env.REACT_APP_ATHLETE_MANAGER_MS_DOMAIN || 'http://localhost:5001'
);

export const NODE_ENV: 'production' | 'test' | 'development' = process.env.NODE_ENV || ('development' as any);
