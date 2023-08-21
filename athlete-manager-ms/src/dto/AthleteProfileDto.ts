/*
 *
 * MIT License.
 *
 */
import { Optional } from '@nestjs/common';
import { AthleteProfile } from '@src/model/AthleteProfile';
import { Event } from '@src/model/Event';
import { Result } from '@src/model/Result';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsDate,
  IsIn,
  IsInt,
  IsPositive,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  registerDecorator,
  ValidateNested,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import {
  CATEGORIES,
  CLASSES,
  COUNTRIES_COMMON,
  COUNTRIES_MOST_COMMON,
  COUNTRIES_UNCOMMON,
  DISCIPLINES,
  EVENT_TYPES,
} from 'pyoraily-shared-backend/model/constants';
import { DisciplineType } from 'pyoraily-shared-backend/model/types';
import { Gender } from 'pyoraily-shared-backend/model/user/User';
import { COURSE_PROFILES } from '../../../shared-frontend/src/lib/constants';

const categoryValues: string[] = CATEGORIES.map((category) => category.value);
const eventClassValues: string[] = CLASSES.map((eventClass) => eventClass.value);
const disciplineValues: string[] = DISCIPLINES.map((discipline) => discipline.value);
const countryValues: string[] = [...COUNTRIES_MOST_COMMON, ...COUNTRIES_COMMON, ...COUNTRIES_UNCOMMON].map(
  (country) => country.value
);

const eventTypeValues = Object.keys(EVENT_TYPES).reduce((accumulator, eventType) => {
  const eventValues = EVENT_TYPES[eventType].map((event) => event.value);
  return accumulator.concat(eventValues);
}, []);

const courseProfileValues = Object.keys(COURSE_PROFILES).reduce((accumulator, eventType) => {
  const eventValues = COURSE_PROFILES[eventType].map((event) => event.value);
  return accumulator.concat(eventValues);
}, []);

export function IsPlacing(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPlacing',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value === 'DNF' || value === 'DNS' || value === 'DSQ') return true;
          const numberValue = Number(value);
          return Number.isInteger(numberValue) && numberValue > 0;
        },
      },
    });
  };
}

export class AthleteProfileDto implements AthleteProfile {
  @MaxLength(100, { message: '_id is too long' })
  @MinLength(2, { message: '_id is too short' })
  _id: string;

  @Optional()
  @MaxLength(100, { message: '_id is too long' })
  @MinLength(2, { message: '_id is too short' })
  id?: string;

  @MaxLength(100, { message: 'User ID is too long' })
  @MinLength(2, { message: 'User ID is too short' })
  userID: string;

  @MaxLength(100, { message: 'First name is too long' })
  @MinLength(2, { message: 'First name is too short' })
  firstName: string;

  @MaxLength(100, { message: 'Last name is too long' })
  @MinLength(2, { message: 'Last name is too short' })
  lastName: string;

  @IsInt()
  @IsPositive()
  @Max(new Date().getFullYear() - 14, { message: 'Year of birth is too late.' })
  @Min(new Date().getFullYear() - 70, { message: 'Year of birth is too early.' })
  yearOfBirth: number;

  @IsIn([Gender.MALE, Gender.FEMALE], {
    each: true,
  })
  gender: Gender;

  @IsInt()
  @IsPositive()
  @Max(new Date().getFullYear() + 1, { message: 'Year is too late.' })
  @Min(new Date().getFullYear() - 5, { message: 'Year is too early.' })
  year: number;

  @IsIn(categoryValues, {
    each: true,
  })
  nominatedCategory: string;

  @IsIn(disciplineValues, {
    each: true,
  })
  nominatedDisciplines: string[];

  @ValidateNested({
    each: true,
  })
  @Type(() => EventDto)
  @ArrayMaxSize(50)
  events: EventDto[];
}

class EventDto implements Event {
  @MaxLength(100)
  @MinLength(2)
  name: string;

  @IsIn(eventClassValues)
  eventClass: string;

  @IsIn(countryValues)
  country: string;

  @IsIn(disciplineValues)
  discipline: DisciplineType;

  @IsIn(categoryValues)
  category: string;

  @IsDate()
  @Type(() => Date)
  eventDate: Date;

  @MaxLength(250)
  notes: string;

  @ValidateNested({
    each: true,
  })
  @Type(() => ResultDto)
  @ArrayMaxSize(20)
  results: ResultDto[];
}

class ResultDto implements Result {
  @IsIn(courseProfileValues, {
    each: true,
  })
  courseProfile: string;

  @IsInt()
  @IsPositive()
  distance: number;

  @IsIn(['km', 'laps', 'm'])
  distanceUnit: 'km' | 'laps' | 'm';

  @IsInt()
  @IsPositive()
  numberOfFinishers: number;

  @IsInt()
  @IsPositive()
  numberOfStarters: number;

  @IsPlacing({ message: 'Placing is not a valid placing or DNS, DNF or DSQ.' })
  placing: number | 'DNF' | 'DNS' | 'DSQ';

  @IsIn(eventTypeValues, {
    each: true,
  })
  raceType: string;

  @IsDate({ message: 'Result date is not a valid date.' })
  @Type(() => Date)
  resultDate: Date;

  @MaxLength(8)
  @Matches(RegExp(/^(\d{2}):(\d{2}):(\d{2})$/))
  timeBehind: string;

  @MaxLength(250)
  notes: string;
}
