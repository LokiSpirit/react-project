import { Component } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import SearchComponent from './components/search-component/SearchComponent.tsx';
import ResultsComponent from './components/result-component/ResultsComponent.tsx';
import ErrorBoundary from './components/error-boundary/ErrorBoundary.tsx';
import ThrowButton from './components/throw-button/ThrowButton.tsx';
import Main from './components/main/Main.tsx';
import styles from './App.module.css';

type Result = {
  [key: string]: string | number | string[];
};

type State = {
  searchTerm: string;
  results: Result[];
  error: boolean;
  loading: boolean;
};

const storedTerm = localStorage.getItem('searchTerm');
const term = storedTerm ? JSON.parse(storedTerm)['term'] : '';

class App extends Component {
  state: State = {
    searchTerm: typeof term === 'string' ? term : '',
    results: [],
    error: false,
    loading: false,
  };

  private endpoints: string[] = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];

  componentDidUpdate(_prevProps: unknown, prevState: State) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      const term = this.state.searchTerm;
      localStorage.setItem('searchTerm', JSON.stringify({ term }));
    }
  }

  componentDidMount() {
    this.fetchData(this.state.searchTerm);
  }

  fetchData = (searchTerm: string) => {
    const term = searchTerm.trim();
    const url = 'https://swapi.dev/api/';
    const query = term ? `?search=${term}&page=1` : '';
    const values: Result[] = [];
    this.setState({ loading: true });
    Promise.allSettled(
      this.endpoints.map((endpoint) => fetch(url + `${endpoint}/${query}`).then((response) => response.json())),
    )
      .then((results) => {
        results.forEach((result) => {
          if (result.status === 'fulfilled' && result.value && result.value.results) {
            values.push(...result.value.results);
          }
        });
        this.setState({ results: values });
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  handleSearch = (searchTerm: string) => {
    if (searchTerm !== this.state.searchTerm) {
      this.setState({ searchTerm: searchTerm });
      this.fetchData(searchTerm);
    }
  };

  render() {
    return (
      <ErrorBoundary>
        <div className={styles.container}>
          <div className={styles.topWrapper}>
            <SearchComponent searchTerm={this.state.searchTerm} onSearch={this.handleSearch} />
            <ThrowButton>Throw Error</ThrowButton>
          </div>
          <Main>
            <div className={styles.bottomWrapper}>
              {this.state.loading && (
                <p
                  style={{
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '2rem',
                    background: 'rgba(11, 8, 155, 0.8)',
                    padding: '20px',
                  }}
                >
                  Loading...
                </p>
              )}
              {this.state.error ? (
                <div>Something went wrong. Please try again later.</div>
              ) : (
                <ResultsComponent results={this.state.results} />
              )}
            </div>
          </Main>
        </div>
        <ScrollRestoration
          getKey={(location) => {
            return location.pathname;
          }}
        />
      </ErrorBoundary>
    );
  }
}

export default App;
