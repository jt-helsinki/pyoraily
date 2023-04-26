/*
 *
 * MIT License.
 *
 */
import * as Yup from 'yup';

export const CURRENT_YEAR = new Date().getFullYear();
export const MAX_YEAR = CURRENT_YEAR - 10;
export const MIN_YEAR = CURRENT_YEAR - 75;

export const ProfileEditFormModelSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name is too short')
    .max(128, 'First name is too long'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name is too short')
    .max(128, 'Last name is too long'),
  email: Yup.string().required('Email is required').email(),
  gender: Yup.mixed().oneOf(['male', 'female', 'na']),
  yearOfBirth: Yup.number().integer().max(MAX_YEAR).min(MIN_YEAR),
  uciId: Yup.number().positive().integer('UCI ID must contain digits only.').max(999999999999).min(0),
});
