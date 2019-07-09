import React from 'react';
import PropTypes from 'prop-types';

import './Check.scss';

function handleChange(callback, type) {
  return e => {
    callback(e.target.checked, type);
  };
}

const Check = ({ icon, label, checked, type, onChange, ...rest }) => (
  <label className="check" aria-label={label} {...rest}>
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange(onChange, type)}
    />
    {icon && <span role="presentation">{icon}</span>}
    <span className="check__label">{label}</span>
  </label>
);

Check.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Check;
