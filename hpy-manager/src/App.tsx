/*
 *
 * MIT License.
 *
 */
import {
  EventSubscriberRegistrationFunctionType,
  registerEventSubscribersOnApplicationLoad,
} from '@src/events/EventConfiguration';
import { HpyAthleteProfileListContainer } from '@src/react/components/hpy-athlete-profile/HpyAthleteProfileListContainer';
import { requestEvent, RequestEventType } from 'pyoraily-shared-frontend/events';
import React from 'react';
import '@src/styles/index.scss';

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
  return <HpyAthleteProfileListContainer />;
};

export default App;
