import { createSelector } from 'reselect';
import firstBy from 'thenby';

const selectSpellState = state => state.spells;
const selectFiltersState = state => state.filters;
const selectSortingState = state => state.sorting;

export const selectSortedResults = createSelector(
  [selectSpellState, selectFiltersState, selectSortingState],
  (spells, filters, sorting) => {
    let newSpells = spells.slice();
    let direction = sorting.reverse === true ? -1 : null;

    Object.keys(filters).forEach(
      prop =>
        (newSpells = newSpells.filter(spell => {
          if (spell[prop] === undefined) {
            return false;
          }

          switch (typeof spell[prop]) {
            case 'string':
              return spell[prop]
                .toLowerCase()
                .includes(filters[prop].toLowerCase());
            case 'object':
              return spell[prop].includes(filters[prop]);
            default:
              return spell[prop] === filters[prop];
          }
        }))
    );

    if (sorting.field === 'name') {
      return newSpells.sort(
        firstBy('name', { ignoreCase: true, direction: direction })
      );
    }

    if (sorting.field === 'level') {
      return newSpells.sort(
        firstBy('level', direction).thenBy('name', { ignoreCase: true })
      );
    }
  }
);
