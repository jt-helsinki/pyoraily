import { UiState } from '@src/state/client/state/UiState';
import { UiStateManager } from '@src/state/client/UiStateManager';

describe('UiStateManager tests', () => {
  beforeEach(() => {
    UiStateManager.resetToNew();
  });

  test('if the state is setup correctly', () => {
    const uiState: UiState = UiStateManager.currentState();
    expect(uiState.isProfileSidePanelOpen).toBeFalsy();
    expect(uiState.profileSidePanelOpenClose instanceof Function).toBeTruthy();
  });

  test('if the "sideMenuOpen" state is modified correctly', () => {
    const uiState: UiState = UiStateManager.currentState();
    expect(uiState.isProfileSidePanelOpen).toBeFalsy();
    uiState.profileSidePanelOpenClose();
    // original state should not be modified.
    expect(uiState.isProfileSidePanelOpen).toBeFalsy();

    // get the next state snapshot
    const uiState2: UiState = UiStateManager.currentState();
    expect(uiState2.isProfileSidePanelOpen).toBeTruthy();
  });
});
