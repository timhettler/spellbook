import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { viewSpell } from '../../actions';
import { selectSortedResults } from './selectors';
import SpellList from '../../components/SpellList';

const VisibleSpellList = () => {
  const spells = useSelector(selectSortedResults);
  const currentSpellId = useSelector(state => state.currentSpellId);
  const dispatch = useDispatch();
  const onSpellClick = useCallback(id => dispatch(viewSpell(id)), [dispatch]);

  return <SpellList {...{ spells, currentSpellId, onSpellClick }} />;
};

export default VisibleSpellList;
