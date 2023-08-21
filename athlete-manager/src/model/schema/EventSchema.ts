/*
 *
 * MIT License.
 *
 */
import {
  CATEGORIES,
  CLASSES,
  COUNTRIES_COMMON,
  COUNTRIES_MOST_COMMON,
  COUNTRIES_UNCOMMON,
  DISCIPLINES,
} from 'pyoraily-shared-frontend/lib/constants';
import * as Yup from 'yup';

const categoryValues: string[] = CATEGORIES.map((category) => category.value);
const eventClassValues: string[] = CLASSES.map((eventClass) => eventClass.value);
const disciplineValues: string[] = DISCIPLINES.map((discipline) => discipline.value);
const countryValues: string[] = [...COUNTRIES_MOST_COMMON, ...COUNTRIES_COMMON, ...COUNTRIES_UNCOMMON].map(
  (country) => country.value
);

export const EventSchema = Yup.object({
  name: Yup.string().required('Event name is required').max(100, 'Event name must be less than 50 characters'),
  country: Yup.mixed().oneOf(countryValues, 'A valid country is required').required('Country is required'),
  discipline: Yup.mixed().oneOf(disciplineValues, 'A valid discipline is required').required('Discipline is required'),
  category: Yup.mixed().oneOf(categoryValues, 'A valid category is required').required('Category is required'),
  eventClass: Yup.mixed()
    .oneOf(eventClassValues, 'A valid event class is required')
    .required('Event class is required'),
  eventDate: Yup.date().required('Event date is required'),
  notes: Yup.string().notRequired().max(250, 'Notes must be less than 250 characters'),
});
