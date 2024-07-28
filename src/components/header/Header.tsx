import { useContext } from 'react';
import styles from './header.module.css';
import cn from 'classnames';
import { ThemeContext, ThemeContextProps } from '../theme/ThemeContext';

type Props = {
  children: React.ReactNode;
};

const Header: React.FC<Props> = ({ children }) => {
  const { theme } = useContext(ThemeContext) as ThemeContextProps;
  return (
    <header className={styles.header}>
      <div className={cn(styles.topWrapper, styles[theme])}>{children}</div>
    </header>
  );
};

export default Header;
