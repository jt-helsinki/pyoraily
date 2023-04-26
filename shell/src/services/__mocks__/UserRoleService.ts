/*
 *
 * MIT License.
 *
 */
import { MOCK_USER_ROLES_NO_ADMIN } from '@src/tests/mocks/mockUserRoleServiceResponses';

export const fetchUserRoles = jest.fn(() => Promise.resolve(MOCK_USER_ROLES_NO_ADMIN));
