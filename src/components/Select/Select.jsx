import React from 'react';
import classNames from 'classnames/bind';

import Chevron from 'components/Chevron';
import VisuallyHidden from 'components/VisuallyHidden';

import './Select.scss';

const handleChange = (callback, type) => {
  return (e) => {
    callback(e.target.value, type);
  };
};

const Select = ({
  options,
  value,
  type,
  className,
  onChange,
  label,
  allLabel,
}) => {
  const displayOptions = [{ label: allLabel, value: '' }].concat(options);
  return (
    <label className="select-container">
      <VisuallyHidden>{label}</VisuallyHidden>
      <select
        className={classNames('select', className)}
        value={value}
        onChange={handleChange(onChange, type)}
      >
        {displayOptions.map((o) => {
          const oLabel = typeof o === 'string' ? o : o.label;
          const oValue = typeof o === 'string' ? o : o.value;

          return (
            <option key={oValue} value={oValue}>
              {oLabel}
            </option>
          );
        })}
      </select>
      <span className="select-icon-container">
        <Chevron />
      </span>
    </label>
  );
};

export default Select;
