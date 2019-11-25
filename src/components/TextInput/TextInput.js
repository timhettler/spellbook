// @flow

import React from 'react';
import classNames from 'classnames/bind';
import { classNameType } from 'utilities/types';

import VisuallyHidden from 'components/VisuallyHidden';
import './TextInput.scss';

function handleChange(callback: Function): Function {
  return (e: SyntheticInputEvent<HTMLInputElement>): void => {
    callback(e.target.value);
  };
}

type Props = {
  value: string,
  className: classNameType,
  onChange: Function,
  label: string,
};

const TextInput = React.forwardRef<Props, HTMLInputElement>(
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
