import styles from './header.module.css';

type Props = {
  children: React.ReactNode;
};

const Header: React.FC<Props> = ({ children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.topWrapper}>{children}</div>
    </header>
  );
};

export default Header;
