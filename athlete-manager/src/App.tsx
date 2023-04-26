/*
 *
 * MIT License.
 *
 */
import {
  EventSubscriberRegistrationFunctionType,
  registerEventSubscribersOnApplicationLoad,
} from '@src/events/EventConfiguration';
import { AthleteProfileContainer } from '@src/react/components/athlete-profile/AthleteProfileContainer';
import { requestEvent, RequestEventType } from 'pyoraily-shared-frontend/events';
import React from 'react';
import '@src/styles/index.scss';
import { QueryClientProvider } from '@tanstack/react-query';
import { ServerState } from '@src/state/server/ServerState';

const App = (): React.ReactElement => {
  React.useEffect(() => {
    // configure the event listeners for the MFE events
    registerEventSubscribersOnApplicationLoad.forEach(
      (registerEventSubscriber: EventSubscriberRegistrationFunctionType) => registerEventSubscriber()
    );
    requestEvent({
      eventType: RequestEventType.USER_PROFILE_REQUEST,
    });
  }, []);
  return (
    <QueryClientProvider client={ServerState}>
      <AthleteProfileContainer />
    </QueryClientProvider>
  );
};

export default App;