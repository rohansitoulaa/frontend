import React, { ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      errorInfo,
    });
    // You can also log the error to an error reporting service like Sentry, etc.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>Something went wrong!</h2>
          <details>
            <summary>Click for more details</summary>
            <p>{this.state.error?.message}</p>
            <pre>{this.state.errorInfo?.componentStack}</pre>
          </details>
        </div>
      );
    }

    return this.props.children; // render children if no error
  }
}

export default ErrorBoundary;
