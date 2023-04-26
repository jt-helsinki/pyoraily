/*
 *
 * MIT License.
 *
 */
import { User } from 'pyoraily-shared-frontend/model/User';
import { State } from 'pyoraily-shared-frontend/state/client/state/State';

export interface AthleteManagerState extends State {
  userProfile: User;
  setUserProfile: (user: User) => void;
}
