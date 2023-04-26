import { LoginView } from '@src/react/components/login/LoginView';
import { useUiStateStore } from '@src/react/hooks/state/client/useUiStateStore';
import * as LoginService from '@src/services/LoginService';
import { UserSessionStateManager } from '@src/state/client/UserSessionStateManager';
import { mockFetchProfileResponseDate } from '@src/tests/mocks/mockUserServiceResponses';
import { render, waitFor } from '@testing-library/react';
import { Location, Navigate, useLocation, useSearchParams } from 'react-router-dom';

jest.mock('react-router-dom', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const originalModule = jest.requireActual('react-router-dom') as any;
  return {
    __esModule: true,
    ...originalModule,
    Navigate: jest.fn(),
    useLocation: jest.fn(),
    useSearchParams: jest.fn(),
  };
});

jest.mock('@src/react/hooks/state/client/useUiStateStore', () => ({
  useUiStateStore: jest.fn(),
}));

jest.mock('@src/services/LoginService', () => ({
  initLogin: jest.fn(),
}));

// const mockInitLogin = jest.fn();
const mockNavigate = Navigate as jest.Mock;
const mockPushNotifications = jest.fn();
const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>;
const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;
const mockUseUiStateStore = useUiStateStore as jest.MockedFunction<typeof useUiStateStore>;

describe('LoginView', () => {
  describe('when no error is present in the nav state', () => {
    const mockLocation = {
      pathname: '/login',
      state: {},
    } as jest.Mocked<Location>;

    beforeEach(() => {
      jest.resetModules();
      jest.resetAllMocks();
      mockNavigate.mockReturnValue(null);
      mockUseLocation.mockReturnValue(mockLocation);
      mockUseUiStateStore.mockReturnValue(mockPushNotifications);
      UserSessionStateManager.resetToNew();
      UserSessionStateManager.currentState().setAuthenticatedWithRoles(mockFetchProfileResponseDate);
    });

    /**
     * This functionality needs to be revisited. Moving to the login page should require a user interaction.
     */
    it.skip('should immediately start the login process for a non-authenticated user', async () => {
      UserSessionStateManager.currentState().setUnauthenticated();
      const expectedLocation = '/measurements';
      const searchParams = { get: () => expectedLocation } as unknown as jest.Mocked<URLSearchParams>;
      mockUseSearchParams.mockReturnValue([searchParams, () => {}]);

      render(<LoginView />);

      await waitFor(() => {
        expect(LoginService.initLogin).toHaveBeenLastCalledWith('/measurements');
      });
    });

    it('should navigate an authenticated user back to location pointed to by the "redirectTo" URL parameter', async () => {
      const expectedLocation = '/measurements';
      const searchParams = { get: () => expectedLocation } as unknown as jest.Mocked<URLSearchParams>;
      mockUseSearchParams.mockReturnValue([searchParams, () => {}]);

      render(<LoginView />);

      await waitFor(() => {
        expect(LoginService.initLogin).toHaveBeenCalledTimes(0);
        expect(mockNavigate).toHaveBeenCalledWith(
          expect.objectContaining({
            to: expectedLocation,
          }),
          expect.anything()
        );
      });
    });
  });

  describe('when an error is present in the nav state', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      const searchParams = { get: () => '' } as unknown as jest.Mocked<URLSearchParams>;
      mockUseSearchParams.mockReturnValue([searchParams, () => {}]);
      UserSessionStateManager.resetToNew();
      UserSessionStateManager.currentState().setUnauthenticated();
    });

    it('should push a notification to state management and render a sign in button', async () => {
      const loginView = render(<LoginView />);
      await waitFor(() => {
        expect(loginView.findByText('Sign In')).toBeDefined();
      });
    });
  });
});
