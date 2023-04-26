/*
 *
 * MIT License.
 *
 */
import { UserEntity } from '@src/entities/UserEntity';
import {
    ADMIN_MOCK_USER,
    ATHLETE_MOCK_USER, BLOCKED_MOCK_USER,
    HPY_MOCK_USER,
    NOT_VERIFIED_MOCK_USER
} from 'pyoraily-shared-backend/test/mocks/user.mock';


export const ATHLETE_MOCK_USER_ENTITY = new UserEntity(ATHLETE_MOCK_USER);

export const HPY_MOCK_USER_ENTITY = new UserEntity(HPY_MOCK_USER);

export const ADMIN_MOCK_USER_ENTITY = new UserEntity(ADMIN_MOCK_USER);

export const NOT_VERIFIED_MOCK_USER_ENTITY = new UserEntity(NOT_VERIFIED_MOCK_USER);

export const BLOCKED_MOCK_USER_ENTITY = new UserEntity(BLOCKED_MOCK_USER);
