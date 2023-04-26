/*
 *
 * MIT License.
 *
 */

import * as Yup from 'yup';

export const SelectedDisciplineSchema = Yup.object().shape({
  nominatedCategory: Yup.string().required('A nominated discipline is required'),
  nominatedDisciplines: Yup.array()
    .min(1, 'Please select at least one discipline')
    .required('Please select at least one discipline'),
});
