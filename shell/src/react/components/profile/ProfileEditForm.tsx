/*
 *
 * MIT License.
 *
 */
import * as UserUtils from 'pyoraily-shared-frontend/utils/UserUtils';
import { MIN_YEAR, ProfileEditFormModelSchema } from '@src/model/schema/ProfileFormSchemas';
import { User } from 'pyoraily-shared-frontend/model/User';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Button, Dimmer, Dropdown, Form, Header, Label, Loader, Modal, Radio } from 'semantic-ui-react';

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
        {(formik: FormikProps<User>): React.ReactElement => (
          <Form id="profile-update-form">
            <Form.Field>
              <label>First Name</label>
              <Form.Input
                type="text"
                required={true}
                id="profile-update-form-first-name"
                name="firstName"
                value={formik.values.firstName}
                disabled={props.isSubmitting}
                onChange={formik.handleChange}
                error={
                  formik.errors.firstName && (formik.submitCount > 0 || formik.touched.firstName)
                    ? { content: formik.errors.firstName, pointing: 'above' }
                    : false
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <Form.Input
                type="text"
                required={true}
                id="profile-update-form-last-name"
                name="lastName"
                value={formik.values.lastName}
                disabled={props.isSubmitting}
                onChange={formik.handleChange}
                error={
                  formik.errors.lastName && (formik.submitCount > 0 || formik.touched.lastName)
                    ? { content: formik.errors.lastName, pointing: 'above' }
                    : false
                }
              />
            </Form.Field>
            {isAthlete ? (
              <>
                <Form.Group inline={true} unstackable={false}>
                  <label>Gender</label>
                  <Form.Field
                    control={Radio}
                    label="Male"
                    value="male"
                    name="gender"
                    disabled={props.isSubmitting}
                    checked={formik.values.gender === 'male'}
                    onClick={() => formik.setFieldValue('gender', 'male', false)}
                    error={!!(formik.errors.gender && (formik.submitCount > 0 || formik.touched.gender))}
                  />
                  <Form.Field
                    control={Radio}
                    label="Female"
                    value="female"
                    name="gender"
                    disabled={props.isSubmitting}
                    checked={formik.values.gender === 'female'}
                    onClick={() => formik.setFieldValue('gender', 'female', false)}
                    error={!!(formik.errors.gender && (formik.submitCount > 0 || formik.touched.gender))}
                  />
                  {formik.errors.gender && (formik.submitCount > 0 || formik.touched.gender) ? (
                    <Label prompt pointing="above">
                      {formik.errors.gender}
                    </Label>
                  ) : null}
                </Form.Group>
                <Form.Field>
                  <label>Year of Birth</label>
                  <Dropdown
                    placeholder="Year of Birth"
                    selection
                    options={years}
                    defaultValue={formik.values.yearOfBirth}
                    disabled={props.isSubmitting}
                    onChange={(event: any, data: any) => formik.setFieldValue('yearOfBirth', data.value, false)}
                    error={!!(formik.errors.yearOfBirth && (formik.submitCount > 0 || formik.touched.yearOfBirth))}
                  />
                  {formik.errors.yearOfBirth && (formik.submitCount > 0 || formik.touched.yearOfBirth) ? (
                    <Label prompt pointing="above">
                      {formik.errors.yearOfBirth}
                    </Label>
                  ) : null}
                </Form.Field>
              </>
            ) : null}
            <Form.Field>
              <label>Email</label>
              <Form.Input
                type="text"
                required={true}
                id="profile-update-form-email"
                name="email"
                value={formik.values.email}
                disabled={props.isSubmitting}
                onChange={formik.handleChange}
                error={
                  formik.errors.email && (formik.submitCount > 0 || formik.touched.email)
                    ? { content: formik.errors.email, pointing: 'above' }
                    : false
                }
              />
            </Form.Field>
            <Form.Field>
              <label>UCI ID</label>
              <Form.Input
                type="number"
                required={true}
                id="profile-update-form-uci-id"
                name="uciId"
                value={formik.values.uciId}
                disabled={props.isSubmitting}
                onChange={formik.handleChange}
                error={
                  formik.errors.uciId && (formik.submitCount > 0 || formik.touched.uciId)
                    ? { content: formik.errors.uciId, pointing: 'above' }
                    : false
                }
              />
            </Form.Field>
            <Button secondary={true} onClick={props.onCancel}>
              Cancel
            </Button>
            <Button primary={true} onClick={formik.submitForm}>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
