/*
 *
 * MIT License.
 *
 */
import { RoutePath } from '@src/react/routes/RoutePath';

export interface RootRoutePaths {
  root: string;

  login: string;

  logout: string;

  authCallback: string;
}

export interface RootRoutePathNode {
  root: RoutePath;

  login: RoutePath;

  logout: RoutePath;

  authCallback: RoutePath;
}

export interface ProtectedRoutePaths {
  default: string;

  dashboard: string;

  athleteManagerMfe?: string;

  hpyMfe?: string;

  placeholderMfe?: string;

  users: string;

  profile: string;
}

export interface ProtectedRoutePathNode {
  default: RoutePath;

  dashboard: RoutePath;

  athleteManagerMfe?: RoutePath;

  hpyMfe?: RoutePath;

  placeholderMfe?: RoutePath;

  users: RoutePath;

  profile: RoutePath;
}

export type RoutePathNode = {
  [name in keyof ProtectedRoutePathNode | keyof RootRoutePathNode]: RoutePath;
};
