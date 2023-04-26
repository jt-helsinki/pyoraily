/**
 * A broadcast event is an event that is produced by the shell and published to the event bus and can be subscribed to by any MFE.
 */
export enum BroadcastEventType {
  USER_PREFERENCES_BROADCAST = 'USER_PREFERENCES_BROADCAST',
  USER_PROFILE_BROADCAST = 'USER_PROFILE_BROADCAST',
}

/**
 * A request event is an event that is produced by an MFE and published to the event bus and can be subscribed to by the Shell.
 */
export enum RequestEventType {
  TOASTER_NOTIFICATION_REQUEST = 'TOASTER_NOTIFICATION_REQUEST',
  TOASTER_NOTIFICATION_CLOSE_REQUEST = 'TOASTER_NOTIFICATION_CLOSE_REQUEST',
  USER_PREFERENCES_REQUEST = 'USER_PREFERENCES_REQUEST',
  USER_PROFILE_REQUEST = 'USER_PROFILE_REQUEST',
}
