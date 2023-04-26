/*
 *
 * MIT License.
 *
 */
import { UserRole } from '../user/UserRole';

export interface Claims {
  email: string;
  name: string;
  family_name: string;
  given_name: string;
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  user_roles: UserRole[];
}
