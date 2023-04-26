import { BroadcastEvent } from './BroadcastEvent';

/**
 * Dispatch an broadcast event which is broadcast from the shell to an MFE.
 *
 * @param {T} event
 */
export const broadcastEvent = <T extends BroadcastEvent>(event: T): void => {
  if (!event.eventType) {
    throw new Error('Event type is not defined');
  }
  window.dispatchEvent(
    new CustomEvent(event.eventType, {
      detail: event,
    })
  );
};
