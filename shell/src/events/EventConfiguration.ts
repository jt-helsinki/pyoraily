/*
 *
 * MIT License.
 *
 */
import { toasterNotifictionCloseEventSubscriberRegistration } from '@src/events/event-subscriber-registrations/ToasterNotifictionCloseEventSubscriberRegistration';
import { toasterNotifictionEventSubscriberRegistration } from '@src/events/event-subscriber-registrations/ToasterNotifictionEventSubscriberRegistration';
import { userPreferencesRequestEventSubscriberRegistration } from '@src/events/event-subscriber-registrations/UserPreferencesRequestEventSubscriberRegistration';
import { userProfileRequestEventSubscriberRegistration } from '@src/events/event-subscriber-registrations/UserProfileRequestEventSubscriberRegistration';

export type EventSubscriberRegistrationFunctionType = () => void;

/**
 * List of event subscribers to be registered on application load.
 *
 * @type {(() => void)[]}
 */
export const registerEventSubscribersOnApplicationLoad: EventSubscriberRegistrationFunctionType[] = [
  toasterNotifictionEventSubscriberRegistration,
  toasterNotifictionCloseEventSubscriberRegistration,
  userProfileRequestEventSubscriberRegistration,
  userPreferencesRequestEventSubscriberRegistration,
];
