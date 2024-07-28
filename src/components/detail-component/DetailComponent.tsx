import styles from './detailComponent.module.css';
import { useFetchItemDetailsQuery } from '../../redux/slices/apiSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import CustomButton from '../CustomButton/CustomButton';
import { unselectDetails } from '../../redux/slices/selectedDetailsSlice';

type DetailComponentProps = {
  pageName: string;
};
const DetailComponent: React.FC<DetailComponentProps> = ({ pageName }) => {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector((state: RootState) => state.selectedDetails.selectedId);
  const { data, error, isLoading } = useFetchItemDetailsQuery({ pageName, selectedId });

  if (isLoading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <div>Unable to fetch details</div>;
  }

  return (
    <>
      <CustomButton className={styles.closeBtn} type="button" onClick={() => dispatch(unselectDetails())}>
        Close
      </CustomButton>
      <div className={styles.detailContainer}>
        <h2>{data && (data.title || data.name)}</h2>
        <div>
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{key}:</span>
              {!Array.isArray(value) && <span>{value}</span>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailComponent;
