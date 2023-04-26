/*
 *
 * MIT License.
 *
 */

import { State } from '../client/state/State';

/**
 * A generic selector for returing all state back to the caller.
 * @param state
 * @return {any}
 */

export class StateSelector {
  private static readonly STATIC_STATE_SELECTOR = (state: any): any => state;

  /**
   * A state selector which can be used to select individual properties from the state. This is useful for reducing
   * the number of times component is rendered.
   *
   * @param {(keyof S)[]} properties A list of properties to pick. These must be keys of S.
   * @return {(state: S) => Partial<S>} An Partial<S> object containing the properties and values to be returned to the component.
   */
  static selector<S extends State>(properties: keyof S | (keyof S)[]): (state: S) => any {
    const propertiesAsArray: (keyof S)[] = Array.isArray(properties) ? properties : [properties];
    if (propertiesAsArray.length === 1) {
      return (state: S) => state[propertiesAsArray[0]];
    }
    return propertiesAsArray.length > 1
      ? (state: S) =>
          propertiesAsArray.reduce(
            (previousValue: S, currentValue: keyof S) => ({ ...previousValue, [currentValue]: state[currentValue] }),
            {} as S
          )
      : StateSelector.STATIC_STATE_SELECTOR; // if no properties specified, just return everything
  }
}
