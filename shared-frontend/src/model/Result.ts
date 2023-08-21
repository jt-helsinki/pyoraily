/*
 *
 * MIT License.
 *
 */
export interface Result {
  placing: number | null;
  distance: number | null;
  distanceUnit: 'km' | 'laps' | 'm';
  numberOfStarters: number | null;
  numberOfFinishers: number | null;
  timeBehind: string;
  resultDate: Date;
  raceType: string;
  courseProfile: string;
  notes: string;
  isEditable?: boolean;
}
