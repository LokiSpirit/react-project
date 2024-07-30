import React, { useContext } from 'react';
import Pagination from '../pagination/Pagination';
import styles from './resultsComponent.module.css';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { selectItem, unselectItem } from '../../redux/slices/selectedItemsSlice';
import { ThemeContext, ThemeContextProps } from '../theme/ThemeContext';
import { selectDetails } from '../../redux/slices/selectedDetailsSlice';
import Flyout from '../Flyout/Flyout';
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

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string, url: string) => {
    const target = event.target as HTMLElement;
    if (target.className !== 'checkBox' && target.closest('.clickable')) {
      dispatch(selectDetails({ id, url }));
      window.scrollTo(0, 0);
    }
  };

  if (!results?.length) {
    return <div className={styles.notification}>No results found!</div>;
  }

  return (
    <div style={{ width: '100%' }}>
      <div className={`${styles.pageContent} ${styles[theme]}`}>
        <div className={styles.wrapper}>
          <div className={styles.cardsContainer}>
            {results.map((result, index) => (
              <div
                className={`clickable ${styles.card} ${styles[theme]}`}
                key={index}
                onClick={(event) =>
                  handleClick(event, String(result.url).split('/').slice(-2, -1)[0], String(result.url))
                }
              >
                <input
                  className="checkBox"
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
      <Flyout />
    </div>
  );
};

export default ResultsComponent;
