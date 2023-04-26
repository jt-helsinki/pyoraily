/*
 *
 * MIT License.
 *
 */
import * as Env from '@src/config/Env';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

export const TanstackReactQueryDebug = (): React.ReactElement =>
  Env.NODE_ENV === 'development' ? <ReactQueryDevtools initialIsOpen={false} /> : <></>;
