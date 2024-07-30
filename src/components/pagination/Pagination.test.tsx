import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Pagination from './Pagination';
import selectedPageReducer from '../../redux/slices/selectedPageSlice';

const renderWithProviders = (ui, { store } = {}) => {
  const Wrapper = ({ children }) => (
    <Provider store={store || configureStore({ reducer: { selectedPage: selectedPageReducer } })}>
      <Router>{children}</Router>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper });
};

describe('Pagination Component', () => {
  test('renders the pagination component', () => {
    renderWithProviders(<Pagination lastPage={10} maxLength={7} pageName="testPage" />);

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('calls clickHandler on clicking a page number', () => {
    const store = configureStore({ reducer: { selectedPage: selectedPageReducer } });
    renderWithProviders(<Pagination lastPage={10} maxLength={7} pageName="testPage" />, { store });

    fireEvent.click(screen.getByText('2'));

    expect(store.getState().selectedPage.page).toBe(2);
  });

  test('renders ellipses for long page ranges', () => {
    renderWithProviders(<Pagination lastPage={20} maxLength={7} pageName="testPage" />);

    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });
});
