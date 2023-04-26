import * as config from '../utils/config';
import { UserRole } from '../model/user/UserRole';
import { UserStatus } from '../model/user/UserStatus';
import { JwtStrategy } from './JwtStrategy';

describe('JwtStrategy', () => {
  it('validate should return auth user object from payload', async () => {
    jest.spyOn(config, 'getEnv').mockReturnValue('dummy');
    const jwtStrategy = new JwtStrategy();
    const mockClaims = {
      email: 'max.doe@acme.co.dn',
      family_name: 'Doe',
      given_name: 'Max',
      name: 'Max Doe',
      iss: 'mock-issuer',
      sub: 'mock-sub',
      aud: 'mock-audience',
      iat: 100000,
      exp: 100001,
      user_roles: [UserRole.ADMIN, UserRole.ATHLETE, UserRole.DISCIPLINE_MANAGER, UserRole.HPY, UserRole.SP],
    };
    expect(await jwtStrategy.validate(mockClaims)).toEqual({
      id: 'mock-sub',
      status: UserStatus.Active,
      fullName: 'Max Doe',
      email: 'max.doe@acme.co.dn',
      userRoles: [UserRole.ADMIN, UserRole.ATHLETE, UserRole.DISCIPLINE_MANAGER, UserRole.HPY, UserRole.SP],
    });
  });
});
