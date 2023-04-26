import { Auth0CallbackPage } from '@src/react/components/login/Auth0CallbackPage';
import * as LoginService from '@src/services/LoginService';
import { UserSessionStateManager } from '@src/state/client/UserSessionStateManager';
import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useSearchParams } from 'react-router-dom';
import { URLSearchParams } from 'url';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Navigate: jest.fn(),
  useLocation: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@src/services/LoginService', () => ({
  initLogin: jest.fn(),
  exchangeTokenToJWT: jest.fn(),
  iamProviderCallback: jest.fn().mockImplementation(() => Promise.resolve(true)),
}));
const mockLoginServiceClass = LoginService as unknown as jest.Mocked<typeof LoginService>;
const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;
const mockSearchParams = { get: jest.fn(), has: jest.fn() } as unknown as jest.Mocked<URLSearchParams>;

describe('CallbackPage', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    UserSessionStateManager.resetToNew();
    jest.resetModules();
    jest.resetAllMocks();
    mockUseSearchParams.mockReturnValue([mockSearchParams, () => {}]);
  });

  it('should on successful authentication navigate the user to / if no location was given in the state param', async () => {
    mockSearchParams.get.mockImplementation((key: string) => null);
    mockLoginServiceClass.iamProviderCallback.mockImplementationOnce(() => Promise.resolve(true));

    render(<Auth0CallbackPage />);
    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith('/');
    });
  });

  it('should on successful authentication navigate the user to the location given in the state param if it is defined', async () => {
    const params: { [key: string]: string } = {
      code: 'code',
      state: '/dashboard',
    };
    mockSearchParams.get.mockImplementation((key: string) => params[key]);
    mockLoginServiceClass.iamProviderCallback.mockImplementationOnce(() => Promise.resolve(true));

    render(<Auth0CallbackPage />);
    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith('/dashboard');
    });
  });

  it('should redirect the user back to login screen when no auth code is received', async () => {
    // No user logged in
    // mockUserContextService.user = null;
    // Do not return auth code or state
    mockSearchParams.get.mockImplementation((key: string) => null);
    mockLoginServiceClass.iamProviderCallback.mockImplementationOnce(() => Promise.resolve(false));
    UserSessionStateManager.currentState().setUnauthenticated();
    act(() => {
      render(<Auth0CallbackPage />);
    });

    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith('/login');
      expect(mockLoginServiceClass.iamProviderCallback).toBeCalledTimes(1);
    });
  });

  it('should redirect the user back to login screen when auth code is received but token exchange fails', async () => {
    // No user logged in
    // mockUserContextService.user = null;
    // Auth code and state are defined
    const params: { [key: string]: string } = {
      code: 'code',
      state: '/dashboard',
    };
    mockSearchParams.get.mockImplementation((key: string) => params[key]);
    mockLoginServiceClass.iamProviderCallback.mockImplementationOnce(() => Promise.resolve(false));

    render(<Auth0CallbackPage />);

    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith('/login');
      expect(LoginService.iamProviderCallback).toBeCalledTimes(1);
    });
  });

  it('should sign in the user when token exchange succeeds', async () => {
    // No user logged in
    // mockUserContextService.user = null;
    // Auth code and state are defined
    const params: { [key: string]: string } = {
      code: 'code',
      state: '/dashboard',
    };
    mockSearchParams.get.mockImplementation((key: string) => params[key]);
    mockLoginServiceClass.iamProviderCallback.mockImplementationOnce(() => Promise.resolve(true));

    render(<Auth0CallbackPage />);

    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith('/dashboard');
      expect(LoginService.iamProviderCallback).toBeCalledTimes(1);
    });
  });
});
