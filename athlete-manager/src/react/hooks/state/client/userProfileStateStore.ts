/*
 *
 * MIT License.
 *
 */
import { AthleteManagerStateManager } from '@src/state/client/AthleteManagerStateManager';
import { AthleteManagerState } from '@src/state/client/state/AthleteManagerState';
import { User } from 'pyoraily-shared-frontend/model/User';
import { StateSelector } from 'pyoraily-shared-frontend/state/lib/StateSelector';

/**
 * @see useAthleteManagerStateStore()
 * @param {(state: UserSessionState) => any} selector a custom selector to return specific slices of the state.
 * @return {UserSessionState} The underlying instance of the UserSessionState
 */
export const useAthleteManagerStateStoreWithSelector = (
  selector: (state: AthleteManagerState) => any
): AthleteManagerState | any => AthleteManagerStateManager.store()(selector) as any;

/**
 * A React hook to return an implementation of the underlying UserSessionState store as defined by the UserSessionState.
 *
 * @param {keyof UserSessionState} propertiesToPicks the properties of the state to return to the caller.
 *
 *   1. If just one property is specified then only the raw value of the property will be selected.
 *   2. If multiple properties are specified then each property/value will be selected. Note: This condition will always
 *   cause a state update regardless of whether the state has updated or njot.
 *   3. If no properties are specified, the whole state object will be selected.
 * @return {UserSessionState} The underlying instance of the UserSessionState
 */
export const useAthleteManagerStateStore = (
  ...propertiesToPick: (keyof AthleteManagerState)[]
): AthleteManagerState | any => {
  const selector: (state: AthleteManagerState) => AthleteManagerState =
    StateSelector.selector<AthleteManagerState>(propertiesToPick);
  return useAthleteManagerStateStoreWithSelector(selector) as any;
};

/**
 * Returns the user roles contained in the UserSessionState
 * @return {string} The current user's user roles as a UserRole[].
 */
export const useUserProfileFromUseAthleteManagerStateStore = (): User =>
  useAthleteManagerStateStoreWithSelector((state: AthleteManagerState): User => state.userProfile);
