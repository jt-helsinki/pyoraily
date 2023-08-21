/*
 *
 * MIT License.
 *
 */
import { GlobalNotification } from 'pyoraily-shared-frontend/utils/types';
import { AbstractStateManager } from 'pyoraily-shared-frontend/state/client/AbstractStateManager';
import { UiState } from '@src/state/client/state/UiState';

export class StateManager extends AbstractStateManager<UiState> {
  constructor() {
    super('UI_STATE_STORE', false, false);
  }

  protected setInitialState(set: (setFunction: (partial: UiState) => void) => any): UiState {
    return {
      notifications: [],
      isProfileSidePanelOpen: false,
      pushNotification: (toastNotification: GlobalNotification) => {
        set((draftState: UiState) => {
          // ToastNotification withthe same key can't be added twice. remove the old one.
          draftState.notifications = [
            toastNotification,
            ...draftState.notifications.filter(
              (notification: GlobalNotification) => notification.id !== toastNotification.id
            ),
          ];
        });
      },
      removeNotification: (notificationId: string | null) => {
        set((draftState: UiState) => {
          draftState.notifications = notificationId
            ? draftState.notifications.filter(
                (toastNotification: GlobalNotification) => toastNotification.id !== notificationId
              )
            : [];
        });
      },
      setNotifications: (notifications: GlobalNotification[]) => {
        set((draftState: UiState) => {
          draftState.notifications = notifications;
        });
      },
      clearNotification: (): void => {
        set((draftState: UiState) => {
          draftState.notifications = [];
        });
      },
      profileSidePanelOpenClose: () => {
        set((draftState: UiState) => {
          draftState.isProfileSidePanelOpen = !draftState.isProfileSidePanelOpen;
        });
      },
    };
  }
}

export const UiStateManager = new StateManager();
