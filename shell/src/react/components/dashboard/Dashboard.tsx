/*
 *
 * MIT License.
 *
 */
import { useFetchProfileServerStateStore } from '@src/react/hooks/state/server/useUserServerStateStore';
import { PROTECTED_ROUTE_PATH_NODES } from '@src/react/routes/RouteConfig';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Message } from 'semantic-ui-react';

export const Dashboard: React.FunctionComponent = (): React.ReactElement => {
  const { data: user } = useFetchProfileServerStateStore();
  const navigate = useNavigate();
  return user?.firstName && user?.lastName ? (
    <>
      <Header>Hi {user?.firstName}! </Header>
      <p>This is the HPY Portal where you can manage your information for the HPY.</p>
    </>
  ) : (
    <Message warning={true}>
      <Message.Header>Profile not setup.</Message.Header>
      <p>Please update your profile before using this application.</p>
      <Button onClick={() => navigate(PROTECTED_ROUTE_PATH_NODES.profile.path)}>Profile</Button>
    </Message>
  );
};
