import { getPaginationItems } from './paginationUtils';
import PageLink from './PageLink';
import styles from './pagination.module.css';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { selectPage } from '../../redux/slices/selectedPageSlice';

export type Props = {
  lastPage: number;
  maxLength: number;
  pageName: string;
};

const Pagination = ({ lastPage, maxLength, pageName }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedPage = useAppSelector((state: RootState) => state.selectedPage.page);

  const clickHandler = useCallback(
    (pageNum: number) => {
      dispatch(selectPage(pageNum));
      navigate(`/${pageName}/?page=${pageNum}`);
    },
    [navigate],
  );

  const pageNums = getPaginationItems(selectedPage, lastPage, maxLength);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <PageLink disabled={selectedPage === 1} onClick={() => clickHandler(selectedPage - 1)}>
        Previous
      </PageLink>
      {pageNums.map((pageNum, idx) => (
        <PageLink
          key={idx}
          active={selectedPage === pageNum}
          disabled={isNaN(pageNum)}
          onClick={() => clickHandler(pageNum)}
        >
          {!isNaN(pageNum) ? pageNum : '...'}
        </PageLink>
      ))}
      <PageLink disabled={selectedPage === lastPage} onClick={() => clickHandler(selectedPage + 1)}>
        Next
      </PageLink>
    </nav>
  );
};

export default Pagination;
