/*
 *
 * MIT License.
 *
 */

import { Claims } from '../model/auth0/Claims';
import { User } from '../model/user/User';
import { UserStatus } from '../model/user/UserStatus';

export const userFromAuthClaims = (claims: Claims): User => {
  const { email, sub, user_roles, name, family_name, given_name } = claims;
  return {
    id: sub,
    status: UserStatus.Active,
    email: email,
    fullName: name,
    lastName: family_name,
    firstName: given_name,
    userRoles: user_roles ? [...user_roles] : [],
  } as User;
};
