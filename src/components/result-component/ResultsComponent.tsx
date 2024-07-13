// src/components/result-component/ResultsComponent.tsx
import React, { useEffect } from 'react';
import Pagination from '../pagination/Pagination';
import styles from './resultComponent.module.css';
import { useNavigate } from 'react-router-dom';

type Result = {
  [key: string]: string | number | string[];
};

type ResultsComponentProps = {
  results: Result[];
  page: number;
  total: number;
  setPage: (page: number) => void;
};

const itemsPerPage = 10;
const maxLength = 7;

const ResultsComponent: React.FC<ResultsComponentProps> = ({ results, page, total, setPage, pageName }) => {
  const totalPages = Math.ceil(total / itemsPerPage);
  console.log(page, total, totalPages);
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/${pageName}?page=${page}`);
  }, []);

  return (
    <div>
      {results.map((result, index) => (
        <div className={styles.card} key={index}>
          <h3 className={styles.title}>{result.name || result.title}</h3>
          <div>
            {Object.entries(result)
              .slice(1)
              .map(([key, value]) => (
                <div key={key} className={styles.row}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{key}:</span>
                  <span>{typeof value === 'string' ? value : Array.isArray(value) ? value.join(', ') : value}</span>
                </div>
              ))}
          </div>
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
