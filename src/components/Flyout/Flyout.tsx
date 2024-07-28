import React, { useContext } from 'react';
import { RootState } from '../../redux/store';
import { unselectAllItems } from '../../redux/slices/selectedItemsSlice';
import { saveAs } from 'file-saver';
import styles from './flyout.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import cn from 'classnames';
import { ThemeContext, ThemeContextProps } from '../theme/ThemeContext';
import CustomButton from '../CustomButton/CustomButton';

const Flyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state: RootState) => state.selectedItems.selectedItems);
  const { theme } = useContext(ThemeContext) as ThemeContextProps;

  if (selectedItems.length === 0) return null;

  const handleDownload = () => {
    const csvContent = selectedItems
      .map((item) => {
        const { id, result } = item;
        const descriptionArr: string[] = [`id:${id}`];
        Object.entries(result).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value = value.join(',');
          }
          value = String(value).replace(/\r?\n/g, ' ');
          descriptionArr.push(`${key}:${value}`);
        });
        return descriptionArr.join(';');
      })
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, `${selectedItems.length}_StarWarItem.csv`);
  };

  return (
    <div className={cn(styles.flyout, styles[theme])}>
      <h3 className={styles.title}>
        {selectedItems.length === 1
          ? `${selectedItems.length} item is selected`
          : `${selectedItems.length} items are selected`}
      </h3>
      <CustomButton type="button" onClick={() => dispatch(unselectAllItems())}>
        Unselect All
      </CustomButton>
      <CustomButton type="button" onClick={handleDownload}>
        Download
      </CustomButton>
    </div>
  );
};

export default Flyout;
