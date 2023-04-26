import { ValidationPipe } from '@nestjs/common';
import { UserDto } from '@src/dtos/UserDto';
import { UserEntity } from '@src/entities/UserEntity';
import { ATHLETE_MOCK_USER_ENTITY } from '@src/mocks/user.mock';
import { Gender } from 'pyoraily-shared-backend/model/user/User';
import { UserRole } from 'pyoraily-shared-backend/model/user/UserRole';
import { UserStatus } from 'pyoraily-shared-backend/model/user/UserStatus';

describe('UserEntity', () => {
  const validationPipe = new ValidationPipe({ transform: true });

  it('Should create user entity from user create dto', async () => {
    const userCreateInput = {
      firstName: 'test',
      lastName: 'name',
      email: 'test.name@example.com',
      status: UserStatus.Active,
      userRoles: [],
    };
    const userUpdateDto: UserDto = await validationPipe.transform(userCreateInput, {
      type: 'body',
      metatype: UserDto,
    });
    const userEntity = UserEntity.fromUserDto(userUpdateDto);
    expect(userEntity).toEqual({
      firstName: 'test',
      lastName: 'name',
      status: UserStatus.Active,
      userRoles: [],
      email: 'test.name@example.com',
    });
  });

  it('Should create user entity from user update dto', async () => {
    const userUpdateInput = {
      firstName: 'test',
      lastName: 'name',
      email: 'test.name@example.com',
      status: UserStatus.Active,
      userRoles: ['mock-user-role-id'],
    };
    const userUpdateDto: UserDto = await validationPipe.transform(userUpdateInput, {
      type: 'body',
      metatype: UserDto,
    });
    const userEntity = UserEntity.fromUserDto(userUpdateDto);
    expect(userEntity).toEqual({
      firstName: 'test',
      lastName: 'name',
      status: UserStatus.Active,
      userRoles: ['mock-user-role-id'],
      email: 'test.name@example.com',
    });
  });

  it('Should create user entity from auth0 user', () => {
    const userEntity = UserEntity.fromProfileUpdateDto(ATHLETE_MOCK_USER_ENTITY, {
      email: 'test@test.com',
      firstName: 'Mud',
      lastName: 'Flap',
      yearOfBirth: 2009,
      uciId: 123455632,
      gender: Gender.NA,
    });
    expect(userEntity).toEqual({
      firstName: 'Mud',
      lastName: 'Flap',
      email: 'test@test.com',
      yearOfBirth: 2009,
      uciId: 123455632,
      gender: 'na',
      userRoles: [UserRole.ATHLETE],
    });
  });
});
