import { useUiStateStore } from '@src/react/hooks/state/client/useUiStateStore';
import { UiState } from '@src/state/client/state/UiState';
import { UiStateManager } from '@src/state/client/UiStateManager';
import { act, renderHook } from '@testing-library/react';

describe('StateSelector tests', () => {
  beforeEach(() => {
    UiStateManager.resetToNew();
  });

  test('if the selector is selecting single properties correctly', () => {
    const isProfileSidePanelOpen: Partial<UiState> = renderHook(() => useUiStateStore('isProfileSidePanelOpen')).result
      .current;
    expect(isProfileSidePanelOpen).toBeDefined();
    expect(isProfileSidePanelOpen).toEqual(false);

    const isProfileSidePanelOpen2: Partial<UiState> = renderHook(() => useUiStateStore('isProfileSidePanelOpen')).result
      .current;
    expect(isProfileSidePanelOpen2).toBeDefined();
    expect(isProfileSidePanelOpen2).toEqual(false);

    const sideMenuOpenClose: Partial<UiState> = renderHook(() => useUiStateStore('profileSidePanelOpenClose')).result
      .current;
    expect(sideMenuOpenClose).toBeDefined();
    expect(sideMenuOpenClose instanceof Function).toBeTruthy();

    const sideMenuOpenClose2: Partial<UiState> = renderHook(() => useUiStateStore('profileSidePanelOpenClose')).result
      .current;
    expect(sideMenuOpenClose2).toBeDefined();
    expect(sideMenuOpenClose2 instanceof Function).toBeTruthy();
  });

  test('if the selector is selecting multiple properties correctly', () => {
    const { isProfileSidePanelOpen, profileSidePanelOpenClose }: UiState = renderHook(() =>
      useUiStateStore('isProfileSidePanelOpen', 'profileSidePanelOpenClose')
    ).result.current;
    expect(isProfileSidePanelOpen).toBeDefined();
    expect(isProfileSidePanelOpen).toEqual(false);
    expect(profileSidePanelOpenClose).toBeDefined();
    expect(profileSidePanelOpenClose instanceof Function).toBeTruthy();
  });

  test('if the selector is not selecting single fake properties correctly', () => {
    const fake: any = renderHook(() => useUiStateStore('fake' as any)).result.current;
    expect(fake).toBeUndefined();

    const fake2: any = renderHook(() => useUiStateStore('fake' as any)).result.current;
    expect(fake2).toBeUndefined();
  });

  test('if the selector is not selecting multiple fake properties correctly', () => {
    const { fake, fake2 }: any = renderHook(() => useUiStateStore('fake' as any, 'fake2' as any)).result.current;
    expect(fake).toBeUndefined();
    expect(fake2).toBeUndefined();
  });

  test('if the selector is selecting multiple properties correctly', () => {
    const { isProfileSidePanelOpen, fake }: any = renderHook(() =>
      useUiStateStore('isProfileSidePanelOpen', 'fake' as any)
    ).result.current;
    expect(isProfileSidePanelOpen).toBeDefined();
    expect(fake).toBeUndefined();
  });

  test('if the "sideMenuOpen" state is modified correctly', async () => {
    const uiState: UiState = renderHook(() => useUiStateStore('isProfileSidePanelOpen', 'profileSidePanelOpenClose'))
      .result.current;
    expect(uiState.isProfileSidePanelOpen).toBeFalsy();
    await act(async () => {
      uiState.profileSidePanelOpenClose();
    });
    // original state should not be modified.
    expect(uiState.isProfileSidePanelOpen).toBeFalsy();

    // get the next state snapshot
    const uiState2: UiState = renderHook(() => useUiStateStore('isProfileSidePanelOpen', 'profileSidePanelOpenClose'))
      .result.current;
    expect(uiState2.isProfileSidePanelOpen).toBeTruthy();
  });
});
