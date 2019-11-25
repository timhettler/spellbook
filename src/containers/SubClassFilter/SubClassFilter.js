import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleFilter } from 'actions';
import { selectSubClassFilter } from './selectors';
import { selectStringValue } from 'utilities/selectValue';
import Select from 'components/Select';

const SubClassFilter = () => {
  const [selectProps, setSelectProps] = useState({});
  const filter = useSelector(selectSubClassFilter);
  const value = useSelector(selectStringValue(filter.type));
  const dispatch = useDispatch();
  const onChange = useCallback(
    (value, type) => dispatch(toggleFilter({ type, value })),
    [dispatch]
  );

  useEffect(() => {
    if (!filter) {
      setSelectProps({});
    } else {
      setSelectProps({
        type: filter.type,
        options: filter.options,
        label: filter.label,
        allLabel: filter.allLabel,
      });
    }
  }, [filter]);

  if (!selectProps.options) {
    return null;
  }

  return <Select {...{ value, onChange, ...selectProps }} />;
};

export default SubClassFilter;
