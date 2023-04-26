import { useFetchAthleteProfilesServerStateStore } from '@src/react/hooks/state/server/useAthleteManagerServerStateStore';
import { fetchAthleteProfiles } from '@src/services/AthleteManagerService';
import { AthleteManagerStateManager } from '@src/state/client/AthleteManagerStateManager';
import * as AthleteManagerServerStateManager from '@src/state/server/AthleteManagerServerStateManager';
import { mockFetchAthleteProfileResponseData } from '@src/tests/mocks/mockAthleteProfileServiceResponses';
import { QueryClientWrapper } from '@src/tests/utils';
import { renderHook, waitFor } from '@testing-library/react';
import * as React from 'react';

describe('useUserServerStateStore tests', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    AthleteManagerStateManager.resetToNew();
  });

  const fetchAthleteProfile = async () => {
    const fetchAthleteProfiles = jest.spyOn(AthleteManagerServerStateManager, 'fetchAthleteProfiles');
    fetchAthleteProfiles.mockImplementation(
      () =>
        ({
          ...jest.requireActual('@src/state/server/AthleteManagerServerStateManager').fetchUserRoles({ enabled: true }),
          queryFn: () => Promise.resolve(mockFetchAthleteProfileResponseData),
        } as any)
    );
    const { result } = renderHook(() => useFetchAthleteProfilesServerStateStore(2023, 'BMX', 'U19', 'male'), {
      wrapper: QueryClientWrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    return result.current;
  };

  test('if useFetchUsersServerStateStore() works correctly', async () => {
    // const { data } = await fetchAthleteProfiles(2023);
    //
    // expect(data).toEqual(mockFetchAthleteProfileResponseData);
  });
});
