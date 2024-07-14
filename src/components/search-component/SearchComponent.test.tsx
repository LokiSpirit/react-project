import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchComponent from './SearchComponent';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('SearchComponent', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('saves the entered value to the local storage when Search button is clicked', () => {
    render(<SearchComponent searchTerm="" onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test search' } });

    const button = screen.getByText('Search');
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });

  it('retrieves the value from local storage upon mounting', () => {
    localStorage.setItem('searchTerm', 'saved search');

    render(<SearchComponent searchTerm={localStorage.getItem('searchTerm') || ''} onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('saved search');
  });

  it('updates the input value correctly when the user types', () => {
    render(<SearchComponent searchTerm="" onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'new search term' } });

    expect(input).toHaveValue('new search term');
  });

  it('calls onSearch with trimmed input value when Search button is clicked', () => {
    render(<SearchComponent searchTerm="" onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: '  search term  ' } });

    const button = screen.getByText('Search');
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('search term');
  });

  it('triggers onSearch on form submission', () => {
    render(<SearchComponent searchTerm="" onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'submit term' } });

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockOnSearch).toHaveBeenCalledWith('submit term');
  });
});
