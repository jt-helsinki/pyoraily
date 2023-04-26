import { PROTECTED_ROUTE_PATH_NODES } from '@src/react/routes/RouteConfig';
import { ProtectedRoutePathNode } from '@src/react/routes/RoutePathNode';

describe('Tests if the RouteConfig functions work as expected.', () => {
  test('if an invalid path returns null', () => {
    const protectedRoutes: ProtectedRoutePathNode = PROTECTED_ROUTE_PATH_NODES;
    expect(Object.keys(protectedRoutes).length).toEqual(6);
    expect(protectedRoutes.default).toBeDefined();
    expect(protectedRoutes.dashboard).toBeDefined();
    expect(protectedRoutes.athleteManagerMfe).toBeDefined();
    expect(protectedRoutes.users).toBeDefined();
  });
});
