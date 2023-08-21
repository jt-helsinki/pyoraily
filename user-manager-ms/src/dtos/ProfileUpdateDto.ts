/*
 *
 * MIT License.
 *
 */
import { Gender } from 'pyoraily-shared-backend/model/user/User';
import { IsEmail, IsIn, IsInt, IsOptional, IsPositive, Max, MaxLength, Min, MinLength } from 'class-validator';

export class ProfileUpdateDto {
  @IsEmail()
  email: string;

  @MaxLength(100, { message: 'First name is too long' })
  @MinLength(2, { message: 'First name is too short' })
  firstName: string;

  @MaxLength(100, { message: 'Last name is too long' })
  @MinLength(2, { message: 'Last name is too short' })
  lastName: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Max(new Date().getFullYear() - 14, { message: 'Year of birth is too late.' })
  @Min(new Date().getFullYear() - 70, { message: 'Year of birth is too early.' })
  yearOfBirth: number;

  @IsOptional()
  @IsIn(['male', 'female', 'na'])
  gender: Gender;

  @IsOptional()
  @MaxLength(12, { message: 'UCI ID is too long' })
  @MinLength(5, { message: 'UCI ID is too short' })
  uciId: number;
}
