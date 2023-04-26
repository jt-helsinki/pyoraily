/*
 *
 * MIT License.
 *
 */
import { useUserSessionStateStore } from '@src/react/hooks/state/client/useUserSessionStateStore';
import * as React from 'react';

interface ProtectedItemProps extends React.PropsWithChildren {
  roles: string[];
}

export const ProtectedItem: React.FunctionComponent<ProtectedItemProps> = ({
  roles,
  children,
}: ProtectedItemProps): React.ReactElement<ProtectedItemProps> | null => {
  const { userRoles, authenticated } = useUserSessionStateStore('userRoles', 'authenticated');
  if (!authenticated) {
    return null;
  }

  const hasRequiredRoles = !roles.length || roles.every((role) => userRoles.includes(role));
  if (!hasRequiredRoles) {
    return null;
  }

  return <>{children}</>;
};
