/*
 *
 * MIT License.
 *
 */
import { userPreferencesBroadcastEventSubscriberRegistration } from './event-subscriber-registrations/UserPreferencesBroadcastEventSubscriberRegistration';
import { userProfileBroadcastEventSubscriberRegistration } from './event-subscriber-registrations/UserProfileBroadcastEventSubscriberRegistration';

export type EventSubscriberRegistrationFunctionType = () => void;

/**
 * List of event subscribers to be registered on application load.
 *
 * @type {(() => void)[]}
 */
export const registerEventSubscribersOnApplicationLoad: EventSubscriberRegistrationFunctionType[] = [
  userProfileBroadcastEventSubscriberRegistration,
  userPreferencesBroadcastEventSubscriberRegistration,
];
