import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import VisuallyHidden from '../VisuallyHidden';

import './Check.scss';

function handleChange(callback, type) {
  return e => {
    callback(e.target.checked, type);
  };
}

const Check = ({
  icon,
  label,
  checked,
  type,
  onChange,
  checkType,
  ...rest
}) => {
  const CheckInput = () => (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange(onChange, type)}
    />
  );
  return (
    <label
      className={classNames(checkType === 'small' ? 'check' : 'big-check', {
        'is-checked': checked,
      })}
      aria-label={label}
      {...rest}
    >
      {checkType === 'small' && (
        <Fragment>
          <CheckInput />
          <span role="presentation">{icon}</span>
          <span className="check__label">{label}</span>
        </Fragment>
      )}
      {checkType === 'large' && (
        <Fragment>
          <VisuallyHidden>
            <CheckInput />
          </VisuallyHidden>
          <span title={label} className="big-check__icon" role="presentation">
            {icon}
          </span>
          <VisuallyHidden>{label}</VisuallyHidden>
        </Fragment>
      )}
    </label>
  );
};

Check.defaultProps = {
  checkType: 'small',
};

Check.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checkType: PropTypes.oneOf(['small', 'large']),
};

export default Check;
