/*
 *
 * MIT License.
 *
 */
import { Injectable } from '@nestjs/common';
import { User } from 'pyoraily-shared-backend/model/user/User';
import { UserRole } from 'pyoraily-shared-backend/model/user/UserRole';

@Injectable()
export class UserRoleService {
  list(): UserRole[] {
    return [UserRole.ADMIN, UserRole.ATHLETE, UserRole.DISCIPLINE_MANAGER, UserRole.HPY, UserRole.SP];
  }

  hasRole(user: User, userRole: UserRole): boolean {
    return user.userRoles.some((role: UserRole) => role === userRole);
  }

  /**
   * Check if given user roles can assign target user roles
   * @returns True if given user roles can assign target user roles
   */
  canAssignRoles(user: User): boolean {
    const hasSuperAdminRole = this.hasRole(user, UserRole.ADMIN);
    if (hasSuperAdminRole) {
      // super admin can assign any roles
      return true;
    }
    return false;
  }
}
