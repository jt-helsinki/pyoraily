/*
 *
 * MIT License.
 *
 */
import { User } from 'pyoraily-shared-frontend/model/User';
import * as Api from '@src/services/api/Api';
import { handleError } from '@src/services/api/errorHandler';

/**
 * Fetch logged in user profile
 */
export const fetchProfile = (): Promise<User> =>
  Api.httpGet<User>('user-manager/users/me')
    .then((response) => response.data)
    .catch(handleError);

/**
 * Update an existing user
 */
export const updateProfile = (user: Partial<User>): Promise<User> =>
  Api.httpPatch<User>('user-manager/users/me', user)
    .then((response) => response.data)
    .catch(handleError);

/**
 * Fetch users list
 */
export const fetchUsers = (): Promise<User[]> =>
  Api.httpGet<User[]>('user-manager/users')
    .then((response) => response.data)
    .catch(handleError);

/**
 * Create a new user
 */
export const createUser = (user: User): Promise<User> =>
  Api.httpPost<User>('user-manager/users', user)
    .then((response) => response.data)
    .catch(handleError);

/**
 * Update an existing user
 */
export const updateUser = (id: string, user: Partial<User>): Promise<User> =>
  Api.httpPatch<User>(`user-manager/users/${id}`, user)
    .then((response) => response.data)
    .catch(handleError);
