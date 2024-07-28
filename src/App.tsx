import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { FetchItemsResponse, useFetchItemsQuery } from './redux/slices/apiSlice';
import { Provider } from 'react-redux';
import { RootState, store } from './redux/store';
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
import { ThemeContext, ThemeContextProps } from './components/theme/ThemeContext';
import CustomButton from './components/CustomButton/CustomButton';
import { useAppSelector } from './redux/hooks';

const endpoints: string[] = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];

const App: React.FC = () => {
  const [pageName, setPageName] = useState('films');
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const navigate = useNavigate();
  const page = useAppSelector((state: RootState) => state.selectedPage.page);
  const selectedId = useAppSelector((state: RootState) => state.selectedDetails.selectedId);
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextProps;
  const { data, isLoading, isError }: FetchItemsResponse = useFetchItemsQuery({ pageName, searchTerm, page });

  const handleSearch = (term: string) => {
    if (searchTerm !== term) {
      setSearchTerm(term);
    }
  };

  useEffect(() => {
    if (selectedId) {
      navigate(`/${pageName}/${selectedId}/?page=${page}&details=${selectedId}`, { replace: true });
    } else {
      navigate(`/${pageName}?page=${page}`, { replace: true });
    }
  }, [selectedId, data]);

  return (
    <Provider store={store}>
      <div className={`${styles.container} ${styles[theme]}`}>
        <ErrorBoundary>
          <Header>
            <SearchComponent searchTerm={searchTerm} onSearch={handleSearch} />
            <HeaderNavigation setPageName={setPageName} endpoints={endpoints} />
            <ThrowButton>Throw Error</ThrowButton>
            <CustomButton onClick={toggleTheme} type="button">
              {theme === 'light' ? 'Dark' : 'Light'}
            </CustomButton>
          </Header>
          {isLoading ? (
            <p className={styles.loading}>Loading...</p>
          ) : isError ? (
            <div>{'Server side error'}</div>
          ) : (
            <Routes>
              <Route path="/" element={<Layout />}>
                {endpoints.map((endpoint) => (
                  <Route
                    key={endpoint}
                    path={`${endpoint}`}
                    element={<ResultsComponent results={data.results} total={data.count} pageName={pageName} />}
                  >
                    <Route
                      path=":id"
                      element={
                        <div className={styles.rightSection}>
                          <DetailComponent pageName={pageName} />
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
      </div>
    </Provider>
  );
};

export default App;
