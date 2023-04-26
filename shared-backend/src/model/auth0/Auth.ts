/*
 *
 * MIT License.
 *
 */

export interface Auth {
  access_token: string;
  id_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}
