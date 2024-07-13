import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UrlContextProvider } from './hoc/UrlContextProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UrlContextProvider>
        <App />
      </UrlContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
