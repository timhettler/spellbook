import React from 'react';
import PropTypes from 'prop-types';

function handleChange(callback, type) {
  return e => {
    callback(e.target.value, type);
  };
}

const Select = ({ options, value, type, onChange }) => {
  return (
    <select value={value} onChange={handleChange(onChange, type)}>
      {options.map(o => {
        const oLabel = typeof o === 'string' ? o : o.label;
        const oValue = typeof o === 'string' ? o : o.value;

        return (
          <option key={oValue} value={oValue}>
            {oLabel}
          </option>
        );
      })}
    </select>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any,
      }),
    ])
  ).isRequired,
  value: PropTypes.any.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Select;
