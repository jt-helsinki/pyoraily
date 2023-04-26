/*
 *
 * MIT License.
 *
 */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as AthleteManagerService from '@src/services/AthleteManagerService';
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query/src/types';
import { AthleteProfile } from 'pyoraily-shared-frontend/model';

export const fetchAthleteProfile = (year: number, reactQueryOptions: UseQueryOptions = {}): UseQueryOptions => ({
  queryKey: [`currentAthleteProfile-${year}`],
  queryFn: () => AthleteManagerService.fetchAthleteProfile(year),
  staleTime: 1000 * 60 * 60 * 24, // 24 hours
  ...reactQueryOptions,
});

export const upsertAthleteProfile = (reactQueryOptions: UseMutationOptions = {}) => ({
  mutationFn: (athleteProfile: AthleteProfile) =>
    AthleteManagerService.upsertAthleteProfile(athleteProfile.year, athleteProfile),
  ...reactQueryOptions,
});
