// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames/bind';

import { classNameType } from 'utilities/types';

import './Button.scss';

type Props = {
  children?: Node,
  className: classNameType,
};

const Button = ({ children, className, ...rest }: Props) => (
  <button {...rest} className={classNames('button', className)}>
    {children}
  </button>
);

export default Button;
