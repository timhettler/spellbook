import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectCurrentSpell } from './selectors';
import SpellDetail from 'components/SpellDetail';

const SelectedSpellDetail = () => {
  const spell = useSelector(selectCurrentSpell);
  const navigate = useNavigate();
  const onClose = useCallback(() => navigate('/'), [navigate]);

  if (!spell) {
    return null;
  }

  return <SpellDetail {...{ onClose, ...spell }} />;
};

export default SelectedSpellDetail;
