/*
 *
 * MIT License.
 *
 */
import { userFromAuthClaims } from '../utils/auth-utils';
import { getEnv } from '../utils/config';
import { APIGatewayRequestAuthorizerEvent } from 'aws-lambda';
import * as jose from 'jose';
import { authenticatedResult, notAuthenticatedResult } from './auth.utils';
import { AuthenticationResult } from './types';

const client = jose.createRemoteJWKSet(new URL(`${getEnv('AUTH0_URL')}/.well-known/jwks.json`), {
  cacheMaxAge: 600000,
  timeoutDuration: 5000,
  cooldownDuration: 30000,
});

/**
 * Attempts to authenticate by checking if there is an authentication token present in the cookies
 * and verifying its signature.
 *
 * The not authenticated status code is always 401 so that the client can be redirected to the login page.
 *
 * @param event The API Gateway event
 * @returns A promise with the authentication result
 */
export async function authenticateToken(event: APIGatewayRequestAuthorizerEvent): Promise<AuthenticationResult> {
  const cookieHeader = event.headers && (event.headers['cookie'] || event.headers['Cookie']);
  if (!cookieHeader) {
    console.info(`JWT token is missing.`);
    return notAuthenticatedResult(event, 'JWT token is missing.');
  }

  const cookies: string[] = cookieHeader.split(';');
  const token = getTokenFromCookies(cookies);

  if (!token) {
    console.info(`JWT token is missing.`);
    return notAuthenticatedResult(event, 'JWT token is missing.');
  }
  try {
    const verificationResult: jose.JWTVerifyResult = await jose.jwtVerify(token, client, {
      issuer: `${getEnv('AUTH0_URL')}/`,
      audience: getEnv('AUTH0_CLIENT_ID'),
    });
    const user = userFromAuthClaims(verificationResult.payload as any);
    return authenticatedResult(event, user.id);
  } catch (error: any) {
    console.error(error);
    switch (error.code) {
      case 'ERR_JWT_EXPIRED':
        return notAuthenticatedResult(event, 'JWT expired');
      case 'ERR_JWS_INVALID':
        return notAuthenticatedResult(event, 'JWT invalid or modified');
      case 'ERR_JWT_CLAIM_VALIDATION_FAILED':
        return notAuthenticatedResult(event, 'JWT claim validation failed.');
      default:
        return notAuthenticatedResult(event, 'Unspecified error validating JWT.');
    }
  }
}

// extract and return Cookie from the Lambda event parameters
function getTokenFromCookies(cookies: string[]): string | undefined {
  const tokenCookie = cookies.find((cookie: string) => cookie.startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : tokenCookie;
}
