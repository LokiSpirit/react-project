import React from 'react';
import SearchInput from '../input/SearchInput';
import Button from '../button/Button';
import styles from './search.module.css';

class Search extends React.Component {
  render() {
    return (
      <div className={styles.searchSection}>
        <SearchInput />
        <Button />
      </div>
    );
  }
}

export default Search;
