/*
 *
 * MIT License.
 *
 */
import { User } from 'pyoraily-shared-frontend/model/User';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import { State } from 'pyoraily-shared-frontend/state/client/state/State';

export interface UserSessionState extends State {
  authenticated: boolean;

  isAdmin: boolean;

  userRoles: UserRole[];

  setUnauthenticated: () => void;

  setAuthenticatedWithRoles: (user: User) => void;
}
