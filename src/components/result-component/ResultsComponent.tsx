import React from 'react';
import Pagination from '../pagination/Pagination';
import styles from './resultComponent.module.css';
import { useUrlContext } from '../../hooks/useUrlContext';
import { Outlet } from 'react-router-dom';

type Result = {
  [key: string]: string | number | string[];
};

type ResultsComponentProps = {
  results: Result[];
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
  };

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
