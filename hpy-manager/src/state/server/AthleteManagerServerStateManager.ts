/*
 *
 * MIT License.
 *
 */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as AthleteManagerService from '@src/services/AthleteManagerService';
import { UseQueryOptions } from '@tanstack/react-query/src/types';

export const fetchAthleteProfiles = (
  year: number,
  discipline: string,
  category: string,
  gender: string,
  reactQueryOptions: UseQueryOptions = {}
): UseQueryOptions => ({
  queryKey: ['athleteProfiles', year, discipline, category, gender],
  queryFn: () => AthleteManagerService.fetchAthleteProfiles(year, discipline, category, gender),
  staleTime: 1000 * 60 * 60 * 24, // 24 hours
  ...reactQueryOptions,
});
