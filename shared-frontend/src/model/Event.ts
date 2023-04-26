/*
 *
 * MIT License.
 *
 */

import { Result } from './Result';
import { DisciplineType } from './types';
import { FlagNameValues } from 'semantic-ui-react/dist/commonjs/elements/Flag/Flag';

export interface Event {
  id?: string;
  name: string;
  discipline: DisciplineType;
  country: FlagNameValues;
  category: string;
  eventClass: string;
  eventDate: Date;
  notes: string;
  isEditable?: boolean;
  results: Result[];
}
