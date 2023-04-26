/*
 *
 * MIT License.
 *
 */
import { ServerState } from '@src/state/server/ServerState';
import {
  broadcastEvent,
  BroadcastEventType,
  registerRequestEventSubscriber,
  RequestEventType,
  UserPreferencesBroadcastEvent,
  UserPreferencesRequestEvent,
} from 'pyoraily-shared-frontend/events';
import { UserPreferences } from 'pyoraily-shared-frontend/model/UserPreferences';

const eventCallback = (event: CustomEvent<UserPreferencesRequestEvent>): void => {
  console.log('UserPreferencesRequestEvent', event);
  // ServerState.fetchQuery<unknown, unknown, UserPreferences>(fetchUserPreferences() as any).then(
  //   (userPreferences: UserPreferences) => {
  //     broadcastEvent<UserPreferencesBroadcastEvent>({
  //       eventType: BroadcastEventType.USER_PREFERENCES_BROADCAST,
  //       userPreferences,
  //     });
  //   }
  // );
};

export const userPreferencesRequestEventSubscriberRegistration = (): void => {
  registerRequestEventSubscriber<UserPreferencesRequestEvent>(RequestEventType.USER_PREFERENCES_REQUEST, eventCallback);
};
