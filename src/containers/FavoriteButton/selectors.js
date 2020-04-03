import { createSelector } from 'reselect';

const selectFavoriteState = (state) => state.favorites;

export const selectIsSpellFavorited = (id) =>
  createSelector([selectFavoriteState], (favorites) => {
    return favorites.includes(id);
  });
