import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import cx from 'classnames';

import { setSorting } from 'actions';
import Button from 'components/Button';

import styles from 'components/Button/Button.module.scss';

const SortingButton = ({ field, ...rest }) => {
  const dispatch = useDispatch();
  const onClick = useCallback(
    () => dispatch(setSorting({ field })),
    [dispatch, field]
  );
  return (
    <Button
      className={cx(styles['sorting-button'])}
      {...{ onClick, ...rest }}
    />
  );
};

SortingButton.propTypes = {
  field: PropTypes.string.isRequired,
};

export default SortingButton;
