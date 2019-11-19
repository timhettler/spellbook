import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import uuidv4 from '../../utilities/uuidv4';

import VisuallyHidden from '../VisuallyHidden';
import './TextInput.scss';

function handleChange(callback) {
  return e => {
    callback(e.target.value);
  };
}

const TextInput = React.forwardRef(
  ({ value, className, onChange, label, list = [], ...rest }, ref) => {
    const [datalistId] = useState(uuidv4());

    return (
      <label className={classNames('text-label')}>
        <VisuallyHidden>{label}</VisuallyHidden>
        <input
          className={classNames('text-input', className)}
          type="text"
          value={value}
          onChange={handleChange(onChange)}
          autoComplete="off"
          list={list.length ? datalistId : null}
          ref={ref}
          {...rest}
        />
        {list.length ? (
          <datalist id={datalistId}>
            {list.map(item => (
              <option key={item} value={item} />
            ))}
          </datalist>
        ) : null}
      </label>
    );
  }
);

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  list: PropTypes.array,
};

export default TextInput;
