import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { classNamePropTypes } from 'utilities/propTypes';

import './Button.scss';

const Button = ({ children, className, ...rest }) => (
  <button className={classNames('button', className)} {...rest}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: classNamePropTypes,
};

export default Button;
