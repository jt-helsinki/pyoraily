/*
 *
 * MIT License.
 *
 */
import { UserEditFormModelSchema } from '@src/model/schema/UserFormSchemas';
import { User } from 'pyoraily-shared-frontend/model/User';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import * as UserFormUtils from '@src/react/components/users/UserFormUtils';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Button, Dropdown, Form, Input, Label, Modal, Radio } from 'semantic-ui-react';
import { DropdownItemProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/DropdownItem';

interface Props {
  isSubmitting: boolean;

  title: string;

  description: string;

  disableNameAndEmail?: boolean;

  user: User;

  errorMessage?: string;

  onSubmit: (values: User) => void;

  onCancel: () => void;

  userRoles: UserRole[];
}

export const UserUpsertForm: React.FunctionComponent<Props> = (props: Props): React.ReactElement<Props> | null => {
  const mappedUserRoles = React.useMemo(
    (): DropdownItemProps[] => props.userRoles.map(UserFormUtils.userRoleToMultiSelectItem),
    [props.userRoles]
  );
  return (
    <>
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{props.description}</Modal.Description>
        <Formik
          validateOnChange={true}
          validateOnBlur={true}
          enableReinitialize={true}
          initialValues={props.user}
          validationSchema={UserEditFormModelSchema}
          onSubmit={(values: User): void => {
            props.onSubmit(values);
          }}>
          {(formik: FormikProps<User>): React.ReactElement => {
            const { values, setFieldValue, submitForm, submitCount, errors, dirty, isValid, touched, setTouched } =
              formik;
            return (
              <Form id="user-upsert-form">
                <Form.Field
                  control={Input}
                  type="text"
                  required={true}
                  fluid={true}
                  id="user-upsert-form-first-name"
                  name="firstName"
                  label="First name"
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
                <Form.Field
                  control={Input}
                  type="text"
                  required={true}
                  fluid={true}
                  id="user-upsert-form-last-name"
                  name="lastName"
                  label="Last name"
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
                <Form.Field
                  control={Input}
                  type="text"
                  required={true}
                  fluid={true}
                  id="user-upsert-form-email"
                  name="email"
                  label="Email"
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
                <Form.Field required={true}>
                  <label>Roles</label>
                  <Dropdown
                    id="user-upsert-form-user-roles"
                    name="userRoles"
                    placeholder="Roles"
                    fluid={true}
                    multiple={true}
                    selection
                    options={mappedUserRoles}
                    disabled={props.isSubmitting}
                    defaultValue={values.userRoles}
                    error={errors.userRoles as any}
                    onChange={(event: any, data: any) => {
                      setTouched({ userRoles: true });
                      setFieldValue('userRoles', data.value, true);
                    }}
                  />
                  {errors.userRoles && (submitCount > 0 || touched.userRoles) ? (
                    <Label prompt pointing="above">
                      {errors.userRoles}
                    </Label>
                  ) : null}
                </Form.Field>
                <Form.Group inline={true} unstackable={false}>
                  <label>Status</label>
                  <Form.Field
                    control={Radio}
                    label="Active"
                    value="Active"
                    name="status"
                    disabled={props.isSubmitting}
                    checked={values.status === 'Active'}
                    onClick={() => {
                      setTouched({ status: true });
                      setFieldValue('status', 'Active', true);
                    }}
                  />
                  <Form.Field
                    control={Radio}
                    label="Blocked"
                    value="Blocked"
                    name="status"
                    disabled={props.isSubmitting}
                    checked={values.status === 'Blocked'}
                    onClick={() => {
                      setTouched({ status: true });
                      setFieldValue('status', 'Blocked', true);
                    }}
                  />
                </Form.Group>
                <Button secondary={true} onClick={props.onCancel}>
                  Cancel
                </Button>
                <Button primary={true} onClick={submitForm} disabled={!dirty || (dirty && !isValid)}>
                  Save
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Modal.Content>
    </>
  );
};

UserUpsertForm.defaultProps = {
  disableNameAndEmail: false,
};
