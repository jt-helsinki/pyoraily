/*
 *
 * MIT License.
 *
 */
import * as Env from '@src/config/Env';
import { useFederatedComponent } from '@src/react/hooks/useFederatedComponent';
import { RemoteComponentWrapper } from '@src/react/mfe/RemoteComponentWrapper';
import * as React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const REMOTE_URL = Env.REACT_APP_ATHLETE_MANAGER_REMOTE_DOMAIN;
const REMOTE_NAME = 'ATHLETE_MANAGER';
const REMOTE_MODULE = './athleteManagerApp';

export const AthleteManagerMfe: React.FunctionComponent = (): React.ReactElement => {
  const { Component, errorLoading } = useFederatedComponent(REMOTE_URL, REMOTE_NAME, REMOTE_MODULE);
  return (
    <React.Suspense
      fallback={
        <Dimmer active>
          <Loader>Loading athlete manager data...</Loader>
        </Dimmer>
      }>
      {errorLoading ? <h2>Error loading module{REMOTE_MODULE}</h2> : Component && RemoteComponentWrapper(Component)}
    </React.Suspense>
  );
};
