import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UrlContextProvider } from './hoc/UrlContextProvider';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from './components/theme/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <UrlContextProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </UrlContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
