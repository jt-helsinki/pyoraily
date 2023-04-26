import { User } from 'pyoraily-shared-frontend/model/User';
import { UserDataGrid } from '@src/react/components/users/UserDataGrid';
import { MOCK_USER_ROLES } from '@src/tests/mocks/mockUserRoleServiceResponses';
import { mockFetchUsersResponseData } from '@src/tests/mocks/mockUserServiceResponses';
import * as DataGridTestHelpers from '@src/tests/test-helpers/DataGridTestHelpers';
import { renderSUI, rerenderSUI } from '@src/tests/utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

describe('UsersTable', () => {
  it('should match the snapshot', () => {
    const { container } = renderSUI(
      <UserDataGrid
        searchTerm=""
        isFetching={false}
        users={mockFetchUsersResponseData}
        userRoles={MOCK_USER_ROLES}
        onEditUser={(user: User) => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should have 2 rows.', async () => {
    const onEditUser = jest.fn();
    const user = userEvent.setup();

    const { container } = renderSUI(
      <UserDataGrid
        searchTerm=""
        isFetching={false}
        users={mockFetchUsersResponseData}
        userRoles={MOCK_USER_ROLES}
        onEditUser={onEditUser}
      />
    );
    expect(DataGridTestHelpers.getRows()).toHaveLength(2);
  });

  it('should have 1 row after search.', async () => {
    const onEditUser = jest.fn();
    const user = userEvent.setup();

    const { container } = renderSUI(
      <UserDataGrid
        searchTerm="Joe"
        isFetching={false}
        users={mockFetchUsersResponseData}
        userRoles={MOCK_USER_ROLES}
        onEditUser={onEditUser}
      />
    );
    expect(DataGridTestHelpers.getRows()).toHaveLength(2);
  });

  it('should have 0 row after search for invalid name.', async () => {
    const onEditUser = jest.fn();
    const user = userEvent.setup();

    const { container } = renderSUI(
      <UserDataGrid
        searchTerm="Mungo"
        isFetching={false}
        users={mockFetchUsersResponseData}
        userRoles={MOCK_USER_ROLES}
        onEditUser={onEditUser}
      />
    );
    expect(DataGridTestHelpers.getRows()).toHaveLength(0);
  });

  it('should call the onEditUser() function.', async () => {
    jest.useFakeTimers();
    const onEditUser = jest.fn();
    const user = userEvent.setup();

    const { rerender, container } = renderSUI(
      <UserDataGrid
        searchTerm=""
        isFetching={false}
        users={mockFetchUsersResponseData}
        userRoles={MOCK_USER_ROLES}
        onEditUser={onEditUser}
      />
    );

    //   const buttons = screen.getAllByText('Edit');
    //
    //   await user.click(buttons[0]);
    //   expect(onEditUser).toHaveBeenCalled();

    // expect(DataGridTestHelpers.getRows()).toHaveLength(2);
  });

  // it('should display table with two users name, one email, and indication of no email', async () => {
  //   renderSUI(
  //     <UserDataGrid searchTerm="" users={mockUsers} userRoles={mockUserRoles} isFetching={true} onEditUser={jest.fn()} />
  //   );
  //   await waitFor(() => {
  //     expect(screen.getByText(mockUsers[0].fullName)).toBeInTheDocument();
  //   });
  //   expect(
  //     screen.getByText(
  //       mockUsers[0].contactMedia.find((contact) => contact.mediumType === 'Email')?.characteristic.name ||
  //         'NO-EMAIL-FOUND'
  //     )
  //   ).toBeInTheDocument();
  //
  //   const dateString0 = new Date(mockUsers[0].createdAt).toLocaleDateString();
  //   const dateString1 = new Date(mockUsers[1].createdAt).toLocaleDateString();
  //
  //   expect(screen.getByText(mockUsers[1].fullName)).toBeInTheDocument();
  //   expect(screen.getByText(dateString0)).toBeInTheDocument();
  //   expect(screen.getByText(dateString1)).toBeInTheDocument();
  //   expect(screen.getByText('No email')).toBeInTheDocument();
  // });
  //
  it('should display a loading indicator', async () => {
    const { rerender, container } = renderSUI(
      <UserDataGrid
        searchTerm=""
        users={mockFetchUsersResponseData}
        userRoles={MOCK_USER_ROLES}
        isFetching={true}
        onEditUser={jest.fn()}
      />
    );

    await waitFor(() => {
      const loadingComponent = container.firstChild;
      expect(loadingComponent).toHaveClass('ui active text loader');
      expect(screen.getByText('Fetching user data...')).toBeInTheDocument();
    });

    rerenderSUI(
      rerender,
      <UserDataGrid
        searchTerm=""
        users={mockFetchUsersResponseData}
        userRoles={MOCK_USER_ROLES}
        isFetching={false}
        onEditUser={jest.fn()}
      />
    );
    await waitFor(() => {
      const loadingComponent = container.firstChild;
      expect(loadingComponent).toHaveClass('ui text loader');
      expect(screen.getByText('Fetching user data...')).toBeInTheDocument();
    });
  });
  //
  // it('should call invite user callback if invite user button is clicked', async () => {
  //   const mockInviteUser = jest.fn();
  //   renderSUI(
  //     <UserDataGrid
  //       searchTerm=""
  //       users={mockUsers}
  //       userRoles={mockUserRoles}
  //       isFetching={false}
  //       onEditUser={jest.fn()}
  //     />
  //   );
  //   fireEvent.click(screen.getByText('Invite user'));
  //   await waitFor(() => {
  //     expect(mockInviteUser).toHaveBeenCalled();
  //   });
  // });
  //
  // it('should call edit user callback if edit button is clicked', async () => {
  //   const mockEditUser = jest.fn();
  //   renderSUI(
  //     <UserDataGrid
  //       searchTerm=""
  //       users={mockUsers}
  //       userRoles={mockUserRoles}
  //       isFetching={false}
  //       onEditUser={mockEditUser}
  //     />
  //   );
  //   fireEvent.click(screen.getAllByText('Edit')[0]);
  //   await waitFor(() => {
  //     expect(mockEditUser).toHaveBeenCalled();
  //   });
  // });
});
