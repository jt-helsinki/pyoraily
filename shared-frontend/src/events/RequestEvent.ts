import { RequestEventType } from './EventType';

/**
 * A request event is an event that is sent from the MFEs to the Shell.
 * The Shell will then respond with a broadcast event.
 */
export interface RequestEvent {
  eventType: RequestEventType;
}

export interface ToasterNotificationRequestEvent extends RequestEvent {
  id: string;
  message: string;
  type: 'alert' | 'warning' | 'info';
  autoDismiss: boolean;
  eventType: RequestEventType.TOASTER_NOTIFICATION_REQUEST;
}

export interface ToasterNotificationCloseRequestEvent extends RequestEvent {
  id: string;
  eventType: RequestEventType.TOASTER_NOTIFICATION_CLOSE_REQUEST;
}

export interface UserPreferencesRequestEvent extends RequestEvent {
  eventType: RequestEventType.USER_PREFERENCES_REQUEST;
}

export interface UserProfileRequestEvent extends RequestEvent {
  eventType: RequestEventType.USER_PROFILE_REQUEST;
}
