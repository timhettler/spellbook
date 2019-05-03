import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Chevron from '../Chevron';
import VisuallyHidden from '../VisuallyHidden';
import './Select.scss';

function handleChange(callback, type) {
  return e => {
    callback(e.target.value, type);
  };
}

class Select extends PureComponent {
  render() {
    const { value, type, className, onChange, label, allLabel } = this.props;

    const displayOptions = [{ label: allLabel, value: '' }].concat(
      this.props.options
    );
    return (
      <label className="select-container">
        <VisuallyHidden>{label}</VisuallyHidden>
        <select
          className={classNames('select', className)}
          value={value}
          onChange={handleChange(onChange, type)}
        >
          {displayOptions.map(o => {
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
          <Chevron className="svg-icon" />
        </span>
      </label>
    );
  }
}

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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  type: PropTypes.string,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onChange: PropTypes.func.isRequired,
  allLabel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Select;
