import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  errorMessage: string;
}

class ErrorBoundary extends Component<Props, State> {
  logErrorToServices = console.log;

  constructor(props: Props) {
    super(props);
    this.state = { errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.logErrorToServices(error.toString(), info.componentStack);
  }

  render() {
    if (this.state.errorMessage) {
      return <p>{this.state.errorMessage}</p>;
    }
    return this.props.children;
  }
  /*   static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  } */
}

export default ErrorBoundary;
