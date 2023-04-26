import { RequestEventType } from './EventType';
import { RequestEvent } from './RequestEvent';

/**
 * Register a listener for a request event in the shell. Request events are sent from an MFE to the shell. This function
 * should generally be used in the shell.
 *
 * Each new registation should be done in a function contained in the event-subscriber-registrations directory.
 *
 * @param {RequestEventType} requestEventType
 * @param {(event: CustomEvent<T>) => void} callback
 */
export const registerRequestEventSubscriber = <T extends RequestEvent>(
  requestEventType: RequestEventType,
  callback: (event: CustomEvent<T>) => void
) => {
  console.log(`Registering request event subscriber for event type ${requestEventType}`);
  window.addEventListener(requestEventType, callback as EventListener);
};
