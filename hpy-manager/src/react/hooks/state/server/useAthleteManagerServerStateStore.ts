/*
 *
 * MIT License.
 *
 */
import * as AthleteManagerServerStateManager from '@src/state/server/AthleteManagerServerStateManager';
import { useQuery } from '@tanstack/react-query';
import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query/src/types';
import { AthleteProfile } from '../../../../../../shared-frontend/dist/model';

export const useFetchAthleteProfilesServerStateStore = (
  year: number,
  discipline: string,
  category: string,
  gender: string,
  reactQueryOptions: UseQueryOptions = {}
): UseQueryResult<AthleteProfile[], Error> =>
  useQuery(
    AthleteManagerServerStateManager.fetchAthleteProfiles(year, discipline, category, gender, {
      enabled: true,
      ...reactQueryOptions,
    }) as any
  );
