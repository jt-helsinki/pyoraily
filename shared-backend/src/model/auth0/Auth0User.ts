/*
 *
 * MIT License.
 *
 */
import { Auth0UserIdentity } from '../auth0/Auth0UserIdentity';
import { Gender } from '../user/User';
import { UserRole } from '../user/UserRole';

export interface Auth0User {
  user_id: string;
  email: string;
  email_verified: boolean;
  phone_number?: string;
  phone_verified?: boolean;
  created_at: string;
  updated_at: string;
  identities: Auth0UserIdentity[];
  user_roles: UserRole[];
  app_metadata?: {
    user_roles: UserRole[];
  };
  user_metadata?: {
    year_of_birth: number;
    gender: Gender;
    uci_id: number;
  };
  name: string;
  multifactor?: Array<string>;
  last_ip?: string;
  last_login?: string;
  logins_count?: number;
  blocked?: boolean;
  given_name?: string;
  family_name?: string;
}
