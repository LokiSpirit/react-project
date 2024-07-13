/* import { Component, ReactNode } from 'react';
import styles from './main.module.css';

type Props = {
  children: ReactNode;
};

class Main extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <div className={styles.main}>{this.props.children}</div>;
  }
}

export default Main;
 */

import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Main: React.FC<Props> = ({ children }) => {
  return <main>{children}</main>;
};

export default Main;
