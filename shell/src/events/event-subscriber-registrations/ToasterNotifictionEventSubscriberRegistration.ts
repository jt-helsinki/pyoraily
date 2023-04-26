/*
 *
 * MIT License.
 *
 */
import { UiStateManager } from '@src/state/client/UiStateManager';
import {
  registerRequestEventSubscriber,
  RequestEventType,
  ToasterNotificationRequestEvent,
} from 'pyoraily-shared-frontend/events';

const eventCallback = (event: CustomEvent<ToasterNotificationRequestEvent>): void => {
  const { id, type, message, autoDismiss } = event.detail;
  UiStateManager.store()
    .getState()
    .pushNotification({
      id: id,
      autoClose: autoDismiss,
      content: message,
      type: type,
      timeout: 4000,
    } as any);
};

export const toasterNotifictionEventSubscriberRegistration = (): void => {
  registerRequestEventSubscriber<ToasterNotificationRequestEvent>(
    RequestEventType.TOASTER_NOTIFICATION_REQUEST,
    eventCallback
  );
};
