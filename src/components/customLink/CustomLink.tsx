import { Link, useMatch } from 'react-router-dom';
import styles from './customLink.module.css';
import { ReactNode } from 'react';

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

  return (
    <Link
      id={id}
      onClick={changeSearchCategory}
      className={styles.navLink}
      to={to}
      style={{
        color: match ? 'blue' : 'white',
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

export { CustomLink };
