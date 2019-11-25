import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { selectIsSpellFavorited } from './selectors';
import { toggleFavorite } from 'actions';
import FavoriteButton from 'components/FavoriteButton';

const ConnectedFavoriteButton = ({ spellId }) => {
  const isActive = useSelector(selectIsSpellFavorited(spellId));
  const dispatch = useDispatch();
  const onClick = useCallback(
    e => {
      e.stopPropagation();
      dispatch(toggleFavorite(spellId));
    },
    [spellId, dispatch]
  );

  const label = isActive ? 'Remove from favorites' : 'Add to favorites';

  return <FavoriteButton {...{ isActive, onClick, label }} />;
};

ConnectedFavoriteButton.propTypes = {
  spellId: PropTypes.string,
};

export default ConnectedFavoriteButton;
