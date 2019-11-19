import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { viewSpell } from '../../actions';
import { selectCurrentSpell } from './selectors';
import SpellDetail from '../../components/SpellDetail';

const SelectedSpellDetail = props => {
  const spell = useSelector(selectCurrentSpell);
  const dispatch = useDispatch();
  const onClose = useCallback(value => dispatch(viewSpell(null)), [dispatch]);

  if (!spell.name) {
    return null;
  }

  return <SpellDetail {...{ onClose, ...spell }} />;
};

export default SelectedSpellDetail;
