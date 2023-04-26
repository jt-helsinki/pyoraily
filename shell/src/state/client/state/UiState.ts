/*
 *
 * MIT License.
 *
 */
import { GlobalNotification } from 'pyoraily-shared-frontend/utils/types';
import { State } from 'pyoraily-shared-frontend/state/client/state/State';

export interface UiState extends State {
  notifications: GlobalNotification[];
  isProfileSidePanelOpen: boolean;
  pushNotification: (notification: GlobalNotification) => void;
  removeNotification: (notificationId: string) => void;
  setNotifications: (notifications: GlobalNotification[]) => void;
  clearNotification: () => void;
  profileSidePanelOpenClose: () => void;
}
