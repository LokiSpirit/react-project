import { Component, ChangeEvent } from 'react';

interface Props {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

interface State {
  searchTerm: string;
}

class SearchComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: this.props.searchTerm || '',
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.searchTerm.trim());
  };

  render() {
    return (
      <div>
        {<input type="text" value={this.state.searchTerm} onChange={this.handleChange} />}
        <button type="button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchComponent;
