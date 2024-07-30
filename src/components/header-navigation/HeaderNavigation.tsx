import { useAppDispatch } from '../../redux/hooks';
import { unselectDetails } from '../../redux/slices/selectedDetailsSlice';
import { unselectAllItems } from '../../redux/slices/selectedItemsSlice';
import { CustomLink } from '../customLink/CustomLink';
import styles from './navigation.module.css';

type NavigationProps = {
  setPageName: (name: string) => void;
  endpoints: string[];
};

const HeaderNavigation = ({ setPageName, endpoints }: NavigationProps) => {
  const dispatch = useAppDispatch();
  const changeSearchCategory = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetName = event.currentTarget.getAttribute('id');
    if (targetName) {
      setPageName(targetName);
      dispatch(unselectAllItems());
      dispatch(unselectDetails());
    }
  };
  return (
    <div className={styles.headerNavigation}>
      {endpoints.map((endpoint) => (
        <CustomLink key={endpoint} id={endpoint} to={`/${endpoint}`} changeSearchCategory={changeSearchCategory}>
          {endpoint.toUpperCase()}
        </CustomLink>
      ))}
    </div>
  );
};

export default HeaderNavigation;
