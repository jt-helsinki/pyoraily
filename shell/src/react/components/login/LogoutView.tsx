/*
 *
 * MIT License.
 *
 */
import * as Env from '@src/config/Env';
import { useUserSessionStateStore } from '@src/react/hooks/state/client/useUserSessionStateStore';
import * as RootRoutePaths from '@src/react/routes/RootRoutePaths';
import * as LoginService from '@src/services/LoginService';
import * as React from 'react';
import { NavigateFunction, useNavigate, useSearchParams } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

/**
 * An independent view for logging user out and redirecting to root or the given redirectTo query param.
 *
 * NOTE: this component is not protected. Public access.
 */

export const LogoutView: React.FunctionComponent = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const isAuthenticated: boolean = useUserSessionStateStore('authenticated');
  const navigate: NavigateFunction = useNavigate();

  React.useEffect((): void => {
    if (!isAuthenticated) {
      navigate(RootRoutePaths.ROOT_ROUTE_PATHS.login);
    } else {
      LoginService.signOut(returnTo || Env.REACT_APP_LOGOUT_DESTINATION);
    }
  }, []);

  return (
    <Dimmer active inverted>
      <Loader inverted>Logging out</Loader>
    </Dimmer>
  );
};
