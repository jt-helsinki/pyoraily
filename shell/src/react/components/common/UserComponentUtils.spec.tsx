import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import { UserStatus } from 'pyoraily-shared-frontend/model/UserStatus';
import { userRolesToTags, userStatusToTags } from '@src/react/components/common/UserComponentUtils';
import { renderSUI, rerenderSUI } from '@src/tests/utils';
import { screen } from '@testing-library/react';

describe('UserEditForm', () => {
  it('userRolesToTags should display correctly', () => {
    const { container, rerender } = renderSUI(userRolesToTags([UserRole.HPY, UserRole.ATHLETE, UserRole.SP]));

    expect(container.children).toHaveLength(3);

    expect(container.children[0]).toHaveClass('ui');
    expect(container.children[0]).toHaveClass('grey');
    expect(container.children[0]).toHaveClass('tiny');
    expect(container.children[0]).toHaveClass('label');
    expect(screen.getByText('HPY')).toBeInTheDocument();

    expect(container.children[1]).toHaveClass('ui');
    expect(container.children[1]).toHaveClass('grey');
    expect(container.children[1]).toHaveClass('tiny');
    expect(container.children[1]).toHaveClass('label');
    expect(screen.getByText('ATHLETE')).toBeInTheDocument();

    expect(container.children[2]).toHaveClass('ui');
    expect(container.children[2]).toHaveClass('grey');
    expect(container.children[2]).toHaveClass('tiny');
    expect(container.children[2]).toHaveClass('label');
    expect(screen.getByText('SP')).toBeInTheDocument();
  });

  it('userStatusToTags should display correctly', () => {
    const { container, rerender } = renderSUI(userStatusToTags(UserStatus.Active));

    expect(container.children).toHaveLength(1);

    expect(container.firstChild).toHaveClass('ui');
    expect(container.firstChild).toHaveClass('tiny');
    expect(container.firstChild).toHaveClass('ui');
    expect(container.firstChild).toHaveClass('green');
    expect(screen.getByText('Active')).toBeInTheDocument();

    rerenderSUI(rerender, userStatusToTags(UserStatus.Blocked));
    expect(container.firstChild).toHaveClass('ui');
    expect(container.firstChild).toHaveClass('tiny');
    expect(container.firstChild).toHaveClass('label');
    expect(container.firstChild).toHaveClass('red');
    expect(screen.getByText('Blocked')).toBeInTheDocument();

    rerenderSUI(rerender, userStatusToTags(UserStatus.NotVerifed));
    expect(container.firstChild).toHaveClass('ui');
    expect(container.firstChild).toHaveClass('tiny');
    expect(container.firstChild).toHaveClass('label');
    expect(container.firstChild).toHaveClass('yellow');
    expect(screen.getByText('Not verified')).toBeInTheDocument();

    rerenderSUI(rerender, userStatusToTags(UserStatus.Created));
    expect(container.firstChild).toHaveClass('ui');
    expect(container.firstChild).toHaveClass('tiny');
    expect(container.firstChild).toHaveClass('label');
    expect(container.firstChild).toHaveClass('teal');
    expect(screen.getByText('Created')).toBeInTheDocument();

    rerenderSUI(rerender, userStatusToTags(UserStatus.Disabled));
    expect(container.firstChild).toHaveClass('ui');
    expect(container.firstChild).toHaveClass('tiny');
    expect(container.firstChild).toHaveClass('label');
    expect(container.firstChild).toHaveClass('orange');
    expect(screen.getByText('Disabled')).toBeInTheDocument();
  });

  it('userStatusToTags should display Active correctly', () => {
    const { container } = renderSUI(userStatusToTags(UserStatus.Active));
    expect(container.firstChild).toHaveClass('ui');
    expect(container.firstChild).toHaveClass('tiny');
    expect(container.firstChild).toHaveClass('label');
    expect(container.firstChild).toHaveClass('green');
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('userStatusToTags should display Blocked correctly', () => {
    const { container } = renderSUI(userStatusToTags(UserStatus.Blocked));
    expect(container.firstChild).toHaveClass('ui');
    expect(container.firstChild).toHaveClass('tiny');
    expect(container.firstChild).toHaveClass('label');
    expect(container.firstChild).toHaveClass('red');
    expect(screen.getByText('Blocked')).toBeInTheDocument();
  });

  it('userStatusToTags should display NotVerified correctly', () => {
    const { container } = renderSUI(userStatusToTags(UserStatus.NotVerifed));
    expect(container.firstChild).toHaveClass('ui');
    expect(container.firstChild).toHaveClass('tiny');
    expect(container.firstChild).toHaveClass('label');
    expect(container.firstChild).toHaveClass('yellow');
    expect(screen.getByText('Not verified')).toBeInTheDocument();
  });

  it('userStatusToTags should display Created correctly', () => {
    const { container, rerender } = renderSUI(userStatusToTags(UserStatus.Created));
    expect(container.firstChild).toHaveClass('ui');
    expect(container.firstChild).toHaveClass('tiny');
    expect(container.firstChild).toHaveClass('label');
    expect(container.firstChild).toHaveClass('teal');
    expect(screen.getByText('Created')).toBeInTheDocument();
  });

  it('userStatusToTags should display Disabled correctly', () => {
    const { container } = renderSUI(userStatusToTags(UserStatus.Disabled));
    expect(container.firstChild).toHaveClass('ui');
    expect(container.firstChild).toHaveClass('tiny');
    expect(container.firstChild).toHaveClass('label');
    expect(container.firstChild).toHaveClass('orange');
    expect(screen.getByText('Disabled')).toBeInTheDocument();
  });
});
