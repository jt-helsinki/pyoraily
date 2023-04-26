/*
 *
 * MIT License.
 *
 */
import {
  registerBroadcastEventSubscriber,
  BroadcastEventType,
  UserPreferencesBroadcastEvent,
} from 'pyoraily-shared-frontend/events';

const eventCallback = (event: CustomEvent<UserPreferencesBroadcastEvent>): void => {
  console.log(event);
};

export const userPreferencesBroadcastEventSubscriberRegistration = (): void => {
  registerBroadcastEventSubscriber<UserPreferencesBroadcastEvent>(
    BroadcastEventType.USER_PREFERENCES_BROADCAST,
    eventCallback
  );
};
