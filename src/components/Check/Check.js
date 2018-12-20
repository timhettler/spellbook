import React from 'react';
import PropTypes from 'prop-types';

function handleChange(callback, type) {
  return e => {
    callback(e.target.checked, type);
  };
}

const Check = ({ label, checked, type, onChange }) => (
  <label>
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange(onChange, type)}
    />
    <span>{label}</span>
  </label>
);

Check.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Check;
