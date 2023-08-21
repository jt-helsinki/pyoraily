/*
 *
 * MIT License.
 *
 */
import {
  EventSubscriberRegistrationFunctionType,
  registerEventSubscribersOnApplicationLoad,
} from '@src/events/EventConfiguration';
import * as UserUtils from 'pyoraily-shared-frontend/utils/UserUtils';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import { MainHeaderNavigation } from '@src/react/components/navigation/MainHeaderNavigation';
import { Notifications } from '@src/react/components/notifications/Notifications';
import { ProfileCompletionGuard } from '@src/react/components/profile/ProfileCompletionGuard';
import { useUserRolesFromUseUserSessionStateStore } from '@src/react/hooks/state/client/useUserSessionStateStore';
import * as RouteConstants from '@src/react/routes/RouteConstants';
import { RoutePath } from '@src/react/routes/RoutePath';
import * as React from 'react';
import 'react-data-grid/lib/styles.css';
import { Route, Routes } from 'react-router-dom';
import { Sidebar } from 'semantic-ui-react';
import { useFetchProfileServerStateStore } from '@src/react/hooks/state/server/useUserServerStateStore';
import { LoginLoadingComponent } from '@src/react/components/login/LoginLoadingComponent';

export const AppProtected: React.FunctionComponent = (): React.ReactElement => {
  const { isLoading: isLoadingProfile } = useFetchProfileServerStateStore();
  const userRoles: UserRole[] = useUserRolesFromUseUserSessionStateStore();
  const PROTECTED_ROUTES: (React.ReactElement | null)[] = React.useMemo(
    () =>
      RouteConstants.SORTED_PROTECTED_ROUTE_PATHS.map((routePath: RoutePath) => {
        const canAccess: boolean = UserUtils.doUserRolesIntersectRequiredUserRoles(userRoles, routePath.roles);
        UserUtils.doUserRolesIntersectRequiredUserRoles(userRoles, routePath.roles);
        return canAccess ? <Route key={routePath.path} path={routePath.path} element={routePath.component} /> : null;
      }).filter((element) => element),
    []
  );

  React.useEffect(() => {
    // configure the event listeners for the MFE events
    registerEventSubscribersOnApplicationLoad.forEach(
      (registerEventSubscriber: EventSubscriberRegistrationFunctionType) => registerEventSubscriber()
    );
  }, []);

  return !isLoadingProfile ? (
    <MainHeaderNavigation>
      <div className="app-content-container">
        <Notifications />
        <ProfileCompletionGuard>
          <Routes>{PROTECTED_ROUTES}</Routes>
        </ProfileCompletionGuard>
      </div>
    </MainHeaderNavigation>
  ) : (
    <LoginLoadingComponent message="Redirecting to application..." />
  );
};
