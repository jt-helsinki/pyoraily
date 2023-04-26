/*
 *
 * MIT License.
 *
 */
import { AthleteManagerStateManager } from '@src/state/client/AthleteManagerStateManager';
import {
  BroadcastEventType,
  registerBroadcastEventSubscriber,
  UserProfileBroadcastEvent,
} from 'pyoraily-shared-frontend/events';

const eventCallback = (event: CustomEvent<UserProfileBroadcastEvent>): void => {
  AthleteManagerStateManager.currentState().setUserProfile(event.detail.userProfile);
};

export const userProfileBroadcastEventSubscriberRegistration = (): void => {
  registerBroadcastEventSubscriber<UserProfileBroadcastEvent>(BroadcastEventType.USER_PROFILE_BROADCAST, eventCallback);
};
