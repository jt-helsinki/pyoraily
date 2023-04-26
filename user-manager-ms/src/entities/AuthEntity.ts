/*
 *
 * MIT License.
 *
 */

export class AuthEntity {
  access_token: string;
  id_token: string;
  scope: string;
  expires_in: number;
  token_type: string;

  constructor(access_token: string, id_token: string, scope: string, expires_in: number, token_type: string) {
    this.access_token = access_token;
    this.id_token = id_token;
    this.scope = scope;
    this.expires_in = expires_in;
    this.token_type = token_type;
  }
}
