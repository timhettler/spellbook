import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleFilter } from 'actions';
import { selectBoolValue } from 'utilities/selectValue';
import Check from 'components/Check';

const BinaryFilter = (props) => {
  const checked = useSelector(selectBoolValue(props.type));
  const dispatch = useDispatch();
  const onChange = useCallback(
    (value) => dispatch(toggleFilter({ type: props.type, value: value })),
    [props.type, dispatch]
  );

  return <Check {...{ checked, onChange, ...props }} />;
};

export default BinaryFilter;
