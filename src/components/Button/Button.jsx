import React from 'react';
import cx from 'classnames';

import styles from './Button.module.scss';

const Button = ({ children, className, ...rest }) => (
  <button {...rest} className={cx(styles['button'], className)}>
    {children}
  </button>
);

export default Button;
