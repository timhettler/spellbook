import React from 'react';
import classNames from 'classnames/bind';

import VisuallyHidden from 'components/VisuallyHidden';

import './Check.scss';

const handleChange = (callback, type) => {
  return (e) => {
    callback(e.target.checked, type);
  };
};

const CheckInput = ({ checked, onChange, type }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={handleChange(onChange, type)}
  />
);

const SmallCheckContainer = ({ checked, onChange, type, icon, label }) => (
  <>
    <CheckInput checked={checked} onChange={onChange} type={type} />
    <span aria-hidden={true}>{icon}</span>
    <span className="check__label">{label}</span>
  </>
);

const LargeCheckContainer = ({ checked, onChange, type, icon, label }) => (
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

const Check = ({ checked, label, theme = 'small', icon, ...rest }) => {
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
