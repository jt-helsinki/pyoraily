/*
 *
 * MIT License.
 *
 */

import { useFetchProfileServerStateStore } from '@src/react/hooks/state/server/useUserServerStateStore';
import { PROTECTED_ROUTE_PATH_NODES } from '@src/react/routes/RouteConfig';
import * as RouteUtils from '@src/react/routes/RouteUtils';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';

const profilePath: string = RouteUtils.removeWildcardFromPath(PROTECTED_ROUTE_PATH_NODES.profile.path);

export const ProfileCompletionGuard: React.FunctionComponent<React.PropsWithChildren> = (
  props: React.PropsWithChildren
): React.ReactElement => {
  const { data: user, isFetching } = useFetchProfileServerStateStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (isFetching) {
    return (
      <Dimmer active={isFetching}>
        <Loader>Fetching your profile</Loader>
      </Dimmer>
    );
  }

  return (user?.firstName && user?.lastName) || location.pathname === profilePath ? (
    <>{props.children}</>
  ) : (
    <Message warning={true}>
      <Message.Header>Profile not setup.</Message.Header>
      <p>Please update your profile before using this application.</p>
      <Button onClick={() => navigate(profilePath)}>Profile</Button>
    </Message>
  );
};
