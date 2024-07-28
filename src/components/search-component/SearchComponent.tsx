import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import styles from './searchComponent.module.css';
import { ThemeContext, ThemeContextProps } from '../theme/ThemeContext';
import cn from 'classnames';
import CustomButton from '../CustomButton/CustomButton';

type Props = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
};

const SearchComponent: React.FC<Props> = ({ searchTerm, onSearch }) => {
  const { theme } = useContext(ThemeContext) as ThemeContextProps;

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
            className={cn(styles.searchField, styles[theme])}
            type="text"
            id="searchField"
            name="searchField"
            value={term}
            onChange={handleChange}
          />
        </label>
        <CustomButton onClick={handleSearch} type="button">
          Search
        </CustomButton>
      </fieldset>
    </form>
  );
};

export default SearchComponent;
