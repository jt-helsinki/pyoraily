/*
 *
 * MIT License.
 *
 */
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import * as Api from '@src/services/api/Api';
import { handleError } from '@src/services/api/errorHandler';

/**
 * Fetch user roles
 */
// eslint-disable-next-line import/prefer-default-export
export const fetchUserRoles = (): Promise<UserRole[]> =>
  Api.httpGet<UserRole[]>('user-manager/user-roles')
    .then((response) => response.data)
    .catch(handleError);
