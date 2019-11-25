import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import VisuallyHidden from 'components/VisuallyHidden';

import './Check.scss';

function handleChange(callback, type) {
  return e => {
    callback(e.target.checked, type);
  };
}

const InputPropTypes = {
  checked: PropTypes.bool.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const ContainerPropTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
};

const CheckInput = ({ checked, onChange, type }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={handleChange(onChange, type)}
  />
);

CheckInput.propTypes = InputPropTypes;

const SmallCheckInput = ({ checked, onChange, type, icon, label }) => (
  <>
    <CheckInput checked={checked} onChange={onChange} type={type} />
    <span aria-hidden={true}>{icon}</span>
    <span className="check__label">{label}</span>
  </>
);

SmallCheckInput.propTypes = ContainerPropTypes;

const LargeCheckInput = ({ checked, onChange, type, icon, label }) => (
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

SmallCheckInput.propTypes = ContainerPropTypes;

const Check = ({ checked, label, checkType, ...rest }) => {
  const CheckComponent =
    checkType === 'small' ? SmallCheckInput : LargeCheckInput;
  return (
    <label
      className={classNames(checkType === 'small' ? 'check' : 'big-check', {
        'is-checked': checked,
      })}
      aria-label={label}
    >
      <CheckComponent {...{ ...rest, label, checked }} />
    </label>
  );
};

Check.defaultProps = {
  checkType: 'small',
};

Check.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  checkType: PropTypes.oneOf(['small', 'large']),
};

export default Check;
