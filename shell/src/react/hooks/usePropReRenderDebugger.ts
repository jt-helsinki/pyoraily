/*
 *
 * MIT License.
 *
 */
import * as React from 'react';

/**
 * This is a React hook for debugging prop changes between renders. It is useful
 * for finding out which props may be causing rerender issues. Prop changes are printed
 * to the console.
 *
 * @param props Either a react state or props objects.
 */
/* eslint-disable no-console */
export const usePropReRenderDebugger = (props: any): void => {
  const prev = React.useRef(props);
  React.useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps: any, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
};
