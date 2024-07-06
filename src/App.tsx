import { Component } from 'react';
import SearchComponent from './components/SearchComponent.tsx';
import ResultsComponent from './components/ResultsComponent';
import ErrorBoundary from './components/ErrorBoundary.tsx';

interface Result {
  [key: string]: string | number | string[];
}

interface State {
  searchTerm: string;
  results: Result[];
  error: boolean;
}

class App extends Component {
  state: State = {
    searchTerm: '',
    results: [],
    error: false,
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

  throwError = () => {
    throw new Error('Test error');
  };

  render() {
    return (
      <ErrorBoundary>
        <div>
          <button onClick={this.throwError}>Throw Error</button>
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
              <SearchComponent searchTerm={this.state.searchTerm} onSearch={this.handleSearch} />
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
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
