import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Flyout from './Flyout';
import { ThemeProvider } from '../theme/ThemeContext';
import selectedItemsReducer from '../../redux/slices/selectedItemsSlice';
import { RootState } from '../../redux/store';

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

describe('Flyout', () => {
  it('renders nothing if no items are selected', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>,
    );
    expect(screen.queryByText('items are selected')).toBeNull();
  });
});

const mockState: Partial<RootState> = {
  selectedItems: {
    selectedItems: [
      { id: '1', result: { name: 'Item 1' } },
      { id: '2', result: { name: 'Item 2' } },
    ],
  },
};

store.getState = () => mockState as RootState;

describe('Flyout', () => {
  it('renders buttons', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByText(/Unselect All/)).toBeInTheDocument();
    expect(screen.getByText(/Download/)).toBeInTheDocument();
  });
});
