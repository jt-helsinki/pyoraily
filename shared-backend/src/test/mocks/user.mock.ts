/*
 *
 * MIT License.
 *
 */
import { Gender, User } from '../../model/user/User';
import { UserRole } from '../../model/user/UserRole';
import { UserStatus } from '../../model/user/UserStatus';

export const PROFILE_MOCK_USER: User = {
  id: 'auth0|9876543210',
  firstName: 'Show',
  lastName: 'Bags',
  gender: Gender.MALE,
  yearOfBirth: 2001,
  email: 'test@test.com',
  status: UserStatus.Active,
  createdAt: '2022-06-01T12:00:00.000Z',
  userRoles: [],
};

export const ATHLETE_MOCK_USER: User = {
  id: 'auth0|987654321012',
  firstName: 'Show',
  lastName: 'Bags',
  gender: Gender.MALE,
  email: 'test@test.com',
  status: UserStatus.Active,
  userRoles: [UserRole.ATHLETE],
  uciId: 123456789,
  yearOfBirth: 2009,
  createdAt: '2022-06-01T12:00:00.000Z',
  updatedAt: '2022-07-01T12:00:00.000Z',
  lastLogin: '2022-08-01T12:00:00.000Z',
};

export const HPY_MOCK_USER: User = {
  id: 'auth0|9876543210',
  firstName: 'Show',
  lastName: 'Bags',
  gender: Gender.FEMALE,
  email: 'test@test.com',
  userRoles: [UserRole.HPY],
  status: UserStatus.Active,
  uciId: 123456789,
  yearOfBirth: 2009,
  createdAt: '2022-06-01T12:00:00.000Z',
  updatedAt: '2022-07-01T12:00:00.000Z',
  lastLogin: '2022-08-01T12:00:00.000Z',
};

export const ADMIN_MOCK_USER: User = {
  id: 'auth0|123456789',
  firstName: 'Show',
  lastName: 'Bags',
  gender: Gender.MALE,
  email: 'test@test.com',
  userRoles: [UserRole.ADMIN],
  status: UserStatus.Active,
  uciId: 123456789,
  yearOfBirth: 2009,
  createdAt: '2022-06-01T12:00:00.000Z',
  updatedAt: '2022-07-01T12:00:00.000Z',
  lastLogin: '2022-08-01T12:00:00.000Z',
};

export const NOT_VERIFIED_MOCK_USER: Partial<User> = {
  id: 'auth0|9876543210',
  firstName: 'Show',
  lastName: 'Bags',
  email: 'test@test.com',
  status: UserStatus.NotVerified,
};

export const BLOCKED_MOCK_USER: Partial<User> = {
  id: 'auth0|9876543210',
  firstName: 'Show',
  lastName: 'Bags',
  email: 'test@test.com',
  status: UserStatus.Blocked,
};
