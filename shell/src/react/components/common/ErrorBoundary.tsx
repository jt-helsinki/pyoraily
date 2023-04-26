/*
 *
 * MIT License.
 *
 */
import * as React from 'react';

interface ErrorBoundaryProps extends React.PropsWithChildren {
  errorMessage: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <h1>{this.props.errorMessage}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
