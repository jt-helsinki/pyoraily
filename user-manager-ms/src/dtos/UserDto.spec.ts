import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { UserDto } from '@src/dtos/UserDto';
import { UserStatus } from 'pyoraily-shared-backend/model/user/UserStatus';

describe('UserUpdateDto', () => {
  const validationPipe = new ValidationPipe({ transform: true });

  it('Should convert input data to dto object', async () => {
    const userUpdateInput = {
      firstName: 'test',
      lastName: 'name',
      email: 'test.name@example.com',
      status: UserStatus.Active,
    };
    const userData: UserDto = await validationPipe.transform(userUpdateInput, {
      type: 'body',
      metatype: UserDto,
    });
    expect(userData.firstName).toBe('test');
    expect(userData.lastName).toBe('name');
    expect(userData.email).toBe('test.name@example.com');
  });

  it('Should raise BadRequestException for invalid email', async () => {
    const userUpdateInput = {
      firstName: 'test',
      lastName: 'name',
      email: 'invalid-email',
      status: UserStatus.Active,
    };
    try {
      await validationPipe.transform(userUpdateInput, {
        type: 'body',
        metatype: UserDto,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Should raise BadRequestException for invalid name', async () => {
    const userUpdateInput = {
      firstName: 'test',
      lastName: 'name123',
      email: 'test.name@example.com',
      status: UserStatus.Active,
    };
    try {
      await validationPipe.transform(userUpdateInput, {
        type: 'body',
        metatype: UserDto,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
