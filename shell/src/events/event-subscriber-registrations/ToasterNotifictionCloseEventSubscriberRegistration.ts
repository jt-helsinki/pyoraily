/*
 *
 * MIT License.
 *
 */
import { UiStateManager } from '@src/state/client/UiStateManager';
import {
  registerRequestEventSubscriber,
  RequestEventType,
  ToasterNotificationCloseRequestEvent,
} from 'pyoraily-shared-frontend/events';

const eventCallback = (event: CustomEvent<ToasterNotificationCloseRequestEvent>): void => {
  UiStateManager.store().getState().removeNotification(event.detail.id);
};

export const toasterNotifictionCloseEventSubscriberRegistration = (): void => {
  registerRequestEventSubscriber<ToasterNotificationCloseRequestEvent>(
    RequestEventType.TOASTER_NOTIFICATION_CLOSE_REQUEST,
    eventCallback
  );
};
