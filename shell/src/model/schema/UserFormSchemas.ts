/*
 *
 * MIT License.
 *
 */
import * as Yup from 'yup';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';

export const UserEditFormModelSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name ame is required')
    .min(2, 'First name is too short')
    .max(128, 'First name is too long'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name is too short')
    .max(128, 'Last name is too long'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  userRoles: Yup.array()
    .of(Yup.mixed().oneOf([UserRole.SP, UserRole.ADMIN, UserRole.DISCIPLINE_MANAGER, UserRole.HPY, UserRole.ATHLETE]))
    .required('At least one user role is required')
    .min(1, 'At least one user role must be selected'),
});
