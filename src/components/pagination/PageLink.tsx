import { HTMLProps, useContext } from 'react';
import cn from 'classnames';
import styles from './pageLink.module.css';
import { ThemeContext, ThemeContextProps } from '../theme/ThemeContext';

export type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

export default function PageLink({ className, active, disabled, children, ...otherProps }: Props) {
  const { theme } = useContext(ThemeContext) as ThemeContextProps;

  const customClassName = cn(
    styles.pageLink,
    className,
    { [styles.active]: active, [styles.disabled]: disabled },
    styles[theme],
  );

  if (disabled) {
    return <span className={customClassName}>{children}</span>;
  }

  return (
    <a className={customClassName} aria-current={active ? 'page' : undefined} {...otherProps}>
      {children}
    </a>
  );
}
