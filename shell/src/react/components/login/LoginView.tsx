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

  const initLogin = React.useCallback((): void => {
    LoginService.initLogin(redirectTo);
  }, [redirectTo]);

  if (!authenticated) {
    return (
      <div
        style={{
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          margin: 'auto',
          width: '400px',
          height: '500px',
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <img
          width="150"
          height="80"
          src="https://pyoraily.fi/wp-content/uploads/Suomen-Pyoraily-Logo-150x80.png"
          alt="Suomen Pyöräily Logo"
        />
        <Header>HPY Portal</Header>
        <p style={{ marginTop: '25px' }}>
          <Button primary onClick={initLogin}>
            Sign in
          </Button>
        </p>
      </div>
    );
  }
  return <Navigate replace to={redirectTo} />;
};
