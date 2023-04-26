/*
 *
 * MIT License.
 *
 */
export interface Auth0UserIdentity {
  connection: string;
  user_id: string;
  provider: string;
  isSocial: boolean;
}
