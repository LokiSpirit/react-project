import React, { MouseEventHandler, ReactNode, useContext } from 'react';
import styles from './customButton.module.css';
import cn from 'classnames';
import { ThemeContext, ThemeContextProps } from '../theme/ThemeContext';

type CustomButtonProps = {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: 'button' | 'submit' | 'reset' | undefined;
  style?: { [key: string]: string };
};

const CustomButton: React.FC<CustomButtonProps> = ({ style, className, type, children, onClick }) => {
  const { theme } = useContext(ThemeContext) as ThemeContextProps;
  return (
    <button onClick={onClick} type={type} className={cn(styles.button, styles[theme], className)} style={style}>
      {children}
    </button>
  );
};

export default CustomButton;
