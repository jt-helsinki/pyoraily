/*
 *
 * MIT License.
 *
 */

import { User } from '../model/User';
import { UserRole } from '../model/UserRole';

export const getNameInitials = (name: string): string =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('');

export const getAuth0UserId = (userId: string | null): string | null =>
  // remove domain specific prefix
  userId ? userId.substring(11) : null;

export const isAdminUser = (userRolesFromSessionStte: UserRole[]): boolean =>
  userRolesFromSessionStte.some((userRole) => userRole === UserRole.ADMIN);

export const doUserRolesIntersectRequiredUserRoles = (
  userRoles: UserRole[],
  requiredUserRoles: UserRole[] | UserRole
): boolean => {
  const requiredUserRolesArray = Array.isArray(requiredUserRoles) ? requiredUserRoles : [requiredUserRoles];
  return (
    !requiredUserRolesArray.length ||
    (!!userRoles?.length && userRoles.some((userRole: UserRole) => requiredUserRolesArray.includes(userRole)))
  );
};

export const userRolesForUser = (user: User, userRoles: UserRole[] = []): UserRole[] =>
  user.userRoles.length ? userRoles.filter((userRole: UserRole) => user.userRoles?.includes(userRole)) : [];
