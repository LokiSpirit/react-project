import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchComponent from './components/search-component/SearchComponent';
import ResultsComponent from './components/result-component/ResultsComponent';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import ThrowButton from './components/throw-button/ThrowButton';
import NotFound from './pages/not-found/NotFound';
import styles from './App.module.css';
import useLocalStorage from './hooks/SaveTermToLS';
import Header from './components/header/Header';
import Navigation from './components/header-navigation/Navigation';

type Result = {
  [key: string]: string | number | string[];
};
const endpoints: string[] = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];
const App: React.FC = () => {
  const [pageName, setPageName] = useState('films');
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [results, setResults] = useState<Result[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm, page, pageName]);

  /*   const fetchData = (searchTerm: string) => {
    const term = searchTerm.trim();
    const url = 'https://swapi.dev/api/';
    const query = term ? `search=${term}` : '';

    setLoading(true);
    setError(false);

    Promise.resolve()
      .then(() => fetch(url + `${pageName}/?page=${page}` + (query ? `&${query}` : '')))
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      })
      .then((result) => {
        setTotal(result.value.count);
        setResults(result.results);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }; */

  const fetchData = async (searchTerm: string) => {
    const term = searchTerm.trim();
    const url = 'https://swapi.dev/api/';
    const query = term ? `search=${term}` : '';

    setLoading(true);
    setError(false);

    try {
      const response = await fetch(url + `${pageName}/?page=${page}` + (query ? `&${query}` : ''));
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result);
      setTotal(result.count);
      setResults(result.results);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    if (searchTerm !== term) {
      setSearchTerm(term);
    }
  };

  return (
    <div className={styles.container}>
      <ErrorBoundary>
        <Header>
          <SearchComponent searchTerm={searchTerm} onSearch={handleSearch} />
          <ThrowButton>Throw Error</ThrowButton>
          <Navigation setPageName={setPageName} endpoints={endpoints} setPage={setPage} />
        </Header>
        {loading && <p className={styles.loading}>Loading...</p>}
        {error ? (
          <div>Something went wrong. Please try again later.</div>
        ) : (
          <Routes>
            <Route
              path="/:name"
              element={
                <ResultsComponent results={results} page={page} total={total} setPage={setPage} pageName={pageName} />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default App;
