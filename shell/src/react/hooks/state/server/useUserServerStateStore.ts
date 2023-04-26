/*
 *
 * MIT License.
 *
 */
import { User } from 'pyoraily-shared-frontend/model/User';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import { useUserSessionStateStore } from '@src/react/hooks/state/client/useUserSessionStateStore';
import * as UserServerStateManager from '@src/state/server/UserServerStateManager';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query/src/types';

export const useFetchUsersServerStateStore = (
  reactQueryOptions: UseQueryOptions = {}
): UseQueryResult<User[], Error> => {
  const enabled: boolean = useUserSessionStateStore('authenticated');
  return useQuery(
    UserServerStateManager.fetchUsers({
      enabled,
      ...reactQueryOptions,
    }) as any
  );
};

export const useFetchUserRolesServerStateStore = (
  reactQueryOptions: UseQueryOptions = {}
): UseQueryResult<UserRole[], Error> => {
  const enabled: boolean = useUserSessionStateStore('authenticated');
  return useQuery(UserServerStateManager.fetchUserRoles({ enabled, ...reactQueryOptions }) as any);
};

export const useFetchProfileServerStateStore = (
  reactQueryOptions: UseQueryOptions = {}
): UseQueryResult<User, Error> => {
  const enabled: boolean = useUserSessionStateStore('authenticated');
  return useQuery(UserServerStateManager.fetchProfile({ enabled, ...reactQueryOptions }) as any);
};

export const useUpdateProfileServerStateStore = (
  reactQueryOptions: UseMutationOptions = {}
): UseMutationResult<User, Error, Partial<User>, any> =>
  useMutation(UserServerStateManager.updateProfile({ ...reactQueryOptions }) as any);

export const useUpdateUserServerStateStore = (
  reactQueryOptions: UseMutationOptions = {}
): UseMutationResult<User, Error, Partial<User>, any> =>
  useMutation(UserServerStateManager.updateUser({ ...reactQueryOptions }) as any);

export const useCreateUserServerStateStore = (
  reactQueryOptions: UseMutationOptions = {}
): UseMutationResult<User, Error, User, any> =>
  useMutation(UserServerStateManager.createUser({ ...reactQueryOptions }) as any);
