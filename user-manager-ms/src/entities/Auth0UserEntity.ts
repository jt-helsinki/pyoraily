/*
 *
 * MIT License.
 *
 */

import { Auth0User } from 'pyoraily-shared-backend/model/auth0/Auth0User';
import { Auth0UserIdentity } from 'pyoraily-shared-backend/model/auth0/Auth0UserIdentity';
import { Gender, User } from 'pyoraily-shared-backend/model/user/User';
import { UserRole } from 'pyoraily-shared-backend/model/user/UserRole';

export class Auth0UserEntity implements Auth0User {
  readonly user_id: string;

  readonly email: string;

  readonly email_verified: boolean;

  readonly phone_number?: string;

  readonly phone_verified?: boolean;

  readonly created_at: string;

  readonly updated_at: string;

  readonly identities: Auth0UserIdentity[];

  readonly user_roles: UserRole[];

  readonly app_metadata?: {
    user_roles: UserRole[];
  };

  readonly user_metadata?: {
    year_of_birth: number;
    gender: Gender;
    uci_id: number;
  };

  readonly name: string;

  readonly multifactor?: Array<string>;

  readonly last_ip?: string;

  readonly last_login?: string;

  readonly logins_count?: number;

  readonly blocked?: boolean;

  readonly given_name?: string;

  readonly family_name?: string;

  constructor(user: Partial<Auth0User>) {
    Object.assign(this, user);
  }

  static fromUser(user: User): Auth0User {
    const { firstName, lastName, email, status, userRoles } = user;
    let userRolesForEntity = userRoles ? [...userRoles] : [UserRole.ATHLETE];
    if ((!Array.isArray(userRoles) || !userRoles.length) && email.toLowerCase().endsWith('@pyoraily.fi')) {
      userRolesForEntity = [UserRole.SP];
    }

    return new Auth0UserEntity({
      given_name: firstName,
      family_name: lastName,
      name: `${firstName} ${lastName}`,
      email: email,
      blocked: status === 'Blocked' ? true : false,
      user_roles: userRolesForEntity,
      app_metadata: {
        user_roles: userRolesForEntity as UserRole[],
      },
    });
  }

  static fromProfileUser(user: User): Auth0User {
    const { firstName, lastName, email, uciId, gender, yearOfBirth } = user;
    return new Auth0UserEntity({
      given_name: firstName,
      family_name: lastName,
      name: `${firstName} ${lastName}`,
      email: email,
      user_metadata: {
        year_of_birth: yearOfBirth as number,
        gender: gender as Gender,
        uci_id: uciId as number,
      },
    });
  }
}
