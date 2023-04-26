/*
 *
 * MIT License.
 *
 */
import { Controller, Get, Req } from '@nestjs/common';
import { UserRoleService } from '@src/services/UserRoleService';
import { RolesRequired } from 'pyoraily-shared-backend/decorators/RolesRequiredDecorator';
import { User } from 'pyoraily-shared-backend/model/user/User';
import { UserRole } from 'pyoraily-shared-backend/model/user/UserRole';

@Controller('user-roles')
export class UserRoleController {
  constructor(private userRolesService: UserRoleService) {}

  @Get('/')
  @RolesRequired(UserRole.HPY, UserRole.ADMIN)
  list(@Req() request: { user: User }): UserRole[] {
    const userRoles = this.userRolesService.list();

    const loggedInUserRoles = request.user.userRoles;

    const isAdmin = loggedInUserRoles.some((role: UserRole) => role === UserRole.ADMIN);
    if (isAdmin) {
      return userRoles;
    }

    const isHpy = loggedInUserRoles.some((role: UserRole) => role === UserRole.HPY);
    if (isHpy) {
      return userRoles.filter((role) => role !== UserRole.ADMIN);
    }

    // Currently we have only three roles but this needs to be refactored to handle multiple roles.
    return [];
  }
}
