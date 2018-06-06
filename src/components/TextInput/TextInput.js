import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import './TextInput.css';

function handleChange(callback) {
  return e => {
    callback(e.target.value);
  };
}

const TextInput = ({ value, className, onChange, ...rest }) => (
  <input
    className={classNames('text-input', className)}
    type="text"
    value={value}
    onChange={handleChange(onChange)}
    {...rest}
  />
);

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
