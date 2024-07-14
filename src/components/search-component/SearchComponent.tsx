import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './searchComponent.module.css';

type Props = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
};

const SearchComponent: React.FC<Props> = ({ searchTerm, onSearch }) => {
  const [term, setTerm] = useState(searchTerm);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(term.trim());
  };

  const formHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <form role="form" className={styles.searchForm} onSubmit={formHandler}>
      <fieldset className={styles.searchWrapper}>
        <label className={styles.searchLabel} htmlFor="searchField">
          <span className={styles.glassImg} />
          <input
            maxLength={100}
            autoComplete="off"
            placeholder="Search..."
            className={styles.searchField}
            type="text"
            id="searchField"
            name="searchField"
            value={term}
            onChange={handleChange}
          />
        </label>
        <button className="button" type="button" onClick={handleSearch}>
          Search
        </button>
      </fieldset>
    </form>
  );
};

export default SearchComponent;
