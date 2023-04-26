import { User } from '../model/User';
import { UserPreferences } from '../model/UserPreferences';
import { BroadcastEventType } from './EventType';

/**
 * A broadcast event is an event that is produced by the Shell and published to the event bus and can be subscribed to by any MFE.
 *
 * Broadcast events may or may not be in response to a request event.
 */
export interface BroadcastEvent {
  eventType: BroadcastEventType;
}

export interface UserProfileBroadcastEvent extends BroadcastEvent {
  userProfile: User;
  eventType: BroadcastEventType.USER_PROFILE_BROADCAST;
}

export interface UserPreferencesBroadcastEvent extends BroadcastEvent {
  userPreferences: UserPreferences;
  eventType: BroadcastEventType.USER_PREFERENCES_BROADCAST;
}
