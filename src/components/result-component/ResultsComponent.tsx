import React from 'react';
import Pagination from '../pagination/Pagination';
import styles from './resultsComponent.module.css';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { selectItem, unselectItem } from '../../redux/slices/selectedItemsSlice';

export type Result = {
  [key: string]: string | number | string[];
};

export type ResultsComponentProps = {
  results: Result[] | null;
  page: number;
  total: number;
  setPage: (page: number) => void;
  pageName: string;
};

const itemsPerPage = 10;
const maxLength = 7;

const ResultsComponent: React.FC<ResultsComponentProps> = ({ results, page, total, setPage, pageName }) => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state: RootState) => state.selectedItems.selectedItems);

  const handleCheckboxChange = (result: Result) => {
    const id = String(result.url).split('/').slice(-2, -1)[0];
    const name = String(result.name || result.title);
    const detailsUrl = String(result.url);

    if (selectedItems.some((item) => item.id === id)) {
      dispatch(unselectItem(id));
    } else {
      dispatch(selectItem({ id, detailsUrl, name }));
    }
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  if (!results) {
    return <div className={styles.notification}>No results found!</div>;
  }

  return (
    <div className={styles.pageContent}>
      <div className={styles.wrapper}>
        <div className={styles.cardsContainer}>
          {results.map((result, index) => (
            <div className={styles.card} key={index}>
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
          <Pagination
            currentPage={page}
            lastPage={totalPages}
            maxLength={maxLength}
            setPage={setPage}
            pageName={pageName}
          />
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default ResultsComponent;
