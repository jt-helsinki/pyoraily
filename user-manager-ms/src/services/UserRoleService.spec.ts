import { ADMIN_MOCK_USER_ENTITY, ATHLETE_MOCK_USER_ENTITY, HPY_MOCK_USER_ENTITY } from '@src/mocks/user.mock';
import { UserRoleService } from '@src/services/UserRoleService';
import { UserRole } from 'pyoraily-shared-backend/model/user/UserRole';

describe('UserRolesService', () => {
  const userRolesService = new UserRoleService();

  it('[list] should return a user role list', async () => {
    const userRoles = await userRolesService.list();
    expect(userRoles).toEqual([
      UserRole.ADMIN,
      UserRole.ATHLETE,
      UserRole.DISCIPLINE_MANAGER,
      UserRole.HPY,
      UserRole.SP,
    ]);
  });

  it('[hasRole] should return expected value for user with USER role', async () => {
    const hasUserRole = await userRolesService.hasRole(ATHLETE_MOCK_USER_ENTITY, UserRole.ATHLETE);
    expect(hasUserRole).toBeTruthy();
    const hasAdminRole = await userRolesService.hasRole(ATHLETE_MOCK_USER_ENTITY, UserRole.HPY);
    expect(hasAdminRole).toBeFalsy();
    const hasSuperAdminRole = await userRolesService.hasRole(ATHLETE_MOCK_USER_ENTITY, UserRole.ADMIN);
    expect(hasSuperAdminRole).toBeFalsy();
  });

  it('[hasRole] should return expected value for user with ADMIN role', async () => {
    const hasUserRole = await userRolesService.hasRole(HPY_MOCK_USER_ENTITY, UserRole.ATHLETE);
    expect(hasUserRole).toBeFalsy();
    const hasAdminRole = await userRolesService.hasRole(HPY_MOCK_USER_ENTITY, UserRole.HPY);
    expect(hasAdminRole).toBeTruthy();
    const hasSuperAdminRole = await userRolesService.hasRole(HPY_MOCK_USER_ENTITY, UserRole.ADMIN);
    expect(hasSuperAdminRole).toBeFalsy();
  });

  it('[hasRole] should return expected value for user with SUPER_ADMIN role', async () => {
    const hasUserRole = await userRolesService.hasRole(ADMIN_MOCK_USER_ENTITY, UserRole.ATHLETE);
    expect(hasUserRole).toBeFalsy();
    const hasAdminRole = await userRolesService.hasRole(ADMIN_MOCK_USER_ENTITY, UserRole.HPY);
    expect(hasAdminRole).toBeFalsy();
    const hasSuperAdminRole = await userRolesService.hasRole(ADMIN_MOCK_USER_ENTITY, UserRole.ADMIN);
    expect(hasSuperAdminRole).toBeTruthy();
  });

  it('[canAssignRoles] USER role should not be able to assign USER role', async () => {
    const canAssignRoles = await userRolesService.canAssignRoles(ATHLETE_MOCK_USER_ENTITY);
    expect(canAssignRoles).toBeFalsy();
  });

  it('[canAssignRoles] ADMIN role should not be able to assign SUPER_ADMIN role', async () => {
    const canAssignRoles = await userRolesService.canAssignRoles(HPY_MOCK_USER_ENTITY);
    expect(canAssignRoles).toBeFalsy();
  });

  it('[canAssignRoles] ADMIN role should be able to assign USER and ADMIN role', async () => {
    const canAssignRoles = await userRolesService.canAssignRoles(HPY_MOCK_USER_ENTITY);
    expect(canAssignRoles).toBeFalsy();
  });

  it('[canAssignRoles] SUPER_ADMIN role should be able to assign USER, ADMIN and SUPER_ADMIN role', async () => {
    const canAssignRoles = await userRolesService.canAssignRoles(ADMIN_MOCK_USER_ENTITY);
    expect(canAssignRoles).toBeTruthy();
  });
});
