import { RequestEvent } from './RequestEvent';

/**
 * Dispatch a request event which requests data from the shell to an MFE. The MFE may respond with a broadcast event.
 * responsd
 *
 * @param {T} event
 */
export const requestEvent = <T extends RequestEvent>(event: T): void => {
  if (!event.eventType) {
    throw new Error('Event type is not defined');
  }
  window.dispatchEvent(
    new CustomEvent(event.eventType, {
      detail: event,
    })
  );
};
