import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleFilter, viewSpell } from 'actions';
import { selectSortedResults } from 'containers/VisibleSpellList/selectors';
import { selectStringValue } from 'utilities/selectValue';
import SpellSearch from 'components/SpellSearch';

const SpellFilter = (props) => {
  const type = 'name';
  const value = useSelector(selectStringValue(type));
  const spells = useSelector(selectSortedResults);
  const dispatch = useDispatch();
  const onChange = useCallback(
    (value) => dispatch(toggleFilter({ type, value })),
    [dispatch, type]
  );
  const onSubmit = useCallback((id) => dispatch(viewSpell(id)), [dispatch]);

  const handleSubmit = (e) => {
    if (spells.length) {
      onSubmit(spells[0].id);
    }
  };

  return (
    <SpellSearch onSubmit={handleSubmit} {...{ value, onChange, ...props }} />
  );
};

export default SpellFilter;
