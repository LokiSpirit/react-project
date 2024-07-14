import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { UrlContext, UrlContextProvider } from './UrlContextProvider';

const TestComponent: React.FC = () => {
  const context = useContext(UrlContext);

  if (!context) {
    return <div>Context is not available</div>;
  }

  const { selectedItemId, selectedUrl, setSelectedItemId, setSelectedUrl } = context;

  return (
    <div>
      <div data-testid="selectedItemId">{selectedItemId}</div>
      <div data-testid="selectedUrl">{selectedUrl}</div>
      <button onClick={() => setSelectedItemId('test-id')}>Set Item ID</button>
      <button onClick={() => setSelectedUrl('http://test.url')}>Set URL</button>
    </div>
  );
};

describe('UrlContextProvider', () => {
  it('provides initial context values', () => {
    render(
      <UrlContextProvider>
        <TestComponent />
      </UrlContextProvider>,
    );

    expect(screen.getByTestId('selectedItemId')).toHaveTextContent('');
    expect(screen.getByTestId('selectedUrl')).toHaveTextContent('');
  });

  it('renders children correctly', () => {
    render(
      <UrlContextProvider>
        <div data-testid="child">Hello, World!</div>
      </UrlContextProvider>,
    );

    expect(screen.getByTestId('child')).toHaveTextContent('Hello, World!');
  });
});
