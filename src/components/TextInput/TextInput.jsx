import React from 'react';
import classNames from 'classnames/bind';

import VisuallyHidden from 'components/VisuallyHidden';
import './TextInput.scss';

function handleChange(callback) {
  return (e) => {
    callback(e.target.value);
  };
}

const TextInput = React.forwardRef(
  ({ value, className, onChange, label, ...rest }, ref) => {
    return (
      <label className={classNames('text-label')}>
        <VisuallyHidden>{label}</VisuallyHidden>
        <input
          {...rest}
          className={classNames('text-input', className)}
          type="text"
          value={value}
          onChange={handleChange(onChange)}
          autoComplete="off"
          ref={ref}
        />
      </label>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
