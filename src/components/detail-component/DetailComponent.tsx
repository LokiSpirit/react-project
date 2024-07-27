import { useUrlContext } from '../../hooks/useUrlContext';
import styles from './detailComponent.module.css';
import cn from 'classnames';
import { useFetchItemDetailsQuery } from '../../redux/slices/apiSlice';

type DetailComponentProps = {
  handleCloseDetails: () => void;
};

const DetailComponent: React.FC<DetailComponentProps> = ({ handleCloseDetails }: DetailComponentProps) => {
  const { selectedItemId } = useUrlContext();
  const { data: itemDetails, error, isLoading } = useFetchItemDetailsQuery({ pageName: 'films', id: selectedItemId });

  if (isLoading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error || !itemDetails) {
    return <div>Unable to fetch details</div>;
  }

  return (
    <>
      <button className={cn(styles.closeBtn, 'button')} type="button" onClick={handleCloseDetails}>
        Close
      </button>
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
    </>
  );
};

export default DetailComponent;
