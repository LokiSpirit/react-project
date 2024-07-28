// App.tsx
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useFetchItemsQuery } from './redux/slices/apiSlice';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SearchComponent from './components/search-component/SearchComponent';
import ResultsComponent from './components/result-component/ResultsComponent';
import DetailComponent from './components/detail-component/DetailComponent';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import ThrowButton from './components/throw-button/ThrowButton';
import NotFound from './pages/not-found/NotFound';
import styles from './App.module.css';
import useLocalStorage from './hooks/SaveTermToLS';
import Header from './components/header/Header';
import HeaderNavigation from './components/header-navigation/HeaderNavigation';
import Layout from './components/Layout';
import { useUrlContext } from './hooks/useUrlContext';
import Flyout from './components/Flyout/Flyout';

/* type Result = {
  [key: string]: string | number | string[];
}; */

const endpoints: string[] = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];

const App: React.FC = () => {
  const [pageName, setPageName] = useState('films');
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [page, setPage] = useState(1);
  const { setSelectedItemId } = useUrlContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError } = useFetchItemsQuery({ pageName, searchTerm, page });

  useEffect(() => {
    if (data) {
      navigate(`/${pageName}?page=${page}`, { replace: true });
    }
  }, [data, navigate, pageName, page]);

  const handleSearch = (term: string) => {
    if (searchTerm !== term) {
      setSearchTerm(term);
    }
  };

  /* const handleItemClick = (itemId: string) => {
    setSelectedItemId(itemId);
    navigate(`/${pageName}/${itemId}/?page=${page}&details=${itemId}`, { replace: true });
  }; */

  const handleCloseDetails = () => {
    setSelectedItemId(null);
    navigate(`/${pageName}?page=${page}`, { replace: true });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const details = searchParams.get('details');
    if (details) {
      setSelectedItemId(details);
    } else {
      setSelectedItemId(null);
    }
  }, [location.search, setSelectedItemId]);

  return (
    <Provider store={store}>
      <div className={styles.container}>
        <ErrorBoundary>
          <Header>
            <SearchComponent searchTerm={searchTerm} onSearch={handleSearch} />
            <ThrowButton>Throw Error</ThrowButton>
            <HeaderNavigation setPageName={setPageName} endpoints={endpoints} setPage={setPage} />
          </Header>
          {isLoading ? (
            <p className={styles.loading}>Loading...</p>
          ) : isError ? (
            <div>{'Error'}</div>
          ) : (
            <Routes>
              <Route path="/" element={<Layout />}>
                {endpoints.map((endpoint) => (
                  <Route
                    key={endpoint}
                    path={`${endpoint}`}
                    element={
                      <ResultsComponent
                        results={data?.results}
                        page={page}
                        total={data?.count}
                        setPage={setPage}
                        pageName={pageName}
                        selected={false}
                      />
                    }
                  >
                    <Route
                      path=":id"
                      element={
                        <div className={styles.rightSection} onClick={handleCloseDetails}>
                          <DetailComponent handleCloseDetails={handleCloseDetails} />
                        </div>
                      }
                    />
                  </Route>
                ))}
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </ErrorBoundary>
        <Flyout />
      </div>
    </Provider>
  );
};

export default App;
