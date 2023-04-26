/*
 *
 * MIT License.
 *
 */
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { AuthDao } from '@src/dao/AuthDao';
import { Auth } from 'pyoraily-shared-backend/model/auth0/Auth';
import { Auth0User } from 'pyoraily-shared-backend/model/auth0/Auth0User';
import { AuthorizeResponse } from 'pyoraily-shared-backend/model/auth0/AuthorizeResponse';
import { UserRole } from 'pyoraily-shared-backend/model/user/UserRole';
import { getEnv } from 'pyoraily-shared-backend/utils/config';
import { idTokenToClaims } from '@src/utils/auth-utils';
import fetch from 'node-fetch';

export type ObjMap<K extends string, T> = {
  [key in K]: T;
} & object;

interface Auth0Role {
  id: string;
  name: string;
  description: string;
}

@Injectable()
export class Auth0DaoImpl implements AuthDao {
  constructor(private readonly logger: Logger) {}

  // TODO: state is used by auth0 as a feature. Not used atm by Auroral.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async authorize(code: string, _state: string): Promise<AuthorizeResponse> {
    const body = {
      grant_type: 'authorization_code',
      client_id: getEnv('AUTH0_CLIENT_ID'),
      client_secret: getEnv('AUTH0_CLIENT_SECRET'),
      code: code,
      redirect_uri: getEnv('AUTH0_CALLBACK_URL'),
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`${getEnv('AUTH0_URL')}/oauth/token`, options);

    if (!response.ok) {
      const error = new HttpException('Authorization error', response.status);
      this.logger.log(error.message, this.authorize.name);
      throw error;
    }

