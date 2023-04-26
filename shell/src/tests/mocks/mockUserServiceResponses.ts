/*
 *
 * MIT License.
 *
 */
import { User } from 'pyoraily-shared-frontend/model/User';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import { UserStatus } from 'pyoraily-shared-frontend/model/UserStatus';
import { MOCK_USER_ROLES, MOCK_USER_ROLES_NO_ADMIN } from '@src/tests/mocks/mockUserRoleServiceResponses';

export const mockFetchUsersResponseData: User[] = [
  {
    userRoles: [UserRole.ATHLETE],
    email: 'test@test.com',
    firstName: 'Joe',
    lastName: 'Mangle',
    yearOfBirth: 2001,
    gender: 'male',
    id: 'auth0|634fa3a6305f8dc31e16378b',
    status: 'Active' as UserStatus.Active,
  },
  {
    userRoles: [UserRole.ATHLETE],
    email: 'test@test.com',
    firstName: 'Joe',
    lastName: 'Mangle',
    yearOfBirth: 2002,
    gender: 'male',
    id: 'waad|8n8DiW_sztx5AJN544DocSjl3yMON0Cc4gfcaIf1w8Y',
    status: 'Active' as UserStatus.Active,
  },
];

export const mockCreateUserRequestData: User = {
  id: null,
  firstName: 'Show',
  lastName: 'Bags',
  email: 'show.bags@test.com',
  yearOfBirth: 2003,
  gender: 'male',
  userRoles: MOCK_USER_ROLES_NO_ADMIN,
  status: 'Active' as UserStatus.Active,
};

export const mockCreateAdminUserRequestData: User = {
  id: null,
  firstName: 'Show',
  lastName: 'Bags',
  email: 'show.bags@test.com',
  yearOfBirth: 2003,
  gender: 'male',
  userRoles: MOCK_USER_ROLES,
  status: 'Active' as UserStatus.Active,
};

export const mockCreateUserResponseData: any = {
  // TODO this should match the User interface
  firstName: 'Show',
  lastName: 'Bags',
  yearOfBirth: 2004,
  email: 'test@test.com',
  gender: 'male',
  status: 'Active' as UserStatus.Active,
  userRoles: MOCK_USER_ROLES_NO_ADMIN,
  id: 'auth0|6350f0e844d2f1f163d693f4',
};

export const mockUpdateUserRequestData: User = {
  id: '123',
  firstName: 'Pot',
  lastName: 'Hole',
  email: 'pot.hole@test.com',
  yearOfBirth: 2002,
  gender: 'male',
  userRoles: MOCK_USER_ROLES_NO_ADMIN,
  status: 'Active' as UserStatus.Active,
};

export const mockUpdateUserResponseData: any = {
  // TODO this should match the User interface
  userRoles: MOCK_USER_ROLES_NO_ADMIN,
  firstName: 'Pot',
  lastName: 'Hole',
  gender: 'male',
  email: 'test@test.com',
  yearOfBirth: 2002,
  id: 'auth0|634fa3a6305f8dc31e16378b',
  status: 'Active' as UserStatus.Active,
};

export const mockFetchProfileResponseDate: any = {
  // TODO this should match the User interface
  userRoles: MOCK_USER_ROLES_NO_ADMIN,
  firstName: 'Skid',
  lastName: 'Mark',
  gender: 'male',
  email: 'test@test.com',
  yearOfBirth: 2000,
  id: 'waad|8n8DiW_sztx5AJN544DocSjl3yMON0Cc4gfcaIf1w8Y',
  status: 'Active',
};
