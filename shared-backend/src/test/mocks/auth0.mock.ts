/*
 *
 * MIT License.
 *
 */
import { Auth0Profile } from '../../model/auth0/Auth0Profile';
import { Auth0User } from '../../model/auth0/Auth0User';
import { Gender } from '../../model/user/User';
import { UserRole } from '../../model/user/UserRole';

export const PROFILE_MOCK_AUTH0_USER: Auth0Profile = {
  sub: 'auth0|248289761001',
  name: 'Max Doe',
  given_name: 'Max',
  family_name: 'Doe',
  middle_name: '',
  email: 'test@test.com',
  email_verified: true,
  birthdate: '',
  created_at: '2022-06-01T12:00:00.000Z',
  updated_at: '2022-07-01T12:00:00.000Z',
};

export const ATHLETE_MOCK_AUTH0_USER: Auth0User = {
  user_id: 'auth0|987654321012',
  name: 'Show Bags',
  given_name: 'Show',
  family_name: 'Bags',
  email: 'test@test.com',
  email_verified: true,
  created_at: '2022-06-01T12:00:00.000Z',
  updated_at: '2022-07-01T12:00:00.000Z',
  last_login: '2022-08-01T12:00:00.000Z',
  phone_number: '012345678',
  phone_verified: false,
  identities: [],
  user_roles: [UserRole.ATHLETE],
  user_metadata: {
    gender: Gender.MALE,
    uci_id: 123456789,
    year_of_birth: 2009,
  },
  app_metadata: {
    user_roles: [UserRole.ATHLETE],
  },
};

export const HPY_MOCK_AUTH0_USER: Auth0User = {
  user_id: 'auth0|9876543210',
  name: 'Show Bags',
  given_name: 'Show',
  family_name: 'Bags',
  email: 'test@test.com',
  email_verified: true,
  created_at: '2022-06-01T12:00:00.000Z',
  updated_at: '2022-07-01T12:00:00.000Z',
  last_login: '2022-08-01T12:00:00.000Z',
  phone_number: '012345678',
  phone_verified: false,
  identities: [],
  user_roles: [UserRole.HPY],
  user_metadata: {
    gender: Gender.FEMALE,
    uci_id: 123456789,
    year_of_birth: 2009,
  },
  app_metadata: {
    user_roles: [UserRole.HPY],
  },
};

export const MOCK_AUTH0_USER_ADMIN: Auth0User = {
  user_id: 'auth0|123456789',
  name: 'Show Bags',
  given_name: 'Show',
  family_name: 'Bags',
  email: 'test@test.com',
  email_verified: true,
  created_at: '2022-06-01T12:00:00.000Z',
  updated_at: '2022-07-01T12:00:00.000Z',
  last_login: '2022-08-01T12:00:00.000Z',
  phone_number: '012345678',
  phone_verified: false,
  identities: [],
  user_roles: [UserRole.ADMIN],
  user_metadata: {
    gender: Gender.MALE,
    uci_id: 123456789,
    year_of_birth: 2009,
  },
  app_metadata: {
    user_roles: [UserRole.ADMIN],
  },
};

export const NOT_VERIFIED_MOCK_AUTH0_USER: Auth0User = {
  user_id: 'auth0|248289761001',
  name: 'Max Doe',
  given_name: 'Max',
  family_name: 'Doe',
  email: 'test@test.com',
  email_verified: false,
  created_at: '2022-06-01T12:00:00.000Z',
  updated_at: '2022-07-01T12:00:00.000Z',
  last_login: '2022-08-01T12:00:00.000Z',
  phone_number: '012345678',
  phone_verified: false,
  identities: [],
  user_roles: [UserRole.ATHLETE],
  user_metadata: {
    gender: Gender.MALE,
    uci_id: 123456789,
    year_of_birth: 2009,
  },
  app_metadata: {
    user_roles: [UserRole.ATHLETE],
  },
};

export const BLOCKED_MOCK_AUTH0_USER: Auth0User = {
  user_id: 'auth0|248289761001',
  blocked: true,
  name: 'Max Doe',
  given_name: 'Max',
  family_name: 'Doe',
  email: 'test@test.com',
  email_verified: false,
  created_at: '2022-06-01T12:00:00.000Z',
  updated_at: '2022-07-01T12:00:00.000Z',
  last_login: '2022-08-01T12:00:00.000Z',
  phone_number: '012345678',
  phone_verified: false,
  identities: [],
  user_roles: [UserRole.ATHLETE],
  user_metadata: {
    gender: Gender.MALE,
    uci_id: 123456789,
    year_of_birth: 2009,
  },
  app_metadata: {
    user_roles: [UserRole.ATHLETE],
  },
};
