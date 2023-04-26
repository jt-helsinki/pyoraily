/*
 *
 * MIT License.
 *
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Claims } from '../model/auth0/Claims';
import { User } from '../model/user/User';
import { userFromAuthClaims } from '../utils/auth-utils';
import { getEnv } from '../utils/config';

function jwtCookieExtractor(request: Request): string | null {
  const { token } = request.cookies ?? request.headers;
  if (!token) {
    throw new UnauthorizedException();
  }
  return token;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${getEnv('AUTH0_URL')}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromExtractors([jwtCookieExtractor]),
      issuer: `${getEnv('AUTH0_URL')}/`,
      audience: getEnv('AUTH0_CLIENT_ID'),
    });
  }

  validate(claims: Claims): User {
    return userFromAuthClaims(claims);
  }
}
