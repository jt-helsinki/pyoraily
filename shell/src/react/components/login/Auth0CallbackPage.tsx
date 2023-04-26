/*
 *
 * MIT License.
 *
 */
import { useUserSessionStateStore } from '@src/react/hooks/state/client/useUserSessionStateStore';
import * as RootRoutePaths from '@src/react/routes/RootRoutePaths';
import * as RouteConfig from '@src/react/routes/RouteConfig';
import * as RouteUtils from '@src/react/routes/RouteUtils';
import * as LoginService from '@src/services/LoginService';
import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

/**
 * auth/callback
 *
 * This component acts as a webhook/callback which Auth0 will redirect to. The redirection contains relevant information for setting
 * up the user's session.
 */
export const Auth0CallbackPage: React.FunctionComponent = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
  const hasRun = React.useRef(false);
  const auth0Code = searchParams.get('code') || '';
  const urlState = searchParams.get('state') || '';
  const error = searchParams.get('error') || '';
  const errorDescription = searchParams.get('error_description') || '';
  const authenticated: boolean = useUserSessionStateStore('authenticated');
  const navigate = useNavigate();

  React.useEffect((): void => {
    if (!authenticated && !hasRun.current) {
      hasRun.current = true;
      LoginService.iamProviderCallback(auth0Code, urlState, error, errorDescription).then((isOK: boolean) => {
        // If we already have the user, navigate them back to the view they started the login process from
        if (isOK) {
          navigate(urlState || RouteUtils.removeWildcardFromPath(RouteConfig.PROTECTED_ROUTE_PATH_NODES.default.path));
        } else {
          navigate(RootRoutePaths.ROOT_ROUTE_PATHS.login);
        }
      });
    }
  }, []);

  // If we do not have the user nor errors, then we are waiting for the JWT exchange.
  return (
    <Dimmer active inverted>
      <Loader inverted>Logging in</Loader>
    </Dimmer>
  );
};
