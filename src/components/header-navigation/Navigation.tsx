import { CustomLink } from '../customLink/CustomLink';
import styles from './navigation.module.css';

type NavigationProps = {
  setPageName: (name: string) => void;
  endpoints: string[];
  setPage: (page: number) => void;
};

const Navigation = ({ setPageName, endpoints, setPage }: NavigationProps) => {
  const changeSearchCategory = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetName = event.currentTarget.getAttribute('id');
    if (targetName) {
      setPageName(targetName);
      setPage(1);
    }
  };
  return (
    <div className={styles.headerNavigation}>
      {endpoints.map((endpoint) => (
        <CustomLink key={endpoint} id={endpoint} to={`/${endpoint}`} onClick={changeSearchCategory}>
          {endpoint.toUpperCase()}
        </CustomLink>
      ))}
    </div>
  );
};

export default Navigation;
