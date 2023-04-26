/*
 *
 * MIT License.
 *
 */
import { useUserSessionStateStore } from '@src/react/hooks/state/client/useUserSessionStateStore';
import * as React from 'react';
import { createSearchParams, Navigate, useLocation } from 'react-router-dom';

/**
 * Shows the children given as an argument if the user is authenticated.
 * Otherwise redirects the user to {@link LoginView}.
 * @param props Child elements to render
 * @returns A protected view
 */
export const ProtectedRoute: React.FunctionComponent<React.PropsWithChildren> = (
  props: React.PropsWithChildren
): React.ReactElement<React.PropsWithChildren> => {
  const { pathname } = useLocation();
  const authenticated: boolean = useUserSessionStateStore('authenticated');

  if (!authenticated) {
    const searchParams: URLSearchParams = createSearchParams({
      redirectTo: pathname,
    });
    return <Navigate to={`/login?${searchParams}`} state={{ error: 'Unauthorized' }} />;
  }

  return <>{props.children}</>;
};
