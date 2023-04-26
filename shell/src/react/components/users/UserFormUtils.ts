/*
 *
 * MIT License.
 *
 */
import { User } from 'pyoraily-shared-frontend/model/User';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import { UserStatus } from 'pyoraily-shared-frontend/model/UserStatus';
import { DropdownItemProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/DropdownItem';

export const userRoleToMultiSelectItem = (userRole: UserRole): DropdownItemProps[] =>
  ({
    key: userRole,
    text: userRole.replace('_', ' '),
    value: userRole,
  } as any);

export const selectedUserRoleIdsToMultiSelectItems = (
  selectedUserRoleIds: string[],
  mappedUserRoles: DropdownItemProps[]
): DropdownItemProps[] => mappedUserRoles.filter((userRole) => selectedUserRoleIds.some((id) => id === userRole.id));

export const emptyUser = (): Partial<User> => ({
  id: null,
  firstName: '',
  lastName: '',
  userRoles: [],
  email: '',
  status: UserStatus.Active,
});
