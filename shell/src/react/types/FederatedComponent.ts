/*
 *
 * MIT License.
 *
 */
import { FederatedModule } from '@src/react/types/FederatedModule';
import * as React from 'react';

export interface FederatedComponent {
  errorLoading: boolean;

  component: React.ReactElement | null;

  module: FederatedModule;
}
