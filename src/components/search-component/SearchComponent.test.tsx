import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '../theme/ThemeContext'; // Adjust the path if needed
import SearchComponent from './SearchComponent';
import { Provider } from 'react-redux';
import { store } from '../../redux/store'; // Adjust the path if needed
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import ResultsComponent, { ResultsComponentProps } from '../result-component/ResultsComponent';
import selectedItemsReducer from '../../redux/slices/selectedItemsSlice';
import selectedDetailsReducer from '../../redux/slices/selectedDetailsSlice';
import '@testing-library/jest-dom';
const mockResults = [
  { url: 'https://example.com/item/1', name: 'Item 1' },
  { url: 'https://example.com/item/2', name: 'Item 2' },
];

const renderWithProviders = (
  ui: React.ReactElement,
  { theme = 'light', store } = { theme: 'light', store: undefined },
) => {
  const defaultStore = configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
      selectedDetails: selectedDetailsReducer,
    },
    preloadedState: {
      selectedItems: {
        selectedItems: [],
      },
      selectedDetails: {
        selectedDetails: null,
      },
    },
  });

  return render(
    <Provider store={store || defaultStore}>
      <ThemeProvider value={{ theme }}>
        <MemoryRouter>{ui}</MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
};

describe('ResultsComponent', () => {
  const setup = (props: Partial<ResultsComponentProps> = {}) => {
    const defaultProps: ResultsComponentProps = {
      results: mockResults,
      total: mockResults.length,
      pageName: 'testPage',
      ...props,
    };
    return renderWithProviders(<ResultsComponent {...defaultProps} />);
  };

  it('displays "No results found!" when there are no results', () => {
    setup({ results: null });
    expect(screen.getByText('No results found!')).toBeInTheDocument();
  });
});

describe('SearchComponent', () => {
  const mockOnSearch = vi.fn();

  it('should render the search component', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchComponent searchTerm="" onSearch={mockOnSearch} />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should update input value on change', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchComponent searchTerm="" onSearch={mockOnSearch} />
        </ThemeProvider>
      </Provider>,
    );

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Star Wars' } });

    expect(input).toHaveValue('Star Wars');
  });

  it('should call onSearch with trimmed value when search button is clicked', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchComponent searchTerm="" onSearch={mockOnSearch} />
        </ThemeProvider>
      </Provider>,
    );

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: '  Star Wars  ' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(mockOnSearch).toHaveBeenCalledWith('Star Wars');
  });

  it('should call onSearch with trimmed value when form is submitted', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchComponent searchTerm="" onSearch={mockOnSearch} />
        </ThemeProvider>
      </Provider>,
    );

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: '  Star Wars  ' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(mockOnSearch).toHaveBeenCalledWith('Star Wars');
  });

  it('should apply the correct theme class', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchComponent searchTerm="" onSearch={mockOnSearch} />
        </ThemeProvider>
      </Provider>,
    );

    const form = screen.getByRole('form');
    expect(form).toHaveClass(/searchForm/);
  });
});
