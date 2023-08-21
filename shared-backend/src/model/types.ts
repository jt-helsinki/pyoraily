/*
 *
 * MIT License.
 *
 */

export type SelectOptionType = {
  key: string;
  value: string;
  text: string;
};

export type DisciplineType = 'MTB' | 'Road' | 'CX' | 'DH' | 'Enduro' | 'BMX' | 'Track' | 'E-Racing' | 'Gravel';

export type EventTypes = {
  [K in DisciplineType]: SelectOptionType[];
};

export type FormActionType = 'create' | 'edit' | 'view';
