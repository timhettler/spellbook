import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { setSorting } from '../../actions';
import Button from '../../components/Button';

const SortingButton = ({ field, ...rest }) => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => dispatch(setSorting({ field })), [
    dispatch,
    field,
  ]);
  return <Button className="sorting-button" {...{ onClick, ...rest }} />;
};

SortingButton.propTypes = {
  field: PropTypes.string.isRequired,
};

export default SortingButton;
