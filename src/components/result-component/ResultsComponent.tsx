import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { selectItem, unselectItem } from '../../redux/slices/selectedItemsSlice';
import styles from './resultsComponent.module.css';

interface Item {
  id: string;
  name: string;
  description: string;
  detailsUrl: string;
}

interface ResultsComponentProps {
  results: Item[];
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({ results }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);

  const handleCheckboxChange = (item: Item) => {
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

export default ResultsComponent;
