/*
 *
 * MIT License.
 *
 */
export interface Result {
  placing: number;
  distance: number;
  distanceUnit: 'km' | 'laps' | 'm';
  numberOfStarters: number;
  numberOfFinishers: number;
  timeBehind: string;
  resultDate: Date;
  raceType: string;
  courseProfile: string;
  notes: string;
  isEditable?: boolean;
}
