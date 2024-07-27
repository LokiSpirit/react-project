import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { unselectAllItems } from '../../redux/slices/selectedItemsSlice';
import { saveAs } from 'file-saver';
import styles from './flyout.module.css';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);

  if (selectedItems.length === 0) return null;

  const handleDownload = () => {
    const csvContent = selectedItems.map((item) => `${item.name},${item.description},${item.detailsUrl}`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, `${selectedItems.length}_items.csv`);
  };

  return (
    <div className={styles.flyout}>
      <p>{selectedItems.length} items are selected</p>
      <button onClick={() => dispatch(unselectAllItems())}>Unselect All</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
