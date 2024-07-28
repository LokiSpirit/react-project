import { CustomLink } from '../customLink/CustomLink';
import styles from './navigation.module.css';

type NavigationProps = {
  setPageName: (name: string) => void;
  endpoints: string[];
};

const HeaderNavigation = ({ setPageName, endpoints }: NavigationProps) => {
  const changeSearchCategory = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetName = event.currentTarget.getAttribute('id');
    if (targetName) {
      setPageName(targetName);
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
