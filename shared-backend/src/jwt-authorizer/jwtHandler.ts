/*
 *
 * MIT License.
 *
 */
import { APIGatewayRequestAuthorizerEvent } from 'aws-lambda';
import { notAuthenticatedResult } from './auth.utils';
import { authenticateToken } from './token.authentication';
import { AuthenticationResult } from './types';

export const jwtHandler: any = async (event: APIGatewayRequestAuthorizerEvent): Promise<AuthenticationResult> => {
  try {
    // Try to authenticate by both token and API key
    return authenticateToken(event);
  } catch (error) {
    console.error(error);
    return notAuthenticatedResult(event, 'Error authenticating JWT.');
  }
};
