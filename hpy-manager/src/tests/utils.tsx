/*
 *
 * MIT License.
 *
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
/* eslint-disable import/no-extraneous-dependencies */
import { queryByAttribute, render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const getTestingQueryClient = (): QueryClient =>
  new QueryClient({
    logger: {
      log: (): void => {},
      warn: (): void => {},
      error: (): void => {},
    },
    defaultOptions: {
      queries: {
        cacheTime: 0,
        retry: false,
      },
    },
  });

export const QueryClientRouterWrapper: React.FunctionComponent<React.PropsWithChildren> = (
  props: React.PropsWithChildren
): React.ReactElement<React.PropsWithChildren> => {
  const queryClient = getTestingQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{props.children}</BrowserRouter>
    </QueryClientProvider>
  );
};

export const QueryClientWrapper: React.FunctionComponent<React.PropsWithChildren> = (
  props: React.PropsWithChildren
): React.ReactElement<React.PropsWithChildren> => {
  const queryClient = getTestingQueryClient();
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};

/**
 * A convenience wrapper around '@testing-library/react.render(). Ensures components are rendered correctly.
 * @param componentToRender
 * @return {RenderResult}
 */
export const renderSUI = (componentToRender: any): RenderResult => {
  const serverState = new QueryClient();
  const renderResult = render(
    <React.StrictMode>
      <QueryClientProvider client={serverState}>{componentToRender}</QueryClientProvider>
    </React.StrictMode>
  );
  (renderResult.rerender as any).serverState = serverState;
  return renderResult;
};

export const rerenderSUI = (rerender: (ui: React.ReactElement) => void, componentToRender: any): void => {
  const { serverState } = rerender as any;
  if (!serverState) {
    throw Error('Error: Please use renderSUI() for initial render.');
  }
  rerender(
    <React.StrictMode>
      <QueryClientProvider client={serverState}>{componentToRender}</QueryClientProvider>
    </React.StrictMode>
  );
};

/**
 * Get an element from the container by ID.
 * @param {HTMLElement} container the value of the "container" property returned from renderSUI() (which is a convenience wrapper of '@testing-library/react.render()')
 * @param {string} idValue The value of the element id.
 * @return {HTMLElement | null} The html element matching the id.
 */
export const getById = (container: HTMLElement, idValue: string): HTMLElement =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  queryByAttribute.bind(null, 'id')(container, idValue)!;
