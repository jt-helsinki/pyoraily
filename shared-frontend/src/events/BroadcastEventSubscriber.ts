import { BroadcastEvent } from './BroadcastEvent';
import { BroadcastEventType } from './EventType';

/**
 * Register a listener for a broadcast event in a MFE. Broadcast events are sent from the shell to an MFE. This function
 * should generally be used in the MFEs.
 *
 * @param {BroadcastEventType} broadcastEventType
 * @param {(event: CustomEvent<T>) => void} callback
 */
export const registerBroadcastEventSubscriber = <T extends BroadcastEvent>(
  broadcastEventType: BroadcastEventType,
  callback: (event: CustomEvent<T>) => void
) => {
  console.log(`Registering broadcast event subscriber for event type ${broadcastEventType}`);
  window.addEventListener(broadcastEventType, callback as EventListener);
};
