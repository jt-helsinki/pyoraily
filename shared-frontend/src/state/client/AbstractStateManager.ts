/*
 *
 * MIT License.
 *
 */
import produce from 'immer';
import { pipe } from 'ramda';
import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { State } from './state/State';

const consoleLogger = (logToConsole: boolean): any =>
  // console logging middleware
  /* eslint-disable no-console */
  logToConsole
    ? (config: any) => (set: any, get: any, api: any) =>
        config(
          (args: any): void => {
            console.log('  applying', args);
            set(args);
            console.log('  new state', get());
          },
          get,
          api
        )
    : null;
const immer =
  (): any =>
  // immer middleware
  (config: any) =>
  (set: any, get: any, api: any) =>
    config((fn: any) => set(produce(fn)), get, api);
const persister = <S>(storeName: string, persistToBrowser: boolean): any =>
  // persist middleware
  persistToBrowser ? (config: StateCreator<S>) => persist(config as any, { name: storeName }) : null;
const newStore = <S>(
  storeName: string,
  initialStateFunction: (set: (setFunction: (partial: S) => void) => any) => S,
  persistToBrowserLocalStorage: boolean,
  logToConsole: boolean
): UseBoundStore<StoreApi<S>> => {
  const withLog = consoleLogger(logToConsole);
  const withPersist: any = persister<S>(storeName, persistToBrowserLocalStorage);
  const withImmer: any = immer();
  if (withPersist && !withLog) {
    return pipe(withImmer, withPersist, create)(initialStateFunction) as any;
  }
  if (!withPersist && withLog) {
    return pipe(withLog, withImmer, create)(initialStateFunction) as any;
  }
  if (!withPersist && !withLog) {
    return pipe(withImmer, create)(initialStateFunction) as any;
  }
  return pipe(withLog, withImmer, withPersist, create)(initialStateFunction) as any;
};

/**
 * Use this class as the base class of all client state store. Ideally, implementing classes would have a private
 * constructor and a function which returns a static reference to this class (i.e. singleton). This should ensure we
 * only have one instance of the implementing class and thus one store.
 *
 * The store uses the Immer library to create an immutable state. Thus, all state stores extending this class will
 * return an immutable state object. Any modifications to the state will be only available upon the next call to the
 * state store.
 *
 * NOTE: This class is mostly untyped because the Zustand library does not export all the of the required types.
 */
export abstract class AbstractStateManager<S extends State> {
  protected zustandStore: UseBoundStore<StoreApi<S>>;

  private persistToBrowserLocalStorage: boolean;

  private logToConsole: boolean;

  private storeName: string;

  protected constructor(storeName: string, persistToBrowserLocalStorage = false, logToConsole = false) {
    this.storeName = storeName;
    this.persistToBrowserLocalStorage = persistToBrowserLocalStorage;
    this.logToConsole = logToConsole;
    this.zustandStore = newStore<S>(storeName, this.setInitialState, persistToBrowserLocalStorage, logToConsole);
  }

  /**
   * Reset the store a completely new store. Destroy everything. Start afresh.
   */
  resetToNew(): void {
    if (this.persistToBrowserLocalStorage) {
      (this.zustandStore as any).persist.clearStorage();
    }
    this.zustandStore = newStore(
      this.storeName,
      this.setInitialState,
      this.persistToBrowserLocalStorage,
      this.logToConsole
    );
  }

  /**
   * Returns the store from the singleton.
   *
   * @return {UseBoundStore<StoreApi<S>>}
   */
  store(): UseBoundStore<StoreApi<S>> {
    return this.zustandStore;
  }

  /**
   * Returns the store from the singleton.
   *
   * @return {UseBoundStore<StoreApi<S>>}
   */
  currentState(): S {
    return this.store().getState();
  }

  /**
   * The inital state of the store.
   *
   * @param {(setFunction: (partial: S) => void) => any} set the function used for setting state on the store. Immer is used under the hood so only partial updating is required.
   * @return {S} The state object.
   * @protected
   */
  protected abstract setInitialState(set: (setFunction: (partial: S) => void) => any): S;
}
