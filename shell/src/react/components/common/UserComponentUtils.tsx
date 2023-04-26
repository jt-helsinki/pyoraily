/*
 *
 * MIT License.
 *
 */
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import { UserStatus } from 'pyoraily-shared-frontend/model/UserStatus';
import { Label } from 'semantic-ui-react';

export const userRolesToTags = (userRolesForUser: UserRole[] = []): React.ReactNode[] =>
  userRolesForUser.map((userRole: UserRole, index: number) => (
    <Label key={index} size="tiny" color="grey">
      {userRole}
    </Label>
  ));

export const userStatusToTags = (status: UserStatus): React.ReactNode => {
  switch (status) {
    case UserStatus.Active:
      return (
        <Label size="tiny" color="green">
          {status}
        </Label>
      );
    case UserStatus.Created:
      return (
        <Label size="tiny" color="teal">
          {status}
        </Label>
      );
    case UserStatus.Disabled:
      return (
        <Label size="tiny" color="orange">
          {status}
        </Label>
      );
    case UserStatus.Blocked:
      return (
        <Label size="tiny" color="red">
          {status}
        </Label>
      );
    case UserStatus.NotVerifed:
      return (
        <Label size="tiny" color="yellow">
          Not verified
        </Label>
      );
    default:
      return (
        <Label size="tiny" color="grey">
          {status}
        </Label>
      );
  }
};
