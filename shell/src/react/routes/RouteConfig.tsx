/*
 *
 * MIT License.
 *
 */
import { HpyManagerMfe } from '@src/react/mfe/HpyManagerMfe';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import { Dashboard } from '@src/react/components/dashboard/Dashboard';
import { ProfileContainer } from '@src/react/components/profile/ProfileContainer';
import { UserContainer } from '@src/react/components/users/UserContainer';
import { AthleteManagerMfe } from '@src/react/mfe/AthleteManagerMfe';
import { ProtectedRoutePathNode } from '@src/react/routes/RoutePathNode';
import { Navigate } from 'react-router-dom';

/**
 * This is the set of routes which get shown on the left collapsable menu the left of the application.
 *
 * Any route defined here will be shown in the main application <div> defined in MainApplicationContainer.tsx
 *
 * @type {RoutePathNode}
 */
export const PROTECTED_ROUTE_PATH_NODES: ProtectedRoutePathNode = {
  default: {
    path: '/',
    menuLinkString: '',
    component: <Navigate to="/dashboard" />,
    showInMenu: false,
    roles: [],
    menuType: 'primary',
    sortOrder: 10,
  },
  dashboard: {
    path: '/dashboard/*',
    menuLinkString: 'Dashboard',
    component: <Dashboard />,
    showInMenu: true,
    roles: [],
    menuType: 'primary',
    sortOrder: 20,
  },
  athleteManagerMfe: {
    path: '/athlete/*',
    menuLinkString: 'Athlete',
    component: <AthleteManagerMfe />,
    showInMenu: true,
    roles: [UserRole.ATHLETE],
    menuType: 'primary',
    sortOrder: 80,
  },
  hpyMfe: {
    path: '/hpy/*',
    menuLinkString: 'HPY',
    component: <HpyManagerMfe />,
    showInMenu: true,
    roles: [UserRole.HPY],
    menuType: 'primary',
    sortOrder: 90,
  },
  users: {
    path: '/users/*',
    menuLinkString: 'Users',
    component: <UserContainer />,
    showInMenu: true,
    roles: [UserRole.ADMIN],
    menuType: 'primary',
    sortOrder: 130,
    icon: 'users',
  },
  profile: {
    path: '/profile/*',
    menuLinkString: 'Profile',
    component: <ProfileContainer />,
    showInMenu: true,
    roles: [],
    menuType: 'primary',
    sortOrder: 140,
    icon: 'settings',
  },
};
