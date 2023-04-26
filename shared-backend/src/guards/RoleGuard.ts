/*
 *
 * MIT License.
 *
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../model/user/UserRole';

@Injectable()
export class RoleGuard implements CanActivate {
  private readonly reflector = new Reflector();

  private parseJwt(token: string) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoleNames = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!requiredRoleNames) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.token || request.headers.token;
    if (token) {
      const decodedToken = this.parseJwt(token);
      const rolesFromToken = decodedToken.user_roles as UserRole[];
      return requiredRoleNames.some((requiredRoleName) => rolesFromToken.includes(requiredRoleName));
    }
    return false;
  }
}
