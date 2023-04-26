/*
 *
 * MIT License.
 *
 */
import { dataGridSortComparator } from 'pyoraily-shared-frontend/utils/sortComparator';
import * as UserUtils from 'pyoraily-shared-frontend/utils/UserUtils';
import { User } from 'pyoraily-shared-frontend/model/User';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import * as UserComponentUtils from '@src/react/components/common/UserComponentUtils';
import * as React from 'react';
import DataGrid, { CellRendererProps, Column, SortColumn } from 'react-data-grid';
import { Button, Dimmer, Loader } from 'semantic-ui-react';

const columns = (userRoles: UserRole[], onEditRecord: (user: User) => void): Column<User>[] => [
  {
    key: 'fullName',
    name: 'Name',
    sortable: true,
    resizable: true,
    formatter: ((record: CellRendererProps<User, null>): React.ReactNode => {
      const user: User = record.row;

      return user.firstName ? (
        <>
          {user.firstName} {user.lastName}
        </>
      ) : (
        <>Not entered</>
      );
    }) as any,
  },
  {
    key: 'email',
    name: 'Email',
    sortable: true,
    resizable: true,
    formatter: ((record: CellRendererProps<User, null>) => <span>{record.row.email || ''}</span>) as any,
  },
  {
    key: 'status',
    name: 'Status',
    resizable: true,
    formatter: ((record: CellRendererProps<User, null>): React.ReactNode => {
      const user: User = record.row;

      return <>{UserComponentUtils.userStatusToTags(user.status)}</>;
    }) as any,
  },
  {
    key: 'roles',
    name: 'Role(s)',
    sortable: false,
    resizable: true,
    formatter: ((record: CellRendererProps<User, null>): React.ReactNode => {
      const userRolesForUser = UserUtils.userRolesForUser(record.row, userRoles || []);
      return UserComponentUtils.userRolesToTags(userRolesForUser || []);
    }) as any,
  },
  {
    key: 'createdAt',
    name: 'Created',
    sortable: true,
    resizable: true,
    formatter: (record: CellRendererProps<User, null>) =>
      (<span>{new Date(record.row.createdAt as string).toLocaleDateString('en-GB')}</span>) as any,
  },
  {
    key: 'updatedAt',
    name: 'Updated',
    sortable: true,
    resizable: true,
    formatter: (record: CellRendererProps<User, null>) =>
      (<span>{new Date(record.row.updatedAt as string).toLocaleDateString('en-GB')}</span>) as any,
  },
  {
    key: 'lastLogin',
    name: 'Last Login',
    sortable: true,
    resizable: true,
    formatter: (record: CellRendererProps<User, null>) =>
      (<span>{new Date(record.row.lastLogin as string).toLocaleDateString('en-GB')}</span>) as any,
  },
  {
    key: 'edit',
    name: 'Actions',
    sortable: false,
    resizable: true,
    formatter: ((record: CellRendererProps<User, null>) => {
      const onClick = (): void => onEditRecord(record.row);
      return (
        <Button type="button" kind="ghost" size="mini" onClick={onClick}>
          Edit
        </Button>
      );
    }) as any,
  },
];

const NoRowsFallback = (props: { isFetching: boolean }): React.ReactElement =>
  props.isFetching ? (
    <div style={{ gridColumn: '1/-1' }}>Fetching users...</div>
  ) : (
    <div style={{ gridColumn: '1/-1' }}>No users found</div>
  );

interface Props {
  searchTerm: string;

  isFetching: boolean;

  userRoles: UserRole[];

  users: User[];

  onEditUser: (user: User) => void;
}

export const UserDataGrid: React.FunctionComponent<Props> = (props: Props): React.ReactElement<Props> => {
  const dataGridColumns = columns(props.userRoles || [], props.onEditUser);
  const [sortColumns, setSortColumns] = React.useState<SortColumn[]>([]);
  const sortedRows: User[] = props.users.sort(dataGridSortComparator(sortColumns));

  const filteredRows = React.useMemo(
    (): User[] =>
      props.searchTerm.length >= 3
        ? sortedRows.filter(
            (user: User) =>
              user.email?.toLocaleLowerCase().startsWith(props.searchTerm.toLocaleLowerCase()) ||
              user.lastName?.toLocaleLowerCase().startsWith(props.searchTerm.toLocaleLowerCase()) ||
              user.firstName?.toLocaleLowerCase().startsWith(props.searchTerm.toLocaleLowerCase())
          )
        : sortedRows,
    [props.searchTerm, sortedRows, sortColumns]
  );

  return (
    <>
      <Dimmer active={props.isFetching}>
        <Loader>Fetching user data...</Loader>
      </Dimmer>
      <DataGrid
        columns={dataGridColumns as any}
        rows={filteredRows}
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
        defaultColumnOptions={{ width: '1fr' }}
        headerRowHeight={40}
        style={{ resize: 'both' }}
        renderers={{ noRowsFallback: <NoRowsFallback isFetching={props.isFetching} /> }}
      />
    </>
  );
};
