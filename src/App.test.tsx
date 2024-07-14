import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import App from './App';
import { UrlContextProvider } from './hoc/UrlContextProvider';

// Mock components that are imported in App
vi.mock('./components/search-component/SearchComponent', () => ({
  default: ({ searchTerm, onSearch }) => (
    <div data-testid="search-component">
      <input type="text" value={searchTerm} onChange={(e) => onSearch(e.target.value)} data-testid="search-input" />
    </div>
  ),
}));

vi.mock('./components/result-component/ResultsComponent', () => ({
  default: ({ results, onItemClick }) => (
    <div data-testid="results-component">
      {results
        ? results.map((result, index) => (
            <div key={index} onClick={() => onItemClick(result.id)} data-testid={`result-item-${index}`}>
              {result.name}
            </div>
          ))
        : 'No results found'}
    </div>
  ),
}));

vi.mock('./components/detail-component/DetailComponent', () => ({
  default: ({ handleCloseDetails }) => (
    <div data-testid="detail-component">
      <button onClick={handleCloseDetails} data-testid="close-details-button">
        Close
      </button>
    </div>
  ),
}));

vi.mock('./components/error-boundary/ErrorBoundary', () => ({
  default: ({ children }) => <div data-testid="error-boundary">{children}</div>,
}));

vi.mock('./components/throw-button/ThrowButton', () => ({
  default: ({ children }) => <button data-testid="throw-button">{children}</button>,
}));

vi.mock('./components/header-navigation/HeaderNavigation', () => ({
  default: ({ setPageName, endpoints, setPage }) => (
    <div data-testid="header-navigation">
      {endpoints.map((endpoint, index) => (
        <button
          key={index}
          onClick={() => {
            setPageName(endpoint);
            setPage(1);
          }}
          data-testid={`nav-button-${endpoint}`}
        >
          {endpoint}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('./hooks/useUrlContext', () => ({
  useUrlContext: () => ({
    setSelectedItemId: vi.fn(),
  }),
}));

vi.mock('./hooks/SaveTermToLS', () => ({
  default: (key: string, initialValue: string) => {
    const [value, setValue] = React.useState(initialValue);
    return [value, setValue];
  },
}));

describe('App Component', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        count: 1,
        results: [{ id: '1', name: 'Test Result' }],
      }),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the main structure', () => {
    render(
      <BrowserRouter>
        <UrlContextProvider>
          <App />
        </UrlContextProvider>
      </BrowserRouter>,
    );

    expect(screen.getByTestId('search-component')).toBeInTheDocument();
    expect(screen.getByTestId('throw-button')).toBeInTheDocument();
    expect(screen.getByTestId('header-navigation')).toBeInTheDocument();
  });

  it('fetches and displays results', async () => {
    render(
      <BrowserRouter>
        <UrlContextProvider>
          <App />
        </UrlContextProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByTestId('results-component')).toBeInTheDocument());

    expect(screen.getByTestId('results-component')).toHaveTextContent('Test Result');
  });

  it('handles search input change', () => {
    render(
      <BrowserRouter>
        <UrlContextProvider>
          <App />
        </UrlContextProvider>
      </BrowserRouter>,
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'new search' } });

    expect(searchInput).toHaveValue('new search');
  });

  it('renders error message on fetch error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    render(
      <BrowserRouter>
        <UrlContextProvider>
          <App />
        </UrlContextProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Something went wrong. Please try again later.')).toBeInTheDocument());
  });
});
