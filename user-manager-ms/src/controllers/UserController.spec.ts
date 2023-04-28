import { ForbiddenException, NotFoundException, ValidationPipe } from '@nestjs/common';
import { UserController } from '@src/controllers/UserController';
import { UserDto } from '@src/dtos/UserDto';
import {
  MOCK_AUTH0_USER_ADMIN,
  ATHLETE_MOCK_AUTH0_USER,
  HPY_MOCK_AUTH0_USER,
} from 'pyoraily-shared-backend/test/mocks/auth0.mock';
import { ADMIN_MOCK_USER_ENTITY, ATHLETE_MOCK_USER_ENTITY, HPY_MOCK_USER_ENTITY } from '@src/mocks/user.mock';
import { Auth0Service } from '@src/services/Auth0Service';
import { UserRoleService } from '@src/services/UserRoleService';
import { UserService } from '@src/services/UserService';

// jest.mock('../../../shared/src/server/utils/config', () => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const originalModule = jest.requireActual('../../../shared/src/server/utils/config') as any;
//   return {
//     __esModule: true,
//     ...originalModule,
//     getEnv: mockGetEnv,
//   };
// });

describe('UsersController', () => {
  const validationPipe = new ValidationPipe({ transform: true });

  let usersController: UserController;
  let usersService: UserService;
  let authService: Auth0Service;
  let userRolesService: UserRoleService;

  beforeEach(() => {
    authService = new Auth0Service({
      authorize: jest.fn(),
      blockUser: jest.fn(),
      unblockUser: jest.fn(),
      updateUser: jest.fn(),
      getUser: jest.fn(),
      getUsers: jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve([ATHLETE_MOCK_AUTH0_USER, MOCK_AUTH0_USER_ADMIN, HPY_MOCK_AUTH0_USER])
        ),
    });
    usersService = new UserService(authService);
    userRolesService = new UserRoleService();
    usersController = new UserController(usersService, userRolesService);
  });

  describe('UsersController', () => {
    it('[get] should return user from users service', async () => {
      jest.spyOn(usersService, 'getUser').mockResolvedValue(ATHLETE_MOCK_USER_ENTITY);
      const user = await usersController.get({ id: 'test-user-id' });
      expect(user).toEqual(ATHLETE_MOCK_USER_ENTITY);
    });

    it('[get] should raise not found exception if user not found', async () => {
      const getUserSpy = jest.spyOn(usersService, 'getUser').mockResolvedValue(null);

      try {
        await usersController.get({ id: 'test-user-id' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
      expect(getUserSpy).toHaveBeenCalledWith('test-user-id');
    });

    it('[update] should return forbidden if logged in user cannot assign target roles', async () => {
      const canAssignRolesSpy = jest.spyOn(userRolesService, 'canAssignRoles').mockImplementation(() => false);
      const input = {
        firstName: 'Numb',
        lastName: 'Nuts',
        email: 'test.user@example.com',
        status: 'Active',
        userRoles: ['mock-role-id'],
      };
      const transformedInput = await validationPipe.transform(input, {
        type: 'body',
        metatype: UserDto,
      });
      try {
        await usersController.update(
          { user: ATHLETE_MOCK_USER_ENTITY } as any,
          { id: 'mock-user-id' },
          transformedInput
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(canAssignRolesSpy).toHaveBeenCalledWith(ATHLETE_MOCK_USER_ENTITY);
      }
    });

    it('[list] should return all users for ADMIN role', async () => {
      const users = await usersController.list({ user: ADMIN_MOCK_USER_ENTITY });
      expect(users).toEqual([ATHLETE_MOCK_USER_ENTITY, ADMIN_MOCK_USER_ENTITY, HPY_MOCK_USER_ENTITY]);
    });

    it('[list] should return users for HPY role', async () => {
      const users = await usersController.list({ user: HPY_MOCK_USER_ENTITY });
      expect(users).toEqual([ATHLETE_MOCK_USER_ENTITY]);
    });

    it('[list] should return an empty array for Athlete role', async () => {
      const users = await usersController.list({ user: ATHLETE_MOCK_USER_ENTITY });
      expect(users).toEqual([]);
    });
  });
});
