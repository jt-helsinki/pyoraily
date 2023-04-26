import { ProfileContainer } from '@src/react/components/profile/ProfileContainer';
import * as UserServerStateStore from '@src/react/hooks/state/server/useUserServerStateStore';
import { UiStateManager } from '@src/state/client/UiStateManager';
import { UserSessionStateManager } from '@src/state/client/UserSessionStateManager';
import { mockFetchProfileResponseDate } from '@src/tests/mocks/mockUserServiceResponses';
import { renderSUI, userSessionSetup } from '@src/tests/utils';
import { screen } from '@testing-library/react';
import * as React from 'react';
import * as ReactRouter from 'react-router';

describe('Profile', () => {
  beforeEach(() => {
    userSessionSetup();

    const mockedUsedNavigate = jest.fn();
    jest.spyOn(ReactRouter, 'useNavigate').mockImplementation(mockedUsedNavigate);
    jest
      .spyOn(UserServerStateStore, 'useFetchProfileServerStateStore')
      .mockImplementation(() => ({ data: mockFetchProfileResponseDate } as any));
  });

  afterAll(() => {
    UserSessionStateManager.resetToNew();
    UiStateManager.resetToNew();
    jest.resetAllMocks();
  });

  it('should match the snapshot', () => {
    const { container } = renderSUI(<ProfileContainer />);
    expect(container).toMatchSnapshot();
  });

  it('should display user email and address', async () => {
    renderSUI(<ProfileContainer />);
    expect(screen.getByText('Skid')).toBeInTheDocument();
    expect(screen.getByText('Mark')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();
    expect(screen.getByText('No UCI ID set.')).toBeInTheDocument();
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
  });
});
