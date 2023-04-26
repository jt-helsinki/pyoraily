/*
 *
 * MIT License.
 *
 */
import { AthleteProfile } from 'pyoraily-shared-frontend/model';
import * as Api from '@src/services/api/Api';
import { handleError } from '@src/services/api/errorHandler';

/**
 * Fetch logged in athlete profile
 */
export const fetchAthleteProfile = (year: number): Promise<AthleteProfile> =>
  Api.httpGet<AthleteProfile>(`athlete-manager/athlete-profile/me/${year}`)
    .then((response) => response.data)
    .catch(handleError);

/**
 * Update logged in athlete profile
 */
export const upsertAthleteProfile = (year: number, athleteProfile: Partial<AthleteProfile>): Promise<AthleteProfile> =>
  Api.httpPost<AthleteProfile>(`athlete-manager/athlete-profile/me/${year}`, athleteProfile)
    .then((response) => response.data)
    .catch(handleError);
