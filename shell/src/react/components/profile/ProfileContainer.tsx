/*
 *
 * MIT License.
 *
 */
/*
 *
 * MIT License.
 *
 */
import { User } from 'pyoraily-shared-frontend/model/User';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import { ProfileEditForm } from '@src/react/components/profile/ProfileEditForm';
import { ProfileView } from '@src/react/components/profile/ProfileView';
import { useUserRolesFromUseUserSessionStateStore } from '@src/react/hooks/state/client/useUserSessionStateStore';
import {
  useFetchProfileServerStateStore,
  useUpdateProfileServerStateStore,
} from '@src/react/hooks/state/server/useUserServerStateStore';
import { NotificationKey } from '@src/react/types/NotificationKey';
import * as UiService from '@src/services/UiService';
import * as React from 'react';
import { Dimmer, Loader, Modal } from 'semantic-ui-react';

enum ComponentMode {
  View,
  EditProfile,
}

export const ProfileContainer: React.FunctionComponent = (): React.ReactElement => {
  const [error, setError] = React.useState<string>('');
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [componentMode, setComponentMode] = React.useState<ComponentMode>(ComponentMode.View);
  const userRoles: UserRole[] = useUserRolesFromUseUserSessionStateStore();
  const { data: user, refetch, isFetching } = useFetchProfileServerStateStore();
  const { mutateAsync: updateProfileMutate } = useUpdateProfileServerStateStore();

  const onEditCancel = (): void => {
    setComponentMode(ComponentMode.View);
    setError(null as any);
    setIsSubmitting(false);
  };

  const onEdit = (): void => {
    setComponentMode(ComponentMode.EditProfile);
  };

  const onEditSave = (profile: User): void => {
    setError(null as any);
    setIsSubmitting(true);
    updateProfileMutate(profile)
      .then((savedUser: User) => {
        UiService.notificationToasterSuccess(
          NotificationKey.USERS_EMAIL_UPDATED,
          `User ${savedUser.firstName} ${savedUser.lastName} <${savedUser.email}> saved`
        );
        refetch().then(() => onEditCancel());
      })
      .catch((responseError: string) => {
        setError(responseError);
        setIsSubmitting(false);
      });
  };

  if (isFetching) {
    return (
      <Dimmer active={isFetching}>
        <Loader>Fetching profile</Loader>
      </Dimmer>
    );
  }

  return (
    <>
      {componentMode === ComponentMode.View ? (
        <ProfileView user={user as User} userRoles={userRoles} onEdit={onEdit} />
      ) : (
        <ProfileEditForm
          user={user as User}
          userRoles={userRoles}
          isSubmitting={isSubmitting}
          onSave={onEditSave}
          onCancel={onEditCancel}
        />
      )}
    </>
  );
};
