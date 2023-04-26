/*
 *
 * MIT License.
 *
 */

import * as Yup from 'yup';

const placingValidation = Yup.mixed().test(
  'is-positive-integer-or-DNF',
  'Value must be a positive number or "DNF"',
  (value) => {
    if (value === 'DNF') return true;

    const numberValue = Number(value);
    return Number.isInteger(numberValue) && numberValue > 0;
  }
);

export const ResultSchema = Yup.object().shape({
  placing: placingValidation.required('Placing is required'),
  distance: Yup.number().positive().required('Distance is required'),
  distanceUnit: Yup.mixed().oneOf(['km', 'laps', 'm']).required('Distance units is required'),
  numberOfStarters: Yup.number().positive().integer().required('Number of starters is required'),
  numberOfFinishers: Yup.number().positive().integer().required('Number of finishers is required'),
  timeBehind: Yup.string()
    .matches(/^\d{2}:\d{2}:\d{2}$/, 'Time behind must be in format HH:mm:ss')
    .required('Time behind is required'),
  resultDate: Yup.date().required('Result date is required'),
  raceType: Yup.string().required('Race type is required'),
  courseProfile: Yup.string().required('Course profile is required'),
  notes: Yup.string().notRequired().max(250, 'Notes must be less than 250 characters'),
});
