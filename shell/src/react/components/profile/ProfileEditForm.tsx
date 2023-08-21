/*
 *
 * MIT License.
 *
 */
import { FormikDebug } from '@src/react/components/common/debug/FormikDebug';
import * as UserUtils from 'pyoraily-shared-frontend/utils/UserUtils';
import { MIN_YEAR, ProfileEditFormModelSchema } from '@src/model/schema/ProfileFormSchemas';
import { User } from 'pyoraily-shared-frontend/model/User';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Button, Dimmer, Dropdown, Form, Header, Input, Label, Loader, Modal, Radio } from 'semantic-ui-react';

interface Props {
  user: User;

  userRoles: UserRole[];

  isSubmitting: boolean;

  onSave: (user: User) => void;

  onCancel: () => void;
}

const years = Array.from({ length: 65 }, (e, i) => i + MIN_YEAR)
  .map((year) => ({
    key: year,
    text: year,
    value: year,
  }))
  .reverse();

export const ProfileEditForm = (props: Props): React.ReactElement => {
  const isAthlete: boolean = UserUtils.doUserRolesIntersectRequiredUserRoles(props.userRoles, [UserRole.ATHLETE]);
  return (
    <>
      <Dimmer active={props.isSubmitting}>
        <Loader>Saving</Loader>
      </Dimmer>
      <Header as="h3">Update your profile information.</Header>
      <Formik
        validateOnChange={true}
        validateOnBlur={true}
        enableReinitialize={true}
        initialValues={props.user}
        validationSchema={ProfileEditFormModelSchema}
        onSubmit={(values: User): void => {
          props.onSave(values);
        }}>
        {(formik: FormikProps<User>): React.ReactElement => {
          const { values, setFieldValue, submitForm, submitCount, errors, touched, setTouched } = formik;
          return (
            <Form id="profile-update-form">
              <Form.Field>
                <Form.Field
                  control={Input}
                  type="text"
                  required={true}
                  id="profile-update-form-first-name"
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  disabled={props.isSubmitting}
                  onChange={(event: any, data: any) => {
                    setTouched({ firstName: true });
                    setFieldValue('firstName', data.value, true);
                  }}
                  error={
                    errors.firstName && (submitCount > 0 || touched.firstName)
                      ? { content: errors.firstName, pointing: 'above' }
                      : false
                  }
                />
              </Form.Field>
              <Form.Field
                control={Input}
                type="text"
                required={true}
                id="profile-update-form-last-name"
                label="Last Name"
                name="lastName"
                value={values.lastName}
                disabled={props.isSubmitting}
                onChange={(event: any, data: any) => {
                  setTouched({ lastName: true });
                  setFieldValue('lastName', data.value, true);
                }}
                error={
                  errors.lastName && (submitCount > 0 || touched.lastName)
                    ? { content: errors.lastName, pointing: 'above' }
                    : false
                }
              />
              <Form.Group inline={true} unstackable={false}>
                <label>Gender</label>
                <Form.Field
                  control={Radio}
                  label="Male"
                  value="male"
                  name="gender"
                  disabled={props.isSubmitting}
                  checked={values.gender === 'male'}
                  onClick={() => {
                    setTouched({ gender: true });
                    setFieldValue('gender', 'male', true);
                  }}
                  error={errors.gender && (submitCount > 0 || touched.gender)}
                />
                <Form.Field
                  control={Radio}
                  label="Female"
                  value="female"
                  name="gender"
                  disabled={props.isSubmitting}
                  checked={values.gender === 'female'}
                  onClick={() => {
                    setTouched({ gender: true });
                    setFieldValue('gender', 'female', true);
                  }}
                  error={errors.gender && (submitCount > 0 || touched.gender)}
                />
                {errors.gender && (submitCount > 0 || touched.gender) ? (
                  <Label prompt pointing="above">
                    {errors.gender}
                  </Label>
                ) : null}
              </Form.Group>
              <Form.Field>
                <label>Year of Birth</label>
                <Dropdown
                  placeholder="Year of Birth"
                  selection
                  options={years}
                  defaultValue={values.yearOfBirth}
                  disabled={props.isSubmitting}
                  onChange={(event: any, data: any) => {
                    setTouched({ yearOfBirth: true });
                    setFieldValue('yearOfBirth', data.value, false);
                  }}
                  error={!!(errors.yearOfBirth && (submitCount > 0 || touched.yearOfBirth))}
                />
                {errors.yearOfBirth && (submitCount > 0 || touched.yearOfBirth) ? (
                  <Label prompt pointing="above">
                    {errors.yearOfBirth}
                  </Label>
                ) : null}
              </Form.Field>
              <Form.Field
                control={Input}
                type="text"
                required={true}
                id="profile-update-form-email"
                label="Email"
                name="email"
                value={values.email}
                disabled={props.isSubmitting}
                onChange={(event: any, data: any) => {
                  setTouched({ email: true });
                  setFieldValue('email', data.value, true);
                }}
                error={
                  errors.email && (submitCount > 0 || touched.email)
                    ? { content: errors.email, pointing: 'above' }
                    : false
                }
              />
              <Form.Field
                control={Input}
                type="text"
                required={true}
                id="profile-update-form-uci-id"
                label="UCI ID"
                name="uciId"
                value={values.uciId}
                disabled={props.isSubmitting}
                onChange={(event: any, data: any) => {
                  setTouched({ uciId: true });
                  setFieldValue('uciId', data.value, true);
                }}
                error={
                  errors.uciId && (submitCount > 0 || touched.uciId)
                    ? { content: errors.uciId, pointing: 'above' }
                    : false
                }
              />
              <Button secondary={true} onClick={props.onCancel}>
                Cancel
              </Button>
              <Button primary={true} onClick={submitForm}>
                Save
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
