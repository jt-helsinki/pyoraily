/*
 *
 * MIT License.
 *
 */
import { PROTECTED_ROUTE_PATH_NODES } from '@src/react/routes/RouteConfig';
import { RoutePath } from '@src/react/routes/RoutePath';
import { ProtectedRoutePathNode } from '@src/react/routes/RoutePathNode';

export const SORTED_PROTECTED_ROUTE_PATHS: RoutePath[] = Object.keys(PROTECTED_ROUTE_PATH_NODES)
  .map((key: string) => PROTECTED_ROUTE_PATH_NODES[key as keyof ProtectedRoutePathNode] as any)
  .filter((value) => value)
  .sort((a: RoutePath, b: RoutePath) => a.sortOrder - b.sortOrder);

export const PRIMARY_ROUTE_PATHS: RoutePath[] = SORTED_PROTECTED_ROUTE_PATHS.filter(
  (routePath: RoutePath) => routePath.menuType === 'primary'
);

export const SECONDARY_ROUTE_PATHS: RoutePath[] = SORTED_PROTECTED_ROUTE_PATHS.filter(
  (routePath: RoutePath) => routePath.menuType === 'secondary'
);

export const ACTION_ROUTE_PATHS: RoutePath[] = SORTED_PROTECTED_ROUTE_PATHS.filter(
  (routePath: RoutePath) => routePath.menuType === 'action'
);
