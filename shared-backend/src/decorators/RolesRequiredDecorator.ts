/*
 *
 * MIT License.
 *
 */
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/AuthGuard';
import { RoleGuard } from '../guards/RoleGuard';

export function RolesRequired(
  ...roles: string[]
): <TFunction extends () => void, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(JwtAuthGuard, RoleGuard));
}
