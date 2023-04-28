/*
 *
 * MIT License.
 *
 */
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileUpdateDto } from '@src/dtos/ProfileUpdateDto';
import { UserDto } from '@src/dtos/UserDto';
import { UserEntity } from '@src/entities/UserEntity';
import { UserRoleService } from '@src/services/UserRoleService';
import { UserService } from '@src/services/UserService';
import { RolesRequired } from 'pyoraily-shared-backend/decorators/RolesRequiredDecorator';
import { JwtAuthGuard } from 'pyoraily-shared-backend/guards/AuthGuard';

import { User } from 'pyoraily-shared-backend/model/user/User';
import { UserRole } from 'pyoraily-shared-backend/model/user/UserRole';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService, private readonly userRolesService: UserRoleService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  profile(@Req() request: { user: User }): Promise<User | null> {
    return this.usersService.getUser(request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/me')
  async profileUpdate(@Req() request: { user: User }, @Body() body: ProfileUpdateDto): Promise<User | null> {
    const userToSave = UserEntity.fromProfileUpdateDto(request.user as User, body);
    return this.usersService.updateProfile(request.user.id, userToSave);
  }

  @RolesRequired(UserRole.ADMIN)
  @Get('/')
  async list(@Req() request: { user: User }): Promise<User[]> {
    const users = await this.usersService.getUsers();
    const hasAdminRole = await this.userRolesService.hasRole(request.user, UserRole.ADMIN);
    if (hasAdminRole) {
      return users;
    }
    return [];
  }

  @RolesRequired(UserRole.ADMIN)
  @Get(':id')
  async get(@Param() params: { id: string }): Promise<User> {
    const user = await this.usersService.getUser(params.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @RolesRequired(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Req() request: { user: User },
    @Param() params: { id: string },
    @Body() body: UserDto
  ): Promise<User | null> {
    const canAssignRoles = await this.userRolesService.canAssignRoles(request.user as User);
    if (!canAssignRoles) {
      throw new ForbiddenException();
    }
    return this.usersService.updateUser(params.id, UserEntity.fromUserDto(body));
  }
}
