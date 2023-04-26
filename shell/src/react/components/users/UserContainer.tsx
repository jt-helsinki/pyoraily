/*
 *
 * MIT License.
 *
 */
import { User } from 'pyoraily-shared-frontend/model/User';
import { UserDataGrid } from '@src/react/components/users/UserDataGrid';
import * as UserFormUtils from '@src/react/components/users/UserFormUtils';
import { UserUpsertForm } from '@src/react/components/users/UserUpsertForm';
import {
  useCreateUserServerStateStore,
  useFetchUserRolesServerStateStore,
  useFetchUsersServerStateStore,
  useUpdateUserServerStateStore,
} from '@src/react/hooks/state/server/useUserServerStateStore';
import { NotificationKey } from '@src/react/types/NotificationKey';
import * as UiService from '@src/services/UiService';
import * as React from 'react';
import { Dimmer, Input, Loader, Modal } from 'semantic-ui-react';

enum ModalMode {
  None,
  EditUser,
  CreateUser,
}

export const UserContainer: React.FunctionComponent = (): React.ReactElement | null => {
  const { data: userRoles } = useFetchUserRolesServerStateStore();
  const { isFetching, data: users, refetch } = useFetchUsersServerStateStore();

  const { mutateAsync: updateUserMutate } = useUpdateUserServerStateStore();
  const { mutateAsync: createUserMutate } = useCreateUserServerStateStore();

  const [error, setError] = React.useState<string>('');
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [user, setUser] = React.useState<Partial<User>>(UserFormUtils.emptyUser());
  const [modalMode, setModalMode] = React.useState<ModalMode>(ModalMode.None);

  const onCancel = (): void => {
    setError(null as any);
    setIsSubmitting(false);
    setUser(UserFormUtils.emptyUser());
    setModalMode(ModalMode.None);
  };

  const handleSaveResponse = (response: Promise<User>): void => {
    setIsSubmitting(true);
    response
      .then((savedUser: User) => {
        UiService.notificationToasterSuccess(
          NotificationKey.USERS_EMAIL_UPDATED,
          `User ${savedUser.firstName} ${savedUser.lastName} <${savedUser.email}> updated.`
        );
        refetch().then(() => onCancel());
      })
      .catch((responseError: string) => {
        setError(responseError);
        setIsSubmitting(false);
      });
  };

  const onEditUser = (userToEdit: User): void => {
    setUser(userToEdit);
    setModalMode(ModalMode.EditUser);
  };

  const onEditUserSave = (userToSave: any): void => {
    handleSaveResponse(updateUserMutate(userToSave));
  };

  const visible: boolean = modalMode === ModalMode.EditUser || modalMode === ModalMode.CreateUser;

  return (
    <>
      <div>
        <p>
          <Input icon="search" placeholder="Search..." onChange={(event: any) => setSearchTerm(event.target.value)} />
        </p>
        <UserDataGrid
          searchTerm={searchTerm}
          users={users || []}
          userRoles={userRoles || []}
          isFetching={isFetching || isSubmitting}
          onEditUser={onEditUser}
        />
      </div>
      <Modal onClose={onCancel} open={visible}>
        <Dimmer active={isSubmitting}>
          <Loader>Saving</Loader>
        </Dimmer>
        {modalMode === ModalMode.EditUser ? (
          <UserUpsertForm
            isSubmitting={isSubmitting}
            title="Edit user"
            description="Change user details, permissions and roles."
            onSubmit={onEditUserSave}
            onCancel={onCancel}
            user={user as User}
            userRoles={userRoles || []}
            errorMessage={error}
          />
        ) : null}
      </Modal>
    </>
  );
};
