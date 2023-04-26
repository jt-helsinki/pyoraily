import { AthleteManagerState } from '@src/state/client/state/AthleteManagerState';
import { AthleteManagerStateManager } from '@src/state/client/AthleteManagerStateManager';

describe('UiStateManager tests', () => {
  beforeEach(() => {
    AthleteManagerStateManager.resetToNew();
  });

  test('if the state is setup correctly', () => {
    const athleteManagerState: AthleteManagerState = AthleteManagerStateManager.currentState();
  });

  test('if the "sideMenuOpen" state is modified correctly', () => {
    const athleteManagerState: AthleteManagerState = AthleteManagerStateManager.currentState();
  });
});
