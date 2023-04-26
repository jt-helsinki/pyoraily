/*
 *
 * MIT License.
 *
 */
import * as Api from '@src/services/api/Api';
import { handleError } from '@src/services/api/errorHandler';
import { AthleteProfile } from 'pyoraily-shared-frontend/model';

/**
 * Fetch logged in athlete profile
 */
export const fetchAthleteProfiles = (
  year: number,
  discipline: string,
  category: string,
  gender: string
): Promise<AthleteProfile> =>
  Api.httpGet<AthleteProfile>(`athlete-manager/athlete-profile/${year}/${discipline}/${category}/${gender}`)
    .then((response) => response.data)
    .catch(handleError);
