import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import SearchComponent from './components/search-component/SearchComponent';
import ResultsComponent from './components/result-component/ResultsComponent';
import DetailComponent from './components/detail-component/DetailComponent'; // Assume you have this component
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import ThrowButton from './components/throw-button/ThrowButton';
import NotFound from './pages/not-found/NotFound';
import styles from './App.module.css';
import useLocalStorage from './hooks/SaveTermToLS';
import Header from './components/header/Header';
import Navigation from './components/header-navigation/Navigation';
import Layout from './components/Layout';
import { useUrlContext } from './hooks/useUrlContext';

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
  const { selectedItemId, setSelectedItemId } = useUrlContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm, page, pageName]);

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
      setTotal(result.count);
      setResults(result.results);
      navigate(`/${pageName}?page=${page}`, { replace: true });
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

  const handleItemClick = (itemId: string) => {
    setSelectedItemId(itemId);
    navigate(`/${pageName}?page=${page}&details=${itemId}`, { replace: true });
  };

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
  }, [location.search]);

  return (
    <div className={styles.container}>
      <ErrorBoundary>
        <Header>
          <SearchComponent searchTerm={searchTerm} onSearch={handleSearch} />
          <ThrowButton>Throw Error</ThrowButton>
          <Navigation setPageName={setPageName} endpoints={endpoints} setPage={setPage} />
        </Header>
        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : error ? (
          <div>Something went wrong. Please try again later.</div>
        ) : (
          <Routes>
            <Route path="/" element={<Layout />}>
              {endpoints.map((endpoint) => (
                <Route
                  key={endpoint}
                  path={`${endpoint}`}
                  element={
                    <div className={styles.pageContent}>
                      <ResultsComponent
                        results={results}
                        page={page}
                        total={total}
                        setPage={setPage}
                        pageName={pageName}
                        onItemClick={handleItemClick}
                      />
                      {selectedItemId && (
                        <div className={styles.rightSection} onClick={handleCloseDetails}>
                          <DetailComponent handleCloseDetails={handleCloseDetails} />
                        </div>
                      )}
                    </div>
                  }
                />
              ))}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default App;
