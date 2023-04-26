/*
 *
 * MIT License.
 *
 */
import { Claims } from '../auth0/Claims';

export interface AuthorizeResponse {
  id_token: string;
  claims: Claims;
}
