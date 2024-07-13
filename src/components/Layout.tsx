import { Outlet } from 'react-router-dom';
import Main from './main/Main';
import styles from './layout.module.css';

const Layout: React.FC = () => {
  return (
    <Main>
      <div className={styles.bottomWrapper}>
        <Outlet />
      </div>
    </Main>
  );
};

export default Layout;
