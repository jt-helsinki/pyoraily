/*
 *
 * MIT License.
 *
 */
import { Event } from './Event';

export interface AthleteProfile {
  id?: string;
  userID?: string;
  firstName: string;
  lastName: string;
  yearOfBirth: number;
  gender: 'male' | 'female';
  year: number;
  nominatedCategory: string;
  nominatedDisciplines: string[];
  events: Event[];
}
