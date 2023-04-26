import { LogoutView } from '@src/react/components/login/LogoutView';
import * as LoginService from '@src/services/LoginService';
import { UserSessionStateManager } from '@src/state/client/UserSessionStateManager';
import { mockFetchProfileResponseDate } from '@src/tests/mocks/mockUserServiceResponses';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { URLSearchParams } from 'url';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useSearchParams: jest.fn(),
}));

jest.mock('@src/lib/NavUtils', () => ({
  navigateToAuthLogout: jest.fn(),
}));

jest.mock('@src/services/LoginService', () => ({
  signOut: jest.fn(),
}));

const MockedLoginService = LoginService as jest.Mocked<typeof LoginService>;
jest.mock('@tanstack/react-query', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const originalModule = jest.requireActual('@tanstack/react-query') as any;
  return {
    ...originalModule,
    useQueryClient: jest.fn(),
  };
});
const mockUserQueryClient = useQueryClient as jest.MockedFunction<typeof useQueryClient>;
const mockQueryClient = { clear: jest.fn() } as unknown as jest.Mocked<QueryClient>;
const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;
const mockSearchParams = { get: jest.fn(), has: jest.fn() } as unknown as jest.Mocked<URLSearchParams>;

describe('LogoutView', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    mockUserQueryClient.mockReturnValue(mockQueryClient);
    mockUseSearchParams.mockReturnValue([mockSearchParams, () => {}]);
    UserSessionStateManager.resetToNew();
    UserSessionStateManager.currentState().setAuthenticatedWithRoles(mockFetchProfileResponseDate);
  });

  it('should navigate the browser to a logout url', async () => {
    const params: { [key: string]: string } = {
      code: 'code',
      state: '/dashboard',
    };
    mockSearchParams.get.mockImplementation((key: string) => params[key]);
    render(<LogoutView />);
    await waitFor(() => {
      expect(LoginService.signOut).toHaveBeenCalledTimes(1);
    });
  });
});
