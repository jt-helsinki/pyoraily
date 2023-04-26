/*
 *
 * MIT License.
 *
 */
import * as UserUtils from 'pyoraily-shared-frontend/utils/UserUtils';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import { UserSessionState } from '@src/state/client/state/UserSessionState';
import { UserSessionStateManager } from '@src/state/client/UserSessionStateManager';
import { StateSelector } from 'pyoraily-shared-frontend/state/lib/StateSelector';

/**
 * @see useUserSessionStateStore()
 * @param {(state: UserSessionState) => any} selector a custom selector to return specific slices of the state.
 * @return {UserSessionState} The underlying instance of the UserSessionState
 */
export const useUserSessionStateStoreWithSelector = (
  selector: (state: UserSessionState) => any
): UserSessionState | any => UserSessionStateManager.store()(selector) as any;

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
export const useUserSessionStateStore = (...propertiesToPick: (keyof UserSessionState)[]): UserSessionState | any => {
  const selector: (state: UserSessionState) => UserSessionState =
    StateSelector.selector<UserSessionState>(propertiesToPick);
  return useUserSessionStateStoreWithSelector(selector) as any;
};

/**
 * Returns the user roles contained in the UserSessionState
 * @return {string} The current user's user roles as a UserRole[].
 */
export const useUserRolesFromUseUserSessionStateStore = (): UserRole[] =>
  useUserSessionStateStoreWithSelector((state: UserSessionState): UserRole[] => state.userRoles);

/**
 * Based on the userRoles in the current user's session, does the user have permission tagged with a particular ID.
 * @return {boolean} Whether (or not) the current usercan access a resource.
 */
export const useCanUserAccessResource = (userRoles: UserRole[] | UserRole): boolean => {
  const userRolesForUser: UserRole[] = useUserRolesFromUseUserSessionStateStore();
  return UserUtils.doUserRolesIntersectRequiredUserRoles(userRolesForUser, userRoles);
};
