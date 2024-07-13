import React, { useEffect, useState } from 'react';
import { useUrlContext } from '../../hooks/useUrlContext';
import styles from './detailComponent.module.css';

type Result = {
  [key: string]: string | number | string[];
};

const DetailComponent: React.FC<Result> = () => {
  const [itemDetails, setItemDetails] = useState<Result | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { selectedUrl, selectedItemId } = useUrlContext();

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(String(selectedUrl));
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: Result = await response.json();
        setItemDetails(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [selectedItemId]);

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (!itemDetails) {
    return <div>Unable to fetch details</div>;
  }

  return (
    <div className={styles.detailContainer}>
      <h2>{itemDetails.title || itemDetails.name}</h2>
      <div>
        {Object.entries(itemDetails).map(([key, value]) => (
          <div key={key}>
            <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{key}:</span>
            <span>{typeof value === 'string' ? value : Array.isArray(value) ? value.join(', ') : value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailComponent;
