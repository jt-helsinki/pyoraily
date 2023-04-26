import { GlobalNotificationType } from 'pyoraily-shared-frontend/utils/types';
import * as UiService from '@src/services/UiService';
import { UiStateManager } from '@src/state/client/UiStateManager';

describe('UiService tests', () => {
  afterEach(() => {
    UiStateManager.resetToNew();
  });

  beforeEach(() => {
    UiStateManager.resetToNew();
  });

  test('if addToasterNotification() creaates a ToasterNotifiction on the state correctly', () => {
    expect(UiStateManager.currentState().notifications).toHaveLength(0);
    UiService.addToasterNotification({
      id: 'test',
      autoClose: true,
      content: 'a message',
      type: GlobalNotificationType.INFO,
      timeout: 0,
    });
    expect(UiStateManager.currentState().notifications).toHaveLength(1);
    expect(UiStateManager.currentState().notifications[0].id).toEqual('test');
    expect(UiStateManager.currentState().notifications[0].autoClose).toEqual(true);
    expect(UiStateManager.currentState().notifications[0].content).toEqual('a message');
    expect(UiStateManager.currentState().notifications[0].type).toEqual(GlobalNotificationType.INFO);
    expect(UiStateManager.currentState().notifications[0].timeout).toEqual(0);
  });

  test('if notificationToasterError() creaates a ToasterNotifiction on the state correctly', () => {
    expect(UiStateManager.currentState().notifications).toHaveLength(0);
    UiService.notificationToasterError('test', 'a message');
    expect(UiStateManager.currentState().notifications).toHaveLength(1);
    expect(UiStateManager.currentState().notifications[0].id).toEqual('test');
    expect(UiStateManager.currentState().notifications[0].autoClose).toEqual(true);
    expect(UiStateManager.currentState().notifications[0].content).toEqual('a message');
    expect(UiStateManager.currentState().notifications[0].type).toEqual(GlobalNotificationType.ERROR);
    expect(UiStateManager.currentState().notifications[0].timeout).toEqual(5000);
    UiStateManager.resetToNew();

    UiService.notificationToasterError('test', 'a message', false);
    expect(UiStateManager.currentState().notifications).toHaveLength(1);
    expect(UiStateManager.currentState().notifications[0].id).toEqual('test');
    expect(UiStateManager.currentState().notifications[0].autoClose).toEqual(false);
    expect(UiStateManager.currentState().notifications[0].content).toEqual('a message');
    expect(UiStateManager.currentState().notifications[0].type).toEqual(GlobalNotificationType.ERROR);
    expect(UiStateManager.currentState().notifications[0].timeout).toBeUndefined();
  });

  test('if notificationToasterStatus() creaates a ToasterNotifiction on the state correctly', () => {
    expect(UiStateManager.currentState().notifications).toHaveLength(0);
    UiService.notificationToasterInfo('test', 'a message');
    expect(UiStateManager.currentState().notifications).toHaveLength(1);
    expect(UiStateManager.currentState().notifications[0].id).toEqual('test');
    expect(UiStateManager.currentState().notifications[0].autoClose).toEqual(true);
    expect(UiStateManager.currentState().notifications[0].content).toEqual('a message');
    expect(UiStateManager.currentState().notifications[0].type).toEqual(GlobalNotificationType.INFO);
    expect(UiStateManager.currentState().notifications[0].timeout).toEqual(5000);
    UiStateManager.resetToNew();

    UiService.notificationToasterInfo('test', 'a message', false);
    expect(UiStateManager.currentState().notifications).toHaveLength(1);
    expect(UiStateManager.currentState().notifications[0].id).toEqual('test');
    expect(UiStateManager.currentState().notifications[0].autoClose).toEqual(false);
    expect(UiStateManager.currentState().notifications[0].content).toEqual('a message');
    expect(UiStateManager.currentState().notifications[0].type).toEqual(GlobalNotificationType.INFO);
    expect(UiStateManager.currentState().notifications[0].timeout).toBeUndefined();
  });

  test('if notificationToasterLog() creaates a ToasterNotifiction on the state correctly', () => {
    expect(UiStateManager.currentState().notifications).toHaveLength(0);
    UiService.notificationToasterWarning('test', 'a message');
    expect(UiStateManager.currentState().notifications).toHaveLength(1);
    expect(UiStateManager.currentState().notifications[0].id).toEqual('test');
    expect(UiStateManager.currentState().notifications[0].autoClose).toEqual(true);
    expect(UiStateManager.currentState().notifications[0].content).toEqual('a message');
    expect(UiStateManager.currentState().notifications[0].type).toEqual(GlobalNotificationType.WARNING);
    expect(UiStateManager.currentState().notifications[0].timeout).toEqual(5000);
    UiStateManager.resetToNew();

    UiService.notificationToasterWarning('test', 'a message', false);
    expect(UiStateManager.currentState().notifications).toHaveLength(1);
    expect(UiStateManager.currentState().notifications[0].id).toEqual('test');
    expect(UiStateManager.currentState().notifications[0].autoClose).toEqual(false);
    expect(UiStateManager.currentState().notifications[0].content).toEqual('a message');
    expect(UiStateManager.currentState().notifications[0].type).toEqual(GlobalNotificationType.WARNING);
    expect(UiStateManager.currentState().notifications[0].timeout).toBeUndefined();
  });
});
