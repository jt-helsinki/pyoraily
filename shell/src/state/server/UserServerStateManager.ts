/*
 *
 * MIT License.
 *
 */
import { User } from 'pyoraily-shared-frontend/model/User';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as UserRoleService from '@src/services/UserRoleService';
import * as UserService from '@src/services/UserService';
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query/src/types';

export const fetchUsers = (reactQueryOptions: UseQueryOptions = {}): UseQueryOptions => ({
  queryKey: ['users'],
  queryFn: () => UserService.fetchUsers(),
  ...reactQueryOptions,
});

export const fetchProfile = (reactQueryOptions: UseQueryOptions = {}): UseQueryOptions => ({
  queryKey: ['currentUserProfile'],
  queryFn: () => UserService.fetchProfile(),
  staleTime: 1000 * 60 * 60 * 24, // 24 hours
  ...reactQueryOptions,
});

export const updateProfile = (reactQueryOptions: UseMutationOptions = {}) => ({
  mutationFn: (user: User) => UserService.updateProfile(user),
  ...reactQueryOptions,
});

export const fetchUserRoles = (reactQueryOptions: UseQueryOptions = {}): UseQueryOptions => ({
  queryKey: ['userRoles'],
  queryFn: () => UserRoleService.fetchUserRoles(),
  staleTime: 1000 * 60 * 60 * 24, // 24 hours
  ...reactQueryOptions,
});

export const createUser = (reactQueryOptions: UseMutationOptions = {}) => ({
  mutationFn: (user: User) => UserService.createUser(user),
  ...reactQueryOptions,
});

export const updateUser = (reactQueryOptions: UseMutationOptions = {}) => ({
  mutationFn: (user: Partial<User>) => UserService.updateUser(user.id as string, user),
  ...reactQueryOptions,
});
