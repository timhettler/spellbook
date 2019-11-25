import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleFilter } from 'actions';
import { selectSortedFilter } from './selectors';
import { selectStringValue } from 'utilities/selectValue';
import Select from 'components/Select';

const Filter = props => {
  const value = useSelector(state => selectStringValue(props.type)(state));
  const options = useSelector(state => selectSortedFilter(props.type)(state));
  const dispatch = useDispatch();
  const handleChange = useCallback(
    value => dispatch(toggleFilter({ type: props.type, value: value })),
    [dispatch, props.type]
  );

  if (!options) {
    return null;
  }

  return (
    <Select
      value={value}
      onChange={handleChange}
      options={options}
      {...props}
    />
  );
};

export default Filter;
