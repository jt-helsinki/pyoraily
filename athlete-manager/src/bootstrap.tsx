/*
 *
 * MIT License.
 *
 */
import { TanstackReactQueryDebug } from '@src/react/components/common/debug/TanstackReactQueryDebug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@src/App';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import { ServerState } from '@src/state/server/ServerState';
import { QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={ServerState}>
      <TanstackReactQueryDebug />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
