import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import { ThemeProvider } from './components/theme/ThemeContext';

const RootElement = () => (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

describe('App Component', () => {
  it('renders the App component within all providers', () => {
    render(<RootElement />);
    expect(screen.getByText(/Throw Error/i)).toBeInTheDocument();
  });
});
