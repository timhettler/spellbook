import React from 'react';
import PropTypes from 'prop-types';

function handleChange(callback) {
  return e => {
    callback(e.target.value);
  };
}

const TextInput = ({ value, onChange }) => (
  <input type="text" value={value} onChange={handleChange(onChange)} />
);

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
