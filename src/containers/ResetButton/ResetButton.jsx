import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { resetFilters } from 'actions';
import Button from 'components/Button';

const ResetButton = (props) => {
  const dispatch = useDispatch();
  const onClick = useCallback((value) => dispatch(resetFilters()), [dispatch]);

  return <Button {...{ onClick, ...props }} />;
};

export default ResetButton;
