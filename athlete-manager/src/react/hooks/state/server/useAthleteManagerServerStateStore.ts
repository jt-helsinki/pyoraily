/*
 *
 * MIT License.
 *
 */
import * as AthleteManagerServerStateManager from '@src/state/server/AthleteManagerServerStateManager';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query/src/types';
import { AthleteProfile } from 'pyoraily-shared-frontend/model';

export const useFetchAthleteProfileServerStateStore = (
  year: number,
  reactQueryOptions: UseQueryOptions = {}
): UseQueryResult<AthleteProfile, Error> =>
  useQuery(AthleteManagerServerStateManager.fetchAthleteProfile(year, { enabled: true, ...reactQueryOptions }) as any);

export const useUpsertAthleteProfileServerStateStore = (
  reactQueryOptions: UseMutationOptions = {}
): UseMutationResult<AthleteProfile, Error, Partial<AthleteProfile>, any> =>
  useMutation(AthleteManagerServerStateManager.upsertAthleteProfile({ ...reactQueryOptions }) as any);
