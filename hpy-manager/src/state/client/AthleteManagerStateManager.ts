/*
 *
 * MIT License.
 *
 */
import { User } from 'pyoraily-shared-frontend/model/User';
import { AbstractStateManager } from 'pyoraily-shared-frontend/state/client/AbstractStateManager';
import { AthleteManagerState } from '@src/state/client/state/AthleteManagerState';

export class StateManager extends AbstractStateManager<AthleteManagerState> {
  constructor() {
    super('ATHLETE_MANAGER_STATE_STORE', true, false);
  }

  protected setInitialState(set: (setFunction: (partial: AthleteManagerState) => void) => any): AthleteManagerState {
    return {
      userProfile: {} as User,
      setUserProfile: (user: User): void => {
        set((draftState: AthleteManagerState) => {
          draftState.userProfile = user;
        });
      },
    };
  }
}

export const AthleteManagerStateManager = new StateManager();
