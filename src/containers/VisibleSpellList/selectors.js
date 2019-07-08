import { createSelector } from 'reselect';
import firstBy from 'thenby';

import bothContain from '../../utilities/bothContain';

import { SUBCLASSES } from '../../data';

const selectSpellState = state => state.spells;
const selectFiltersState = state => state.filters;
const selectSortingState = state => state.sorting;
const selectFavoritesState = state => state.favorites;

function checkForSubClassFilter(filters, subClassList) {
  return subClassList.some(subClass => {
    return !!filters[subClass];
  });
}

function getSpellsSubClasses(spell, subClassList) {
  return subClassList.filter(subClass => !!spell[subClass]);
}

export const selectSortedResults = createSelector(
  [
    selectSpellState,
    selectFiltersState,
    selectSortingState,
    selectFavoritesState,
  ],
  (spells, filters, sorting, favorites) => {
    let filtersCopy = { ...filters };
    let newSpells = spells.slice();
    let direction = sorting.reverse === true ? -1 : null;
    const hasSubClassFilter = checkForSubClassFilter(filtersCopy, SUBCLASSES);

    // First filter by class & subclass (if any are selected), since they're inclusive
    if (!!filtersCopy.classes || hasSubClassFilter) {
      const classFilters = filtersCopy.classes;
      let subClassFilters = undefined;
      // Remove class and subclasses from filters so that they aren't checked in the next phase
      delete filtersCopy.classes;
      Object.keys(filtersCopy).forEach(prop => {
        if (SUBCLASSES.includes(prop)) {
          subClassFilters = filtersCopy[prop];
          delete filtersCopy[prop];
        }
      });

      newSpells = newSpells.filter(spell => {
        // If the spell is in the selected class list, add it to the list
        if (bothContain(spell.classes, classFilters)) {
          return true;
          // If we're filtering by a subclass, continue
        } else if (hasSubClassFilter) {
          // Get all subclasses that the spell belongs to
          const spellsSubClasses = getSpellsSubClasses(spell, SUBCLASSES);
          // If it's zero, return early
          if (!spellsSubClasses.length) {
            return false;
          }
          // Go through each subclass and check if the subclass matches the filter
          return spellsSubClasses.reduce(
            (accumulator, subclass) =>
              bothContain(spell[subclass], subClassFilters) || accumulator,
            false
          );
        }

        return false;
      });
    }

    // Next, do exclusive filtering
    if (Object.keys(filtersCopy).length) {
      Object.keys(filtersCopy).forEach(prop => {
        // The favorites filter checks if the spell id is in the favorites list
        if (prop === 'favorites') {
          return (newSpells = newSpells.filter(spell => {
            return favorites.includes(spell.id);
          }));
        } else {
          // All other filters check against props in the spell object
          return (newSpells = newSpells.filter(spell => {
            if (spell[prop] === undefined) {
              return false;
            }

            switch (typeof spell[prop]) {
              case 'string':
                return spell[prop].includes(filtersCopy[prop]);
              case 'object': // (Really an array)
                return bothContain(spell[prop], filtersCopy[prop]);
              default:
                return spell[prop] === filtersCopy[prop];
            }
          }));
        }
      });
    }

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
