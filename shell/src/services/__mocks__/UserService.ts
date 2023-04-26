/*
 *
 * MIT License.
 *
 */
import {
  mockCreateUserResponseData,
  mockFetchProfileResponseDate,
  mockFetchUsersResponseData,
  mockUpdateUserResponseData,
} from '@src/tests/mocks/mockUserServiceResponses';

export const fetchProfile = jest.fn(() => Promise.resolve(mockFetchProfileResponseDate));
export const fetchUsers = jest.fn(() => Promise.resolve(mockFetchUsersResponseData));
export const createUser = jest.fn(() => Promise.resolve(mockCreateUserResponseData));
export const updateUser = jest.fn(() => Promise.resolve(mockUpdateUserResponseData));
