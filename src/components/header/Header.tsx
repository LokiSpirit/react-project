import { Component, ReactNode } from 'react';
import styles from './header.module.css';

interface Props {
  children: ReactNode;
}
class Header extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <div className={styles.header}>{this.props.children}</div>;
  }
}

export default Header;
