import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import './Toast.scss';

function handleClick(callback) {
  return e => {
    callback(e.target.value);
  };
}

const Toast = ({ label, active, onClick, ...rest }) => (
  <div
    className={classNames('toast', {
      'is-active': active,
      'is-clickable': onClick,
    })}
    onClick={onClick && handleClick(onClick)}
    {...rest}
  >
    <p dangerouslySetInnerHTML={{ __html: label }} />
  </div>
);

Toast.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Toast;
