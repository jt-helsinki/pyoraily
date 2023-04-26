/*
 *
 * MIT License.
 *
 */
import { UserRole } from 'pyoraily-shared-backend/model/user/UserRole';
import { UserStatus } from 'pyoraily-shared-backend/model/user/UserStatus';
import { IsEmail, IsIn, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @MaxLength(128, { message: 'First name is too long' })
  @MinLength(2, { message: 'First name is too long' })
  firstName: string;

  @MaxLength(128, { message: 'Last name is too long' })
  @MinLength(2, { message: 'Last name is too long' })
  lastName: string;

  @IsIn(['Active', 'Blocked'])
  status: UserStatus.Active | UserStatus.Blocked;

  @IsOptional()
  userRoles: UserRole[];
}
