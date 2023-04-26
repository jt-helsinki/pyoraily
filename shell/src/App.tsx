/*
 *
 * MIT License.
 *
 */
import { AppProtected } from '@src/AppProtected';
import { TanstackReactQueryDebug } from '@src/react/components/common/debug/TanstackReactQueryDebug';
import { Auth0CallbackPage } from '@src/react/components/login/Auth0CallbackPage';
import { LoginView } from '@src/react/components/login/LoginView';
import { LogoutView } from '@src/react/components/login/LogoutView';
import { Notifications } from '@src/react/components/notifications/Notifications';
import { ProtectedRoute } from '@src/react/routes/ProtectedRoute';
import * as RootRoutePaths from '@src/react/routes/RootRoutePaths';
import { ServerState } from '@src/state/server/ServerState';
import '@src/styles/index.scss';
import { QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

export const App: React.FunctionComponent = (): React.ReactElement => (
  <QueryClientProvider client={ServerState}>
    <TanstackReactQueryDebug />
    <BrowserRouter>
      <Routes>
        <Route
          path={RootRoutePaths.ROOT_ROUTE_PATHS.login}
          element={
            <>
              <Notifications />
              <LoginView />
            </>
          }
        />
        <Route
          path={RootRoutePaths.ROOT_ROUTE_PATHS.logout}
          element={
            <>
              <Notifications />
              <LogoutView />
            </>
          }
        />
        <Route path={RootRoutePaths.ROOT_ROUTE_PATHS.authCallback} element={<Auth0CallbackPage />} />
        <Route
          path={RootRoutePaths.ROOT_ROUTE_PATHS.root}
          element={
            <ProtectedRoute>
              <AppProtected />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
