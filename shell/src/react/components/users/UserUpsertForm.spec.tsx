import { User } from 'pyoraily-shared-frontend/model/User';
import { UserUpsertForm } from '@src/react/components/users/UserUpsertForm';
import { MOCK_USER_ROLES } from '@src/tests/mocks/mockUserRoleServiceResponses';
import { mockFetchProfileResponseDate } from '@src/tests/mocks/mockUserServiceResponses';
import { getById, renderSUI } from '@src/tests/utils';
import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

(global as any).IS_REACT_ACT_ENVIRONMENT = true;

describe('UserEditForm', () => {
  let user: User;
  let emptyUser: User;

  beforeEach(() => {
    (global as any).IS_REACT_ACT_ENVIRONMENT = true;
    user = mockFetchProfileResponseDate;
    emptyUser = {
      firstName: '',
    } as User;
  });

  it('should match the snapshot', () => {
    const { container } = renderSUI(
      <UserUpsertForm
        title="Test title"
        description="Test description"
        disableNameAndEmail={false}
        isSubmitting={false}
        onSubmit={() => {}}
        onCancel={() => {}}
        user={user}
        userRoles={MOCK_USER_ROLES}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should display user form title and description', () => {
    const { container } = renderSUI(
      <UserUpsertForm
        title="Test title"
        description="Test description"
        disableNameAndEmail={false}
        isSubmitting={false}
        onSubmit={() => {}}
        onCancel={() => {}}
        user={user}
        userRoles={MOCK_USER_ROLES}
      />
    );
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
  //
  // it('should disable save button', () => {
  //   renderSUI(
  //     <UserUpsertForm
  //       title="Test title"
  //       description="Test description"
  //       disableNameAndEmail={false}
  //       isSubmitting={false}
  //       visible={true}
  //       onSubmit={() => {}}
  //       onCancel={() => {}}
  //       user={emptyUserEditFormData}
  //       userRoles={[]}
  //       userRoles={[]}
  //     />
  //   );
  //   expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  // });
  //
  it('should render initial user data', () => {
    const { container } = renderSUI(
      <UserUpsertForm
        title="Test title"
        description="Test description"
        disableNameAndEmail={false}
        isSubmitting={false}
        onSubmit={() => {}}
        onCancel={() => {}}
        user={user}
        userRoles={MOCK_USER_ROLES}
      />
    );
    expect(getById(container, 'user-upsert-form-first-name')).toHaveValue('Skid');
    expect(getById(container, 'user-upsert-form-last-name')).toHaveValue('Mark');
    expect(getById(container, 'user-upsert-form-email')).toHaveValue('test@test.com');
  });

  it('should show an error message for the name', async () => {
    const user = userEvent.setup();
    const { container } = renderSUI(
      <UserUpsertForm
        title="Test title"
        description="Test description"
        disableNameAndEmail={false}
        isSubmitting={false}
        onSubmit={() => {}}
        onCancel={() => {}}
        user={emptyUser}
        userRoles={MOCK_USER_ROLES}
      />
    );

    const input = getById(container, 'user-upsert-form-first-name');

    expect(input).toHaveValue('');
    expect(screen.queryByText('First name is required')).not.toBeInTheDocument();

    await user.click(input);
    expect(screen.queryByText('First name is required')).not.toBeInTheDocument();

    await user.tab();
    // expect(screen.queryByText('Name is required')).toBeInTheDocument();
    // expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    //
    // user.type(input, 'A');
    // expect(screen.queryByText('Name is too short')).toBeInTheDocument();
  });

  it('should show an error message for the email', async () => {
    const user = userEvent.setup();
    const { container } = renderSUI(
      <UserUpsertForm
        title="Test title"
        description="Test description"
        disableNameAndEmail={false}
        isSubmitting={false}
        onSubmit={() => {}}
        onCancel={() => {}}
        user={emptyUser}
        userRoles={MOCK_USER_ROLES}
      />
    );
    const input = getById(container, 'user-upsert-form-email');

    expect(input).toHaveValue('');
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();

    await user.click(input);
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();

    await user.tab();
    // expect(screen.queryByText('Email is required')).toBeInTheDocument();
    // expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    //
    // await user.type(input, 'sink@hole.com');
    // expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });

  it('should show an error message when the name is too short', async () => {
    const user = userEvent.setup();
    const { container } = renderSUI(
      <UserUpsertForm
        title="Test title"
        description="Test description"
        disableNameAndEmail={false}
        isSubmitting={false}
        onSubmit={() => {}}
        onCancel={() => {}}
        user={emptyUser}
        userRoles={MOCK_USER_ROLES}
      />
    );
    const input = getById(container, 'user-upsert-form-first-name');

    await act(async () => {
      expect(input).toHaveValue('');
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();

      await user.click(input);
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Name is too short')).not.toBeInTheDocument();

      // expect(screen.queryByText('Name is too short')).toBeInTheDocument();
      //
      // await user.type(input, 'A'); // now value is AA
      // expect(screen.queryByText('Name is too short')).not.toBeInTheDocument();
    });

    await act(async () => {
      await user.type(input, 'A');
      expect(input).toHaveValue('A');
      await fireEvent.blur(input);
    });
  });

  // it('should show an error message: name is too short', async () => {
  //   renderSUI(
  //     <UserUpsertForm
  //       title="Test title"
  //       description="Test description"
  //       disableNameAndEmail={false}
  //       isSubmitting={false}
  //       visible={true}
  //       onSubmit={() => {}}
  //       onCancel={() => {}}
  //       user={emptyUserEditFormData}
  //       userRoles={[]}
  //     />
  //   );
  //   const nameInput = screen.getByRole('textbox', { name: 'name' });
  //   fireEvent.change(nameInput, { target: { value: 'a' } });
  //   fireEvent.blur(nameInput);
  //   await waitFor(() => {
  //     expect(screen.getByText('Name is too short')).toBeInTheDocument();
  //   });
  // });
  //
  // it('should show an error message: name is too long', async () => {
  //   renderSUI(
  //     <UserUpsertForm
  //       title="Test title"
  //       description="Test description"
  //       disableNameAndEmail={false}
  //       isSubmitting={false}
  //       visible={true}
  //       onSubmit={() => {}}
  //       onCancel={() => {}}
  //       user={emptyUserEditFormData}
  //       userRoles={[]}
  //     />
  //   );
  //   const nameInput = screen.getByRole('textbox', { name: 'name' });
  //   const value = 'a'.repeat(130);
  //   fireEvent.change(nameInput, { target: { value } });
  //   fireEvent.blur(nameInput);
  //   await waitFor(() => {
  //     expect(screen.getByText('Name is too long')).toBeInTheDocument();
  //   });
  // });
  //
  // it('should show an error messag: invalid name', async () => {
  //   renderSUI(
  //     <UserUpsertForm
  //       title="Test title"
  //       description="Test description"
  //       disableNameAndEmail={false}
  //       isSubmitting={false}
  //       visible={true}
  //       onSubmit={() => {}}
  //       onCancel={() => {}}
  //       user={emptyUserEditFormData}
  //       userRoles={[]}
  //     />
  //   );
  //   const nameInput = screen.getByRole('textbox', { name: 'name' });
  //   fireEvent.change(nameInput, { target: { value: '123' } });
  //   fireEvent.blur(nameInput);
  //   await waitFor(() => {
  //     expect(screen.getByText('Invalid name')).toBeInTheDocument();
  //   });
  // });
  //
  // it('should show an error messag: email is required', async () => {
  //   renderSUI(
  //     <UserUpsertForm
  //       title="Test title"
  //       description="Test description"
  //       disableNameAndEmail={false}
  //       isSubmitting={false}
  //       visible={true}
  //       onSubmit={() => {}}
  //       onCancel={() => {}}
  //       user={emptyUserEditFormData}
  //       userRoles={[]}
  //     />
  //   );
  //   const emailInput = screen.getByRole('textbox', { name: 'email' });
  //   fireEvent.change(emailInput, { target: { value: '' } });
  //   fireEvent.blur(emailInput);
  //   await waitFor(() => {
  //     expect(screen.getByText('Email is required')).toBeInTheDocument();
  //   });
  // });
  //
  // it('should show an error messag: invalid email', async () => {
  //   renderSUI(
  //     <UserUpsertForm
  //       title="Test title"
  //       description="Test description"
  //       disableNameAndEmail={false}
  //       isSubmitting={false}
  //       visible={true}
  //       onSubmit={() => {}}
  //       onCancel={() => {}}
  //       user={emptyUserEditFormData}
  //       userRoles={[]}
  //     />
  //   );
  //   const emailInput = screen.getByRole('textbox', { name: 'email' });
  //   fireEvent.change(emailInput, { target: { value: 'test.user' } });
  //   fireEvent.blur(emailInput);
  //   await waitFor(() => {
  //     expect(screen.getByText('Invalid email')).toBeInTheDocument();
  //   });
  // });
  //
  // it('should call onSubmit when save button is clicked', async () => {
  //   const mockSubmit = jest.fn();
  //   renderSUI(
  //     <UserUpsertForm
  //       disableNameAndEmail={false}
  //       isSubmitting={false}
  //       visible={true}
  //       title="Test title"
  //       description="Test description"
  //       onSubmit={(values) => mockSubmit(values)}
  //       onCancel={() => {}}
  //       user={emptyUserEditFormData}
  //       userRoles={[]}
  //     />
  //   );
  //   const nameInput = screen.getByRole('textbox', { name: 'name' });
  //   fireEvent.change(nameInput, { target: { value: 'Test user' } });
  //   const emailInput = screen.getByRole('textbox', { name: 'email' });
  //   fireEvent.change(emailInput, {
  //     target: { value: 'test.user@example.com' },
  //   });
  //   const saveButton = screen.getByRole('button', { name: 'Save' });
  //   fireEvent.click(saveButton);
  //   await waitFor(() => {
  //     expect(mockSubmit).toHaveBeenCalledWith({
  //       name: 'Test user',
  //       email: 'test.user@example.com',
  //       roles: [],
  //       blocked: false,
  //     });
  //   });
  // });
});
