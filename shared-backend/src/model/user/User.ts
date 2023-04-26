/*
 *
 * MIT License.
 *
 */
import { UserRole } from './UserRole';
import { UserStatus } from './UserStatus';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NA = 'na',
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  yearOfBirth?: number;
  gender?: Gender;
  email: string;
  uciId?: number;
  status: UserStatus;
  createdAt: string;
  updatedAt?: string;
  lastLogin?: string;
  userRoles: UserRole[];
}
