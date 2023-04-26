/*
 *
 * MIT License.
 *
 */
import { Inject, Injectable } from '@nestjs/common';
import { AuthDao } from '@src/dao/AuthDao';
import { Auth0User } from 'pyoraily-shared-backend/model/auth0/Auth0User';
import { AuthorizeResponse } from 'pyoraily-shared-backend/model/auth0/AuthorizeResponse';

@Injectable()
export class Auth0Service {
  constructor(
    @Inject(AuthDao)
    private readonly authRepository: AuthDao
  ) {}

  authorize(code: string, state: string): Promise<AuthorizeResponse> {
    return this.authRepository.authorize(code, state);
  }

  getUsers(): Promise<Auth0User[]> {
    return this.authRepository.getUsers();
  }

  getUser(id: string): Promise<Auth0User> {
    return this.authRepository.getUser(id);
  }

  blockUser(id: string): Promise<Auth0User> {
    return this.authRepository.blockUser(id);
  }

  unblockUser(id: string): Promise<Auth0User> {
    return this.authRepository.unblockUser(id);
  }

  updateUser(id: string, user: Partial<Auth0User>): Promise<Auth0User> {
    return this.authRepository.updateUser(id, user);
  }
}
