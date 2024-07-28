import { Link, useMatch } from 'react-router-dom';
import styles from './customLink.module.css';
import { ReactNode, useContext } from 'react';
import cn from 'classnames';
import { ThemeContext, ThemeContextProps } from '../theme/ThemeContext';

export type CustomLinkProps = {
  children: ReactNode;
  id: string;
  to: string;
  changeSearchCategory: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const CustomLink = ({ children, id, to, changeSearchCategory, ...props }: CustomLinkProps) => {
  const match = useMatch({
    path: to,
    end: to.length === 1,
  });
  const { theme } = useContext(ThemeContext) as ThemeContextProps;

  return (
    <Link
      id={id}
      onClick={changeSearchCategory}
      className={cn(styles.navLink, styles[theme])}
      to={to}
      style={{
        color: match && theme === 'light' ? 'rgb(12, 1, 41)' : match && theme === 'dark' ? 'violet' : 'white',
        background: match && theme === 'light' ? 'white' : match && theme === 'dark' ? 'brown' : 'transparent',
        borderRadius: '10px',
        padding: '5px',
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

export { CustomLink };