    const data: Auth = (await response.json()) as Auth;
    const claims = idTokenToClaims(data);
    return {
      id_token: data.id_token,
      claims,
    };
  }

  async getUsers(): Promise<Auth0User[]> {
    const auth = await this.getAPIToken();
    const url = `${getEnv('AUTH0_URL')}/api/v2/users`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${auth.token_type} ${auth.access_token}`,
      },
    });

    if (!response.ok) {
      const error = new HttpException('Get users list error', response.status);
      this.logger.log(error.message, this.getUsers.name);
      throw error;
    }

    return response.json() as any;
  }

  async getUser(id: string): Promise<Auth0User> {
    const auth0UserId = this.getAuth0UserId(id);
    const auth = await this.getAPIToken();
    const url = `${getEnv('AUTH0_URL')}/api/v2/users/${auth0UserId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${auth.token_type} ${auth.access_token}`,
      },
    });

    if (!response.ok) {
      const error = new HttpException('Get user error', response.status);
      this.logger.log(error.message, this.getUser.name);
      throw error;
    }

    return response.json() as any;
  }

  async blockUser(id: string): Promise<Auth0User> {
    return this.updateUser(id, { blocked: true });
  }

  async unblockUser(id: string): Promise<Auth0User> {
    return this.updateUser(id, { blocked: false });
  }

  async updateUser(id: string, data: Partial<Auth0User>): Promise<Auth0User> {
    const auth0UserId = this.getAuth0UserId(id);
    const auth = await this.getAPIToken();
    const url = `${getEnv('AUTH0_URL')}/api/v2/users/${auth0UserId}`;
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(this.dataWithoutUserRoles(data)),
      headers: {
        'Content-Type': 'application/json',
        authorization: `${auth.token_type} ${auth.access_token}`,
      },
    });

    if (!response.ok) {
      const error = new HttpException('Update user error', response.status);
      this.logger.log(error.message, this.updateUser.name);
      throw error;
    }

    if (data.user_roles) {
      const allAuth0Roles = await this.getAllAuth0Roles(auth);
      const allAuth0RolesForuser = await this.getAllAuth0RolesForAuth0User(auth, auth0UserId);
      await this.deleteAuth0RolesForAuth0User(
        auth,
        auth0UserId,
        allAuth0RolesForuser.map((role) => role.id)
      );
      const allAuth0RolesAsMap = this.getAllRolesAsMap(allAuth0Roles);

      const userRoleIds: string[] = data.user_roles
        ? data.user_roles.map((role: UserRole) => allAuth0RolesAsMap[role].id)
        : [];
      await this.updateAuth0RolesForAuth0User(auth, auth0UserId, userRoleIds);
    }
    return response.json() as any;
  }

  private dataWithoutUserRoles(data: Partial<Auth0User>) {
    const dataWithoutRoles = { ...data };
    if (data.user_roles) {
      delete dataWithoutRoles.user_roles;
    }
    return dataWithoutRoles;
  }

  private async updateAuth0RolesForAuth0User(auth: Auth, auth0UserId: string, userRoleIds: string[]) {
    if (userRoleIds?.length === 0) {
      return;
    }
    const updateRoleUrl = `${getEnv('AUTH0_URL')}/api/v2/users/${auth0UserId}/roles`;
    const response = await fetch(updateRoleUrl, {
      method: 'POST',
      body: JSON.stringify({
        roles: userRoleIds,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `${auth.token_type} ${auth.access_token}`,
      },
    });
    if (!response.ok) {
      const error = new HttpException('Update user error', response.status);
      this.logger.log(error.message, this.updateAuth0RolesForAuth0User.name);
      throw error;
    }
  }

  private async getAllAuth0Roles(auth: Auth) {
    // Get All Roles
    const getAllRolesUrl = `${getEnv('AUTH0_URL')}/api/v2/roles`;
    const response = await fetch(getAllRolesUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${auth.token_type} ${auth.access_token}`,
      },
    });

    if (!response.ok) {
      const error = new HttpException('Retrieving all auth0 roles error', response.status);
      this.logger.log(error.message, this.getAllAuth0Roles.name);
      throw error;
    }
    return response.json();
  }

  private async getAllAuth0RolesForAuth0User(auth: Auth, userId: string): Promise<Auth0Role[]> {
    // Get All Roles
    const getAllRolesForUserUrl = `${getEnv('AUTH0_URL')}/api/v2/users/${userId}/roles`;
    const response = await fetch(getAllRolesForUserUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${auth.token_type} ${auth.access_token}`,
      },
    });

    if (!response.ok) {
      const error = new HttpException('Retrieving all auth0 roles for auth0 user error', response.status);
      this.logger.log(error.message, this.getAllAuth0RolesForAuth0User.name);
      throw error;
    }
    return response.json();
  }

  private async deleteAuth0RolesForAuth0User(auth: Auth, userId: string, roleIds: string[]): Promise<void> {
    if (!roleIds.length) {
      return;
    }
    // Get All Roles
    const deleteRolesForUserUrl = `${getEnv('AUTH0_URL')}/api/v2/users/${userId}/roles`;
    const response = await fetch(deleteRolesForUserUrl, {
      method: 'DELETE',
      body: JSON.stringify({
        roles: roleIds,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `${auth.token_type} ${auth.access_token}`,
      },
    });

    if (!response.ok) {
      const error = new HttpException('Delete auth0 roles for auth0 user error', response.status);
      this.logger.log(error.message, this.deleteAuth0RolesForAuth0User.name);
      throw error;
    }
  }

  private getAllRolesAsMap(allRoles: Auth0Role[]): ObjMap<string, Auth0Role> {
    return allRoles.reduce<ObjMap<string, Auth0Role>>((previous: ObjMap<string, Auth0Role>, role: Auth0Role) => {
      return {
        ...previous,
        [role.name]: role,
      };
    }, {}) as ObjMap<string, Auth0Role>;
  }

  private async getAPIToken(): Promise<Auth> {
    const body = {
      grant_type: 'client_credentials',
      client_id: getEnv('AUTH0_CLIENT_ID'),
      client_secret: getEnv('AUTH0_CLIENT_SECRET'),
      audience: getEnv('AUTH0_MGMT_API_AUDIENCE'),
    };
    const url = `${getEnv('AUTH0_URL')}/oauth/token`;
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = new HttpException('Get API token error', response.status);
      this.logger.log(error.message, this.getAPIToken.name);
      throw error;
    }

    return response.json() as Promise<Auth>;
  }

  private getAuth0UserId(userId: string): string {
    return userId;
  }
}
