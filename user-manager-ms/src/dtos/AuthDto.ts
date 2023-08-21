/*
 *
 * Copyright (c) Vaisala Oyj. All rights reserved.
 *
 */

import { MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @MaxLength(60, { message: 'Code is too long' })
  @MinLength(1, { message: 'Code is required' })
  code: string;

  @MaxLength(100, { message: 'State is too long' })
  @MinLength(1, { message: 'State is required' })
  state: string;
}
