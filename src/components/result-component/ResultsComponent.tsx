import React, { useContext } from 'react';
import Pagination from '../pagination/Pagination';
import styles from './resultsComponent.module.css';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { selectItem, unselectItem } from '../../redux/slices/selectedItemsSlice';
import { ThemeContext, ThemeContextProps } from '../theme/ThemeContext';
export type Result = {
  [key: string]: string | number | string[];
};

export type ResultsComponentProps = {
  results: Result[] | null;
  total: number;
  pageName: string;
};

const itemsPerPage = 10;
const maxLength = 7;

const ResultsComponent: React.FC<ResultsComponentProps> = ({ results, total, pageName }) => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state: RootState) => state.selectedItems.selectedItems);
  const { theme } = useContext(ThemeContext) as ThemeContextProps;

  const handleCheckboxChange = (result: Result) => {
    const id = String(result.url).split('/').slice(-2, -1)[0];
    if (selectedItems.some((item) => item.id === id)) {
      dispatch(unselectItem(id));
    } else {
      dispatch(selectItem({ id, result }));
    }
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  if (!results) {
    return <div className={styles.notification}>No results found!</div>;
  }

  return (
    <div className={`${styles.pageContent} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <div className={styles.cardsContainer}>
          {results.map((result, index) => (
            <div className={`${styles.card} ${styles[theme]}`} key={index}>
              <input
                type="checkbox"
                checked={selectedItems.some((item) => item.id === String(result.url).split('/').slice(-2, -1)[0])}
                onChange={() => handleCheckboxChange(result)}
              />
              <h3 className={styles.title}>{result.name || result.title}</h3>
            </div>
          ))}
        </div>
        {results.length > 0 && total > 0 && (
          <Pagination lastPage={totalPages} maxLength={maxLength} pageName={pageName} />
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default ResultsComponent;
