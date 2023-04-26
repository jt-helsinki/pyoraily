/*
 *
 * MIT License.
 *
 */
import { APIGatewayAuthorizerResultContext, APIGatewayAuthorizerWithContextResult } from 'aws-lambda';

export type AuthenticationResult = APIGatewayAuthorizerWithContextResult<CustomAuthorizerContext>;

export interface CustomAuthorizerContext extends APIGatewayAuthorizerResultContext {
  failReason?: string;
  user?: string;
}
