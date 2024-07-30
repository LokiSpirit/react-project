import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './errorBoundary.module.css';

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
      return (
        <div className={styles.errorContainer}>
          <p>{this.state.errorMessage}</p>
          <p>Please refresh the page</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
