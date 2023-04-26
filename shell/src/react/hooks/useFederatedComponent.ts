/*
 *
 * MIT License.
 *
 */
import React from 'react';

// TODO: make this readable and understandable. Hopefully with typings :)

function loadComponent(scope: string, module: string) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const container = window[scope]; // or get the container somewhere else
    if (!container) {
      throw Error(`No remote found for scope ${scope} and module ${module}`);
    }
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}
const urlCache = new Set();

const useDynamicScript = (url: string): { errorLoading: boolean; ready: boolean } => {
  const [ready, setReady] = React.useState(false);
  const [errorLoading, setErrorLoading] = React.useState(false);
  React.useEffect(() => {
    if (!url) return;
    if (urlCache.has(url)) {
      setReady(true);
      setErrorLoading(false);
      return;
    }
    setReady(false);
    setErrorLoading(false);
    const element = document.createElement('script');
    element.src = url;
    element.type = 'text/javascript';
    element.async = true;
    element.onload = () => {
      urlCache.add(url);
      setReady(true);
    };
    element.onerror = () => {
      setReady(false);
      setErrorLoading(true);
    };
    document.head.appendChild(element);
    // eslint-disable-next-line consistent-return
    return () => {
      urlCache.delete(url);
      document.head.removeChild(element);
    };
  }, [url]);
  return {
    errorLoading,
    ready,
  };
};
const componentCache = new Map();

/**
 * Used to load external modules. Normally we can use direct imports to load external modules.
 * This hook wrapper is used to avoid crashing the whole application, when a module is missing.
 * @param scope Scope defined for the external module in the Module Federation Plugin configuration
 * @param module Module name defined for the external module in the Module Federation Plugin configuration
 * @returns The component imported from the module
 */
export function useFederatedComponent(
  remoteUrl: string,
  scope: string,
  module: string
): { errorLoading: boolean; Component: React.ReactElement | null } {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = React.useState<React.ReactElement | null>(null);
  const { ready, errorLoading } = useDynamicScript(remoteUrl);

  React.useEffect(() => {
    if (ready && !Component) {
      const Comp = React.lazy(loadComponent(scope, module));
      componentCache.set(key, Comp);
      setComponent(Comp);
    }

    // key includes all dependencies (scope/module)
  }, [Component, ready, key]);
  return { errorLoading, Component };
}
