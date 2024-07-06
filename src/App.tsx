import { Component } from 'react';
import SearchComponent from './components/SearchComponent.tsx';
import ResultsComponent from './components/ResultsComponent';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import Button from './components/button/Button.tsx';

interface Result {
  [key: string]: string | number | string[];
}

interface State {
  searchTerm: string;
  results: Result[];
  error: boolean;
  loading: boolean;
}

class App extends Component {
  state: State = {
    searchTerm: '',
    results: [],
    error: false,
    loading: false,
  };

  private endpoints: string[] = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];

  componentDidMount() {
    const searchTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm: searchTerm });
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
      .catch((error) => {
        console.error(error);
        this.setState({ error: true });
      });
  };

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm: searchTerm });
    localStorage.setItem('searchTerm', searchTerm);
    this.fetchData(searchTerm);
  };

  render() {
    return (
      <ErrorBoundary>
        <div>
          <Button>Throw Error</Button>
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
              <SearchComponent searchTerm={this.state.searchTerm} onSearch={this.handleSearch} />
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
              {this.state.loading && <p>Loading...</p>}
              {this.state.error ? (
                <div>Something went wrong. Please try again later.</div>
              ) : (
                <ResultsComponent results={this.state.results} />
              )}
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
