import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Main: React.FC<Props> = ({ children }) => {
  return <main role="main">{children}</main>;
};

export default Main;
