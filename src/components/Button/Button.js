import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import './Button.scss';

const Button = ({ children, className, onClick, ...rest }) => (
  <button
    className={classNames('button', className)}
    onClick={onClick}
    {...rest}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onClick: PropTypes.func.isRequired,
};

export default Button;
