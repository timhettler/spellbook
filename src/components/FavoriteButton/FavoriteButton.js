// @flow

import React from 'react';
import classNames from 'classnames/bind';

import Button from 'components/Button';
import PropIcon from 'components/PropIcon';

import './FavoriteButton.scss';

type Props = {
  isActive: boolean,
  onClick: Function,
  label: string,
};

const FavoriteButton = ({ isActive, onClick, label }: Props) => (
  <Button
    className={classNames('favorite-button', { 'is-active': isActive })}
    tabIndex="-1"
    onClick={onClick}
    aria-label={label}
  >
    <PropIcon type="favorites" hideLabel={true} />
  </Button>
);

export default FavoriteButton;
