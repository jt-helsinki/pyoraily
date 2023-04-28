import { Auth0UserEntity } from '@src/entities/Auth0UserEntity';
import { ADMIN_MOCK_USER_ENTITY, ATHLETE_MOCK_USER_ENTITY, HPY_MOCK_USER_ENTITY } from '@src/mocks/user.mock';
import {
  ATHLETE_MOCK_AUTH0_USER,
  MOCK_AUTH0_USER_ADMIN,
  HPY_MOCK_AUTH0_USER,
} from 'pyoraily-shared-backend/test/mocks/auth0.mock';
import { mockGetEnv } from 'pyoraily-shared-backend/test/mocks/env-vars.mock';
import { Auth0Service } from '@src/services/Auth0Service';
import { UserService } from '@src/services/UserService';
import { Auth0User } from 'pyoraily-shared-backend/model/auth0/Auth0User';
import { User } from 'pyoraily-shared-backend/model/user/User';
import { UserRole } from 'pyoraily-shared-backend/model/user/UserRole';
import { UserStatus } from 'pyoraily-shared-backend/model/user/UserStatus';

jest.mock('../../../shared/src/server/utils/config', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const originalModule = jest.requireActual('../../../shared/src/server/utils/config') as any;
  return {
    __esModule: true,
    ...originalModule,
    getEnv: mockGetEnv,
  };
});

describe('UsersService', () => {
  const mockAuthService = new Auth0Service({
    authorize: jest.fn(),
    blockUser: jest.fn(),
    unblockUser: jest.fn(),
    updateUser: jest.fn(() => Promise.resolve({} as any)),
    getUser: jest.fn().mockImplementation(() => Promise.resolve(ATHLETE_MOCK_AUTH0_USER)),
    getUsers: jest
      .fn()
      .mockImplementation(() => Promise.resolve([ATHLETE_MOCK_AUTH0_USER, MOCK_AUTH0_USER_ADMIN, HPY_MOCK_AUTH0_USER])),
  });

  const usersService = new UserService(mockAuthService);

  it('getUsers should call mock users repo getUsers', () => {
    const usersServiceForTest = new UserService(mockAuthService);
    const getUsersSpy = jest.spyOn(mockAuthService, 'getUsers');
    expect(usersServiceForTest.getUsers()).resolves.toEqual([
      ATHLETE_MOCK_USER_ENTITY,
      ADMIN_MOCK_USER_ENTITY,
      HPY_MOCK_USER_ENTITY,
    ]);
    expect(getUsersSpy).toHaveBeenCalled();
  });

  it('getUser should call mock users repo getUser method', () => {
    const getUserSpy = jest.spyOn(mockAuthService, 'getUser');
    expect(usersService.getUser(ATHLETE_MOCK_USER_ENTITY.id)).resolves.toEqual(ATHLETE_MOCK_USER_ENTITY);
    expect(getUserSpy).toHaveBeenCalledWith(ATHLETE_MOCK_USER_ENTITY.id);
  });

  describe('updateUser', () => {
    const patchProps: Partial<User> = {
      firstName: 'Eddie',
      email: 'test@test.com',
      yearOfBirth: 2001,
      status: UserStatus.Blocked,
      userRoles: [UserRole.ADMIN],
    };

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should fully patch user when they are not from an identity provider', async () => {
      const expectedUser = { ...ATHLETE_MOCK_USER_ENTITY, ...patchProps };
      const expectedAuth0User: Auth0User = new Auth0UserEntity({
        ...ATHLETE_MOCK_AUTH0_USER,
        given_name: 'Eddie',
        name: 'Eddie Bags',
        user_roles: [UserRole.ADMIN],
        blocked: true,
        user_metadata: {
          ...ATHLETE_MOCK_AUTH0_USER.user_metadata,
          year_of_birth: 2001,
        } as any,
        app_metadata: {
          user_roles: [UserRole.ADMIN],
        },
      });
      const updateUserSpy = jest
        .spyOn(mockAuthService, 'updateUser')
        .mockResolvedValue(Promise.resolve(expectedAuth0User));
      expect(usersService.updateUser(ATHLETE_MOCK_USER_ENTITY.id, expectedUser)).resolves.toEqual(expectedUser);
      expect(updateUserSpy).toHaveBeenCalledWith(
        ATHLETE_MOCK_USER_ENTITY.id,
        new Auth0UserEntity({
          given_name: 'Eddie',
          family_name: 'Bags',
          name: 'Eddie Bags',
          email: 'test@test.com',
          blocked: true,
          user_roles: [UserRole.ADMIN],
          app_metadata: {
            user_roles: [UserRole.ADMIN],
          },
        })
      );
    });
  });
});
