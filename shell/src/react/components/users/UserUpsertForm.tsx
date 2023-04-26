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
import { Button, Dropdown, Form, Modal, Radio } from 'semantic-ui-react';
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
          {(formik: FormikProps<User>): React.ReactElement => (
            <Form id="user-upsert-form">
              <Form.Input
                type="text"
                required={true}
                id="user-upsert-form-first-name"
                name="firstName"
                label="First name"
                value={formik.values.firstName}
                disabled={props.isSubmitting}
                error={formik.errors.firstName}
                onChange={formik.handleChange}
              />
              <Form.Input
                type="text"
                required={true}
                id="user-upsert-form-last-name"
                name="lastName"
                label="Last name"
                value={formik.values.lastName}
                disabled={props.isSubmitting}
                error={formik.errors.lastName}
                onChange={formik.handleChange}
              />
              <Form.Input
                type="text"
                required={true}
                id="user-upsert-form-email"
                name="email"
                label="Email"
                value={formik.values.email}
                disabled={props.isSubmitting}
                error={formik.errors.email}
                onChange={formik.handleChange}
              />
              <Form.Field>
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
                  defaultValue={formik.values.userRoles}
                  error={formik.errors.userRoles as any}
                  onChange={(event: any, data: any) => formik.setFieldValue('userRoles', data.value, false)}
                />
              </Form.Field>
              <Form.Group inline={true} unstackable={false}>
                <label>Status</label>
                <Form.Field
                  control={Radio}
                  label="Active"
                  value="Active"
                  name="status"
                  disabled={props.isSubmitting}
                  checked={formik.values.status === 'Active'}
                  onClick={() => formik.setFieldValue('status', 'Active', false)}
                />
                <Form.Field
                  control={Radio}
                  label="Blocked"
                  value="Blocked"
                  name="status"
                  disabled={props.isSubmitting}
                  checked={formik.values.status === 'Blocked'}
                  onClick={() => formik.setFieldValue('status', 'Blocked', false)}
                />
              </Form.Group>
              <Button secondary={true} onClick={props.onCancel}>
                Cancel
              </Button>
              <Button primary={true} onClick={formik.submitForm}>
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Content>
    </>
  );
};

UserUpsertForm.defaultProps = {
  disableNameAndEmail: false,
};
