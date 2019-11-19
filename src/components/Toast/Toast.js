import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import './Toast.scss';

function handleClick(callback) {
  return e => {
    callback(e.target.value);
  };
}

const Toast = ({ label, active, onClick, ...rest }) => {
  if (!label) {
    return null;
  }
  return (
    <button
      className={classNames('toast', {
        'is-clickable': onClick,
      })}
      onClick={onClick && handleClick(onClick)}
      aria-live="polite"
      disabled={!active}
      {...rest}
    >
      {label}
    </button>
  );
};

Toast.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Toast;
