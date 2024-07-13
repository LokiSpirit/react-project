import React from 'react';
import Pagination from '../pagination/Pagination';
import styles from './resultComponent.module.css';
import { useUrlContext } from '../../hooks/useUrlContext';

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
    <div>
      {results.map((result, index) => (
        <div
          className={styles.card}
          key={index}
          onClick={() => handleClick(String(result.url).split('/').slice(-2, -1)[0], String(result.url))}
        >
          <h3 className={styles.title}>{result.name || result.title}</h3>
          {/* <div>
            {Object.entries(result)
              .slice(1)
              .map(([key, value]) => (
                <div key={key} className={styles.row}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{key}:</span>
                  <span>{typeof value === 'string' ? value : Array.isArray(value) ? value.join(', ') : value}</span>
                </div>
              ))}
          </div> */}
        </div>
      ))}
      <Pagination
        currentPage={page}
        lastPage={totalPages}
        maxLength={maxLength}
        setPage={setPage}
        pageName={pageName}
      />
    </div>
  );
};

export default ResultsComponent;
