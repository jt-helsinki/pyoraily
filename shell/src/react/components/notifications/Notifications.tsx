/*
 *
 * MIT License.
 *
 */
import { GlobalNotification, GlobalNotificationType } from 'pyoraily-shared-frontend/utils/types';
import { useUiStateStore } from '@src/react/hooks/state/client/useUiStateStore';
import * as React from 'react';
import { Message } from 'semantic-ui-react';

interface Props {
  notification: GlobalNotification;
}

const NotificationWithTimeout = (props: Props): React.ReactElement => {
  const { notification } = props;
  const removeNotification = useUiStateStore('removeNotification');
  React.useEffect(() => {
    if (notification.timeout) {
      setTimeout(() => {
        removeNotification(notification.id);
      }, notification.timeout);
    }
  }, []);
  return (
    <Message
      error={notification.type === GlobalNotificationType.ERROR}
      info={notification.type === GlobalNotificationType.INFO}
      warning={notification.type === GlobalNotificationType.WARNING}
      success={notification.type === GlobalNotificationType.SUCCESS}
      kind={notification.type}
      key={notification.id}
      onDismiss={(): void => removeNotification(notification.id)}>
      <Message.Header>{notification.type}</Message.Header>
      <p>{notification.content}</p>
    </Message>
  );
};

export const Notifications: React.FunctionComponent = (): React.ReactElement | null => {
  const notifications: GlobalNotification[] = useUiStateStore('notifications');
  const notificationIds = notifications.map((notification: GlobalNotification) => notification.id);

  const notificationsMemo = React.useMemo(
    () => (
      <>
        {notifications.map((notification: GlobalNotification) => (
          <NotificationWithTimeout notification={notification} />
        ))}
      </>
    ),
    [notificationIds]
  );

  return <>{notificationsMemo}</>;
};
