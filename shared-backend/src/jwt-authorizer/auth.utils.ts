/*
 *
 * MIT License.
 *
 */
import { APIGatewayRequestAuthorizerEvent, PolicyDocument } from 'aws-lambda';
import { AuthenticationResult } from './types';

/**
 * Authenticated result for both JWT and API key authentication.
 */
export function authenticatedResult(event: APIGatewayRequestAuthorizerEvent, userId: string): AuthenticationResult {
  return {
    principalId: userId,
    policyDocument: createPolicyDocument(event, true),
    context: {},
  };
}

/**
 * Browser based JWT authentication. Not authenticated.
 *
 * Note: Generally speaking, access-control-allow-origin will be set to the calling client's origin.
 * However, if the client is not a browser or if the "origin" header is not available, the origin will be set to '*'.
 * This is only for an error response, so it should not be a security risk.
 */
export function notAuthenticatedResult(
  event: APIGatewayRequestAuthorizerEvent,
  errorMessage: string
): AuthenticationResult {
  return {
    principalId: null as any,
    policyDocument: createPolicyDocument(event, false),
    context: {
      'x-error-message': errorMessage,
      'access-control-allow-origin': event.headers ? event.headers['origin'] : '*',
    },
  };
}

function createPolicyDocument(event: APIGatewayRequestAuthorizerEvent, allow: boolean): PolicyDocument {
  return {
    Version: '2012-10-17', // default version
    Statement: [
      {
        Action: 'execute-api:Invoke', // default action
        Effect: allow ? 'Allow' : 'Deny',
        Resource: event.methodArn,
      },
    ],
  };
}
