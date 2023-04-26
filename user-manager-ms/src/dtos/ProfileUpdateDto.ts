/*
 *
 * MIT License.
 *
 */
import { Gender } from 'pyoraily-shared-backend/model/user/User';
import { IsEmail, IsIn, IsInt, IsOptional, IsPositive, MaxLength, MinLength } from 'class-validator';

export class ProfileUpdateDto {
  @IsEmail()
  email: string;

  @MaxLength(128, { message: 'First name is too long' })
  @MinLength(2, { message: 'First name is too long' })
  firstName: string;

  @MaxLength(128, { message: 'Last name is too long' })
  @MinLength(2, { message: 'Last name is too long' })
  lastName: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  yearOfBirth?: number;

  @IsOptional()
  @IsIn(['male', 'female', 'na'])
  gender?: Gender;

  @IsOptional()
  @IsInt()
  @IsPositive()
  uciId?: number;
}
