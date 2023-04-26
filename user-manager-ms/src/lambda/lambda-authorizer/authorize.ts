/*
 *
 * MIT License.
 *
 */

import { jwtHandler } from 'pyoraily-shared-backend/jwt-authorizer/jwtHandler';
import { AuthenticationResult, CustomAuthorizerContext } from 'pyoraily-shared-backend/jwt-authorizer/types';
import { APIGatewayAuthorizerWithContextResult, APIGatewayRequestAuthorizerEvent, Callback, Context } from 'aws-lambda';

export const handler: any = async (
  event: APIGatewayRequestAuthorizerEvent,
  context: Context,
  callback: Callback<APIGatewayAuthorizerWithContextResult<CustomAuthorizerContext>>
): Promise<AuthenticationResult> => {
  try {
    return jwtHandler(event, context, callback);
  } catch (error) {
    throw error;
  }
};
