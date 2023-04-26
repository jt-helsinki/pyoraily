/*
 *
 * MIT License.
 *
 */
import * as React from 'react';

/**
 * Hook to listen for escape keydowns.
 * @param onEscape function to run when escape key is pressed.
 */
export const useEscapeKeydown = (onEscape: () => void): void => {
  React.useEffect((): (() => void) => {
    const handleEsc = (event: KeyboardEvent): void => {
      if (event.code === 'Escape') {
        onEscape();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return (): void => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
};
