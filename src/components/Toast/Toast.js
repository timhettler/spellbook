// @flow

import React from 'react';
import classNames from 'classnames/bind';

import './Toast.scss';

function handleClick(callback) {
  return (e) => {
    callback(e.target.value);
  };
}

type Props = {
  label: string,
  active: boolean,
  onClick: Function,
};

const Toast = ({ label, active, onClick, ...rest }: Props) => {
  if (!label) {
    return null;
  }

  const Element = !!onClick ? 'button' : 'div';

  return (
    <Element
      {...rest}
      className={classNames('toast')}
      onClick={!!onClick && handleClick(onClick)}
      aria-live="polite"
      disabled={!active}
    >
      {label}
    </Element>
  );
};

export default Toast;
