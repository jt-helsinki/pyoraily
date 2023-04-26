import {
  useFetchAthleteProfileServerStateStore,
  useUpsertAthleteProfileServerStateStore,
} from '@src/react/hooks/state/server/useAthleteManagerServerStateStore';
import { AthleteManagerStateManager } from '@src/state/client/AthleteManagerStateManager';
import * as AthleteManagerServerStateManager from '@src/state/server/AthleteManagerServerStateManager';
import {
  mockFetchAthleteProfileResponseData,
  mockUpdateAthleteProfileResponseData,
} from '@src/tests/mocks/mockAthleteProfileServiceResponses';
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
    const fetchAthleteProfile = jest.spyOn(AthleteManagerServerStateManager, 'fetchAthleteProfile');
    fetchAthleteProfile.mockImplementation(
      () =>
        ({
          ...jest.requireActual('@src/state/server/AthleteManagerServerStateManager').fetchUserRoles({ enabled: true }),
          queryFn: () => Promise.resolve(mockFetchAthleteProfileResponseData),
        } as any)
    );
    const { result } = renderHook(() => useFetchAthleteProfileServerStateStore(2023), {
      wrapper: QueryClientWrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    return result.current;
  };

  test('if useFetchUsersServerStateStore() works correctly', async () => {
    const { data } = await fetchAthleteProfile();

    expect(data).toEqual(mockFetchAthleteProfileResponseData);
  });

  test('if useUpdateAthleteProfileServerStateStore() works correctly', async () => {
    const fetchUserRoles = jest.spyOn(AthleteManagerServerStateManager, 'upsertAthleteProfile');
    fetchUserRoles.mockImplementation(
      () =>
        ({
          ...jest.requireActual('@src/state/server/AthleteManagerServerStateManager').createUser({ enabled: true }),
          mutationFn: () => Promise.resolve(mockUpdateAthleteProfileResponseData),
        } as any)
    );
    const { result } = renderHook(() => useUpsertAthleteProfileServerStateStore(), {
      wrapper: QueryClientWrapper,
    });
    expect(await result.current.mutate).toBeDefined();
  });
});
