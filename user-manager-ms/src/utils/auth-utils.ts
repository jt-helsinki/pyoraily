/*
 *
 * MIT License.
 *
 */

import { Auth } from 'pyoraily-shared-backend/model/auth0/Auth';
import { Claims } from 'pyoraily-shared-backend/model/auth0/Claims';

export const idTokenToClaims = (auth: Auth): Claims => {
  const decodedToken = Buffer.from(auth.id_token.split('.')[1], 'base64');
  const claims = JSON.parse(decodedToken.toString('utf8')) as Claims;
  return claims;
};
