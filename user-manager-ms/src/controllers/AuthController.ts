/*
 *
 * MIT License.
 *
 */
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserEntity } from '@src/entities/UserEntity';
import { Auth0Service } from '@src/services/Auth0Service';
import { UserService } from '@src/services/UserService';
import { User } from 'pyoraily-shared-backend/model/user/User';
import getCookieOptions from 'pyoraily-shared-backend/utils/cookie';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: Auth0Service, private readonly usersService: UserService) {}

  @Post('/authorize')
  async authorize(@Body() body, @Res() response: Response): Promise<Response<User>> {
    const { id_token, claims } = await this.authService.authorize(body.code, body.state);
    const userEntity = UserEntity.fromAuthClaims(claims);
    const user = await this.usersService.getUser(userEntity.id);
    response.header('Access-Control-Allow-Credentials', 'true');

    const cookieOptions = getCookieOptions(claims.exp);
    response.cookie('token', id_token, cookieOptions);
    response.setHeader('authorization', `Bearer ${id_token}`);
    response.status(HttpStatus.OK);
    return response.send({ user });
  }

  @Post('/logout')
  logout(@Res() response: Response): Response {
    response.clearCookie('token');
    return response.send();
  }
}
