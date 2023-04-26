/*
 *
 * MIT License.
 *
 */
import { UiState } from '@src/state/client/state/UiState';
import { UiStateManager } from '@src/state/client/UiStateManager';
import { StateSelector } from 'pyoraily-shared-frontend/state/lib/StateSelector';

/**
 * @see useUiStateStore()
 * @param {(state: UiState) => any} selector a custom selector to return specific slices of the state.
 * @return {UiState} The underlying instance of the UiState
 */
export const useUiStateStoreWithSelector = (selector: (state: UiState) => any): UiState =>
  UiStateManager.store()(selector) as any;

/**
 * A React hook to return an implementation of the underlying UiState store as defined by the UiState.
 *
 * @param {keyof UiState} propertiesToPicks the properties of the state to return to the caller.
 *
 *   1. If just one property is specified then only the raw value of the property will be selected.
 *   2. If multiple properties are specified then each property/value will be selected. Note: This condition will always
 *   cause a state update regardless of whether the state has updated or njot.
 *   3. If no properties are specified, the whole state object will be selected.
 * @return {UiState} The underlying instance of the UiState
 */
export const useUiStateStore = (...propertiesToPick: (keyof UiState)[]): UiState | any => {
  const selector: (state: UiState) => UiState = StateSelector.selector<UiState>(propertiesToPick);
  return useUiStateStoreWithSelector(selector) as any;
};
