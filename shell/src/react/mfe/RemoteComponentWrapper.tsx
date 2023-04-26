/*
 *
 * MIT License.
 *
 */
import ErrorBoundary from '@src/react/components/common/ErrorBoundary';
import * as React from 'react';

export const RemoteComponentWrapper = (RemoteComponent: any): React.ReactNode => {
  if (!RemoteComponent) {
    return <div>Remote component not loaded yet</div>;
  }
  return (
    <ErrorBoundary errorMessage="Loading remote component failed">
      <div className="flex-auto items-center justify-center overflow-auto">
        <RemoteComponent hostName="Suomen Pyöraily" />
      </div>
    </ErrorBoundary>
  );
};
