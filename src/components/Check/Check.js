// @flow

import React from 'react';
import classNames from 'classnames/bind';

import VisuallyHidden from 'components/VisuallyHidden';

import './Check.scss';

const handleChange = (callback: Function, type: string): Function => {
  return (e: SyntheticInputEvent<HTMLInputElement>): void => {
    callback(e.target.checked, type);
  };
};

type InputProps = {
  checked: boolean,
  type: string,
  onChange: Function,
};

const CheckInput = ({ checked, onChange, type }: InputProps) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={handleChange(onChange, type)}
  />
);

type ContainerProps = InputProps & {
  icon: string,
  label: string,
};

const SmallCheckContainer = ({
  checked,
  onChange,
  type,
  icon,
  label,
}: ContainerProps) => (
  <>
    <CheckInput checked={checked} onChange={onChange} type={type} />
    <span aria-hidden={true}>{icon}</span>
    <span className="check__label">{label}</span>
  </>
);

const LargeCheckContainer = ({
  checked,
  onChange,
  type,
  icon,
  label,
}: ContainerProps) => (
  <>
    <VisuallyHidden>
      <CheckInput checked={checked} onChange={onChange} type={type} />
    </VisuallyHidden>
    <span title={label} className="big-check__icon" aria-hidden={true}>
      {icon}
    </span>
    <VisuallyHidden>{label}</VisuallyHidden>
  </>
);

type CheckType = ContainerProps & {
  checked: boolean,
  label: string,
  theme: 'small' | 'large',
};

const Check = ({
  checked,
  label,
  theme = 'small',
  icon,
  ...rest
}: CheckType) => {
  const InnerComponent =
    theme === 'small' ? SmallCheckContainer : LargeCheckContainer;
  return (
    <label
      className={classNames(theme === 'small' ? 'check' : 'big-check', {
        'is-checked': checked,
      })}
      aria-label={label}
    >
      <InnerComponent {...{ ...rest, checked, label, icon }} />
    </label>
  );
};

export default Check;
