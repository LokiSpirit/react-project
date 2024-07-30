import React from 'react';
import styles from './main.module.css';

type Props = {
  children: React.ReactNode;
};

const Main: React.FC<Props> = ({ children }) => {
  return (
    <main className={styles.main} role="main">
      {children}
    </main>
  );
};

export default Main;
