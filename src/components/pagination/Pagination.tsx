import { getPaginationItems } from './paginationUtils';
import PageLink from './PageLink';
import styles from './pagination.module.css';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export type Props = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  setPage: (page: number) => void;
  pageName: string;
};

const Pagination = ({ currentPage, lastPage, maxLength, setPage, pageName }: Props) => {
  const navigate = useNavigate();

  const clickHandler = useCallback(
    (pageNum: number) => {
      setPage(pageNum);
      navigate(`/${pageName}/?page=${pageNum}`);
    },
    [setPage, navigate],
  );

  const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <PageLink disabled={currentPage === 1} onClick={() => clickHandler(currentPage - 1)}>
        Previous
      </PageLink>
      {pageNums.map((pageNum, idx) => (
        <PageLink
          key={idx}
          active={currentPage === pageNum}
          disabled={isNaN(pageNum)}
          onClick={() => clickHandler(pageNum)}
        >
          {!isNaN(pageNum) ? pageNum : '...'}
        </PageLink>
      ))}
      <PageLink disabled={currentPage === lastPage} onClick={() => clickHandler(currentPage + 1)}>
        Next
      </PageLink>
    </nav>
  );
};

export default Pagination;
