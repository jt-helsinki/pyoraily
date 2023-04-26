/*
 *
 * MIT License.
 *
 */
import { GlobalNotification, GlobalNotificationType } from 'pyoraily-shared-frontend/utils/types';
import { UiStateManager } from '@src/state/client/UiStateManager';

export const addToasterNotification = (notification: GlobalNotification): void => {
  UiStateManager.currentState().pushNotification(notification);
};

const createNotification = (notification: { content: string } & Partial<GlobalNotification>): GlobalNotification => {
  const newNotification = {
    ...notification,
    id: notification.id || new Date().toISOString(),
  };
  if (notification.autoClose && !notification.timeout) {
    newNotification.timeout = 5000;
  }
  return newNotification as GlobalNotification;
};

const notificationToaster = (
  notificationId: string,
  toasterText: string,
  notificationType: GlobalNotificationType,
  autoClose = true
): void => {
  const notification: GlobalNotification = createNotification({
    id: notificationId,
    content: toasterText,
    autoClose,
    type: notificationType,
  });
  addToasterNotification(notification);
};

export const notificationToasterError = (notificationId: string, toasterText: string, autoClose = true): void => {
  notificationToaster(notificationId, toasterText, GlobalNotificationType.ERROR, autoClose);
};

export const notificationToasterSuccess = (notificationId: string, toasterText: string, autoClose = true): void => {
  notificationToaster(notificationId, toasterText, GlobalNotificationType.SUCCESS, autoClose);
};

export const notificationToasterInfo = (notificationId: string, toasterText: string, autoClose = true): void => {
  notificationToaster(notificationId, toasterText, GlobalNotificationType.INFO, autoClose);
};

export const notificationToasterWarning = (notificationId: string, toasterText: string, autoClose = true): void => {
  notificationToaster(notificationId, toasterText, GlobalNotificationType.WARNING, autoClose);
};
