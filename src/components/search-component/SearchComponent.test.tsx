import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchComponent from './SearchComponent';

test('it saves search term to local storage on button click', () => {
  const { getByLabelText } = render(<SearchComponent />);
  const input = getByLabelText('Search') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'test term' } });

  // Mocking localStorage.setItem to test functionality
  const mockSetItem = jest.spyOn(window.localStorage, 'setItem');
  fireEvent.click(getByLabelText('Search Button'));
  expect(mockSetItem).toHaveBeenCalledWith('searchTerm', JSON.stringify({ term: 'test term' }));
});
