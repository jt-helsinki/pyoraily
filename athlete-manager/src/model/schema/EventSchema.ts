/*
 *
 * MIT License.
 *
 */
import * as Yup from 'yup';

export const EventSchema = Yup.object({
  name: Yup.string().required('Event name is required').max(100, 'Event name must be less than 50 characters'),
  country: Yup.string().required('Country is required'),
  discipline: Yup.string().required('Discipline is required'),
  category: Yup.string().required('Category is required'),
  eventClass: Yup.string().required('Class is required'),
  eventDate: Yup.date().required('Event date is required'),
  notes: Yup.string().notRequired().max(250, 'Notes must be less than 250 characters'),
});
