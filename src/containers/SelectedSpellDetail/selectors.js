import { createSelector } from 'reselect';

const selectSpellState = state => state.spells;
const selectCurrentSpellId = state => state.currentSpellId;

export const selectCurrentSpell = createSelector(
  [selectSpellState, selectCurrentSpellId],
  (spells, id) => spells.find(spell => spell.id === id)
);
