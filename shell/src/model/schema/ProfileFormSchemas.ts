/*
 *
 * MIT License.
 *
 */
import * as Yup from 'yup';

export const CURRENT_YEAR = new Date().getFullYear();
export const MAX_YEAR = CURRENT_YEAR - 14;
export const MIN_YEAR = CURRENT_YEAR - 70;

export const ProfileEditFormModelSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name is too short')
    .max(100, 'First name is too long'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name is too short')
    .max(100, 'Last name is too long'),
  email: Yup.string().required('A valid email is required').email(),
  gender: Yup.mixed().oneOf(['male', 'female'], 'Gender is required'),
  yearOfBirth: Yup.number()
    .integer()
    .max(MAX_YEAR, `Year of birth must be ${MAX_YEAR} or earlier.`)
    .min(MIN_YEAR, `Year of birth must be ${MIN_YEAR} or later.`),
  uciId: Yup.number()
    .positive('UCI ID is invalid and must contain digits only.')
    .integer('UCI ID is invalid and must contain digits only.')
    .max(99999999999999, 'UCI ID is invalid and must contain digits only.')
    .min(0, 'UCI ID is invalid and must contain digits only.'),
});
