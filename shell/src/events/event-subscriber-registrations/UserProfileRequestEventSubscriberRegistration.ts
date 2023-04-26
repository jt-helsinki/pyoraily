/*
 *
 * MIT License.
 *
 */
import { ServerState } from '@src/state/server/ServerState';
import { fetchProfile } from '@src/state/server/UserServerStateManager';
import {
  broadcastEvent,
  BroadcastEventType,
  registerRequestEventSubscriber,
  RequestEventType,
  UserProfileBroadcastEvent,
  UserProfileRequestEvent,
} from 'pyoraily-shared-frontend/events';
import { User } from 'pyoraily-shared-frontend/model/User';

const eventCallback = (event: CustomEvent<UserProfileRequestEvent>): void => {
  ServerState.fetchQuery<unknown, unknown, User>(fetchProfile() as any).then((user: User) => {
    broadcastEvent<UserProfileBroadcastEvent>({
      eventType: BroadcastEventType.USER_PROFILE_BROADCAST,
      userProfile: user,
    });
  });
};

export const userProfileRequestEventSubscriberRegistration = (): void => {
  registerRequestEventSubscriber<UserProfileRequestEvent>(RequestEventType.USER_PROFILE_REQUEST, eventCallback);
};
