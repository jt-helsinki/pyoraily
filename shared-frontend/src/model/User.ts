/*
 *
 * MIT License.
 *
 */

import { UserRole } from './UserRole';
import { UserStatus } from './UserStatus';

export interface User {
  id: string | null;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'na';
  email: string;
  uciId?: string;
  yearOfBirth: number;
  status: UserStatus;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  userRoles: UserRole[];
}
