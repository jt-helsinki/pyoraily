/*
 *
 * MIT License.
 *
 */
export interface Auth0Profile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  middle_name: string;
  email: string;
  email_verified: boolean;
  birthdate: string;
  created_at: string;
  updated_at: string;
}
