import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
);

Button.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
