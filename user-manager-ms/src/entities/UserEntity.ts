/*
 *
 * MIT License.
 *
 */
import { ProfileUpdateDto } from '@src/dtos/ProfileUpdateDto';
import { UserDto } from '@src/dtos/UserDto';
import { Auth0User } from 'pyoraily-shared-backend/model/auth0/Auth0User';
import { Claims } from 'pyoraily-shared-backend/model/auth0/Claims';
import { Gender, User } from 'pyoraily-shared-backend/model/user/User';
import { UserRole } from 'pyoraily-shared-backend/model/user/UserRole';
import { UserStatus } from 'pyoraily-shared-backend/model/user/UserStatus';
import { userFromAuthClaims } from 'pyoraily-shared-backend/utils/auth-utils';

export class UserEntity implements User {
  readonly id: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  readonly yearOfBirth?: number;

  readonly uciId?: number;

  readonly gender?: Gender;

  readonly status: UserStatus;

  readonly createdAt: string;

  readonly userRoles: UserRole[];

  readonly updatedAt?: string;

  readonly lastLogin?: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }

  static fromUserDto(userUpdateDto: UserDto): UserEntity {
    const { firstName, lastName, email, status, userRoles } = userUpdateDto;
    return new UserEntity({
      firstName: firstName,
      lastName: lastName,
      email: email,
      status: status,
      userRoles: userRoles.length ? userRoles : [UserRole.ATHLETE],
    });
  }

  static fromAuthClaims(claims: Claims): UserEntity {
    const user = userFromAuthClaims(claims);
    return new UserEntity(user);
  }

  static fromProfileUpdateDto(existingUserEntity: User, profileUpdateDto: ProfileUpdateDto): UserEntity {
    return new UserEntity({
      firstName: profileUpdateDto.firstName,
      lastName: profileUpdateDto.lastName,
      email: profileUpdateDto.email,
      yearOfBirth: profileUpdateDto.yearOfBirth,
      gender: profileUpdateDto.gender,
      uciId: profileUpdateDto.uciId,
      userRoles: existingUserEntity.userRoles.length ? existingUserEntity.userRoles : [UserRole.ATHLETE],
    });
  }

  static fromAuth0User(user: Auth0User): UserEntity {
    return new UserEntity({
      id: user.user_id,
      firstName: user.given_name,
      lastName: user.family_name,
      email: user.email,
      yearOfBirth: user.user_metadata?.year_of_birth,
      gender: user.user_metadata?.gender,
      uciId: user.user_metadata?.uci_id,
      status: user.blocked ? UserStatus.Blocked : UserStatus.Active,
      userRoles: user.user_roles ? user.app_metadata?.user_roles : user.app_metadata?.user_roles || [UserRole.ATHLETE],
      updatedAt: user.updated_at,
      createdAt: user.created_at,
      lastLogin: user.last_login,
    });
  }
}
