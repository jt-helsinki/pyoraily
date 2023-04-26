/*
 *
 * MIT License.
 *
 */
import { Auth0User } from 'pyoraily-shared-backend/model/auth0/Auth0User';
import { AuthorizeResponse } from 'pyoraily-shared-backend/model/auth0/AuthorizeResponse';

export interface AuthDao {
  authorize(code: string, state: string): Promise<AuthorizeResponse>;
  getUser(id: string): Promise<Auth0User>;
  getUsers(): Promise<Auth0User[]>;
  blockUser(id: string): Promise<Auth0User>;
  unblockUser(id: string): Promise<Auth0User>;
  updateUser(id: string, user: Partial<Auth0User>): Promise<Auth0User>;
}

export const AuthDao = Symbol('AuthDao');
