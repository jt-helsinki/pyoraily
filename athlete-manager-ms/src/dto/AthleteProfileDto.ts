/*
 *
 * MIT License.
 *
 */
import { Event } from '@src/model/Event';

export interface CreateAthleteProfileDto {
  _id?: string;
  userID?: string;
  year?: number;
  nominatedDisciplines?: string[];
  events?: Event[];
}

export interface UpdateAthleteProfileDto {
  _id: string;
  userID?: string;
  year?: number;
  nominatedDisciplines?: string[];
  events?: Event[];
}
