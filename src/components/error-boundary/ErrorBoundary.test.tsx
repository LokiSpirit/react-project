import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    const ThrowError = () => {
      throw new Error('Test Error');
    };
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Please refresh the page')).toBeInTheDocument();
  });
});
