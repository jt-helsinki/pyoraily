/*
 *
 * MIT License.
 *
 */
import { AthleteProfile } from '@src/model/AthleteProfile';
import { Event } from '@src/model/Event';
import { Gender } from 'pyoraily-shared-backend/model/user/User';

export const mockAthleteProfile: AthleteProfile = {
  id: '123456789',
  userID: '123456789',
  year: 2023,
  firstName: 'John',
  lastName: 'Doe',
  yearOfBirth: 2000,
  gender: Gender.MALE,
  nominatedCategory: 'Junior',
  nominatedDisciplines: [] as string[],
  events: [] as Event[],
};
