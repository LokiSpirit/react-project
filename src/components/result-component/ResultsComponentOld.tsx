import React from 'react';
import Pagination from '../pagination/Pagination';
import styles from './resultComponent.module.css';
import { useUrlContext } from '../../hooks/useUrlContext';
import { Outlet } from 'react-router-dom';

export type Result = {
  [key: string]: string | number | string[];
};

export type ResultsComponentProps = {
  results: Result[] | null;
  page: number;
  total: number;
  setPage: (page: number) => void;
  pageName: string;
  onItemClick: (itemId: string) => void;
};

const itemsPerPage = 10;
const maxLength = 7;

const ResultsComponent: React.FC<ResultsComponentProps> = ({
  results,
  page,
  total,
  setPage,
  pageName,
  onItemClick,
}) => {
  const { setSelectedUrl } = useUrlContext();
  const totalPages = Math.ceil(total / itemsPerPage);

  const handleClick = (id: string, url: string) => {
    onItemClick(id);
    setSelectedUrl(url);
    window.scrollTo(0, 0);
  };

  if (!results) {
    return <div className={styles.notification}>No results found!</div>;
  }

  return (
    <div className={styles.pageContent}>
      <div className={styles.cardsContainer}>
        {results.map((result, index) => (
          <div
            className={styles.card}
            key={index}
            onClick={() => handleClick(String(result.url).split('/').slice(-2, -1)[0], String(result.url))}
          >
            <h3 className={styles.title}>{result.name || result.title}</h3>
          </div>
        ))}
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

/* import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItem, unselectItem } from '../../store/selectedItemsSlice';
import styles from './resultComponent.module.css';

const ResultsComponent = ({ results }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.selectedItems.selectedItems);

  const handleCheckboxChange = (item) => {
    if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
      dispatch(unselectItem(item.id));
    } else {
      dispatch(selectItem(item));
    }
  };

  return (
    <div className={styles.results}>
      {results.map((item) => (
        <div key={item.id} className={styles.item}>
          <input
            type="checkbox"
            checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
            onChange={() => handleCheckboxChange(item)}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ResultsComponent; */
