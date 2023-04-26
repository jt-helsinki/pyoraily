import { UserRoleController } from '@src/controllers/UserRoleController';
import { ADMIN_MOCK_USER_ENTITY, ATHLETE_MOCK_USER_ENTITY, HPY_MOCK_USER_ENTITY } from '@src/mocks/user.mock';
import { UserRoleService } from '@src/services/UserRoleService';
import { UserRole } from 'pyoraily-shared-backend/model/user/UserRole';

describe('UserRolesController', () => {
  it('[list] should return all user roles for super admin user', async () => {
    const userRolesService = new UserRoleService();
    const userRolesController = new UserRoleController(userRolesService);

    const mockServiceList = jest.spyOn(userRolesService, 'list');
    const userRoles = await userRolesController.list({ user: ADMIN_MOCK_USER_ENTITY });
    expect(userRoles).toEqual([
      UserRole.ADMIN,
      UserRole.ATHLETE,
      UserRole.DISCIPLINE_MANAGER,
      UserRole.HPY,
      UserRole.SP,
    ]);
    expect(mockServiceList).toHaveBeenCalled();
  });

  it('[list] should return ADMIN and USER roles for admin user', async () => {
    const userRolesService = new UserRoleService();
    const userRolesController = new UserRoleController(userRolesService);

    const mockServiceList = jest.spyOn(userRolesService, 'list');
    const userRoles = await userRolesController.list({ user: HPY_MOCK_USER_ENTITY });
    expect(userRoles).toEqual([UserRole.ATHLETE, UserRole.DISCIPLINE_MANAGER, UserRole.HPY, UserRole.SP]);
    expect(mockServiceList).toHaveBeenCalled();
  });

  it('[list] should return empty array for normal user', async () => {
    const userRolesService = new UserRoleService();
    const userRolesController = new UserRoleController(userRolesService);
    const mockServiceList = jest.spyOn(userRolesService, 'list');
    const userRoles = await userRolesController.list({ user: ATHLETE_MOCK_USER_ENTITY });
    expect(userRoles).toEqual([]);
    expect(mockServiceList).toHaveBeenCalled();
  });
});
