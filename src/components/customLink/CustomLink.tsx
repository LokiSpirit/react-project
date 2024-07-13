import { Link, useMatch } from 'react-router-dom';
import styles from './customLink.module.css';
import { ReactNode } from 'react';

type CustomLinkProps = {
  children: ReactNode;
  name: string;
  to: string;
};

const CustomLink = ({ children, name, to, ...props }: CustomLinkProps) => {
  const match = useMatch({
    path: to,
    end: to.length === 1,
  });

  return (
    <Link
      id={name}
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
