/*
 *
 * MIT License.
 *
 */
import { useUserSessionStateStore } from '@src/react/hooks/state/client/useUserSessionStateStore';
import * as RouteConfig from '@src/react/routes/RouteConfig';
import * as RouteUtils from '@src/react/routes/RouteUtils';
import * as LoginService from '@src/services/LoginService';
import * as React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import { LoginLoadingComponent } from '@src/react/components/login/LoginLoadingComponent';

/**
 * Redirects a nonauthenticated user to an address where they can authenticate themself.
 *
 * @returns Null if the user is not authenticated, otherwise redirects them to their previous location.
 */
export const LoginView: React.FunctionComponent = (): React.ReactElement | null => {
  const authenticated: boolean = useUserSessionStateStore('authenticated');
  const [searchParams] = useSearchParams();
  const redirectTo: string =
    searchParams.get('redirectTo') ||
    RouteUtils.removeWildcardFromPath(RouteConfig.PROTECTED_ROUTE_PATH_NODES.dashboard.path);

  React.useEffect((): void => {
    LoginService.initLogin(redirectTo);
  }, [redirectTo]);

  return authenticated ? <Navigate replace to={redirectTo} /> : <LoginLoadingComponent message="Logging in..." />;
};
