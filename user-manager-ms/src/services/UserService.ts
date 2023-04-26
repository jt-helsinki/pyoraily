/*
 *
 * MIT License.
 *
 */
import { Inject, Injectable } from '@nestjs/common';
import { Auth0UserEntity } from '@src/entities/Auth0UserEntity';
import { UserEntity } from '@src/entities/UserEntity';
import { Auth0Service } from '@src/services/Auth0Service';
import { Auth0User } from 'pyoraily-shared-backend/model/auth0/Auth0User';
import { User } from 'pyoraily-shared-backend/model/user/User';
import { withoutProperties } from 'pyoraily-shared-backend/utils/obj-utils';

/** Properties that are determined by an identity provider such as Azure AD. */
const propertiesRuledByIdP: readonly string[] = Object.freeze(['email']);

@Injectable()
export class UserService {
  constructor(
    @Inject(Auth0Service)
    private readonly authService: Auth0Service
  ) {}

  async getUsers(): Promise<User[]> {
    const auth0Users: Auth0User[] = await this.authService.getUsers();
    return auth0Users.map((user: Auth0User) => {
      return UserEntity.fromAuth0User(user);
    });
  }

  async getUser(userId: string): Promise<User | null> {
    const auth0User: Auth0User = await this.authService.getUser(userId);
    return !!auth0User ? UserEntity.fromAuth0User(auth0User) : null;
  }

  async updateProfile(id: string, user: Partial<User>): Promise<User | null> {
    let userProps: Partial<User> = user;
    if (isFromIdentityProvider(id)) {
      // Omit properties determined by IdP
      userProps = withoutProperties(user, propertiesRuledByIdP);
    }

    const auth0User = Auth0UserEntity.fromProfileUser(userProps as User);
    const updatedAuth0User: Auth0User = await this.authService.updateUser(id, auth0User);
    return !!updatedAuth0User ? UserEntity.fromAuth0User(updatedAuth0User) : null;
  }

  async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    const auth0User = Auth0UserEntity.fromUser(user as User);
    return this.update(id, auth0User);
  }

  private async update(id: string, auth0User: Auth0User): Promise<User | null> {
    let userProps: Partial<Auth0User> = auth0User;
    if (isFromIdentityProvider(id)) {
      // Omit properties determined by IdP
      userProps = withoutProperties(userProps, propertiesRuledByIdP);
    }
    const updatedAuth0User: Auth0User = await this.authService.updateUser(id, userProps);
    return !!updatedAuth0User ? UserEntity.fromAuth0User(updatedAuth0User) : null;
  }
}

/**
 * Determines if the id is from an external identity provider or not.
 * @param id Id to evaluate
 * @returns True if the id is from an external identity provider, false otherwise
 */
function isFromIdentityProvider(id: string): boolean {
  const match = id.match(/google-oauth\|.+/);
  return !!match;
}
