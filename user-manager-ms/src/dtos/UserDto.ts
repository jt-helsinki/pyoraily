/*
 *
 * MIT License.
 *
 */
import { ProfileUpdateDto } from '@src/dtos/ProfileUpdateDto';
import { IsIn, IsOptional } from 'class-validator';
import { UserRole } from 'pyoraily-shared-backend/model/user/UserRole';
import { UserStatus } from 'pyoraily-shared-backend/model/user/UserStatus';

export class UserDto extends ProfileUpdateDto {
  @IsIn(['Active', 'Blocked'])
  status: UserStatus.Active | UserStatus.Blocked;

  @IsIn([UserRole.ATHLETE, UserRole.HPY, UserRole.DISCIPLINE_MANAGER, UserRole.ADMIN, UserRole.SP], {
    each: true,
  })
  userRoles: UserRole[];
}
