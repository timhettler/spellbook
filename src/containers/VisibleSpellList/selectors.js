import { createSelector } from 'reselect';
import firstBy from 'thenby';

import bothContain from 'utilities/bothContain';

import { SUBCLASSES } from 'data';

const selectSpellState = (state) => state.spells;
const selectFiltersState = (state) => state.filters;
const selectSortingState = (state) => state.sorting;
const selectFavoritesState = (state) => state.favorites;
const selectHistoryState = (state) => state.history;

function checkForSubClassFilter(filters, subClassList) {
  return subClassList.some((subClass) => {
    return !!filters[subClass];
  });
}

function getSpellsSubClasses(spell, subClassList) {
  return subClassList.filter((subClass) => !!spell[subClass]);
}

export const selectFilteredSpells = createSelector(
  [
    selectSpellState,
    selectFiltersState,
    selectFavoritesState,
    selectHistoryState,
  ],
  (spells, filters, favorites, history) => {
    let filtersCopy = { ...filters };
    let newSpells = spells.slice();
    const hasSubClassFilter = checkForSubClassFilter(filtersCopy, SUBCLASSES);

    // First filter by class & subclass (if any are selected), since they're inclusive
    if (!!filtersCopy.classes || hasSubClassFilter) {
      const classFilters = filtersCopy.classes;
      let subClassFilters = undefined;
      // Remove class and subclasses from filters so that they aren't checked in the next phase
      delete filtersCopy.classes;
      Object.keys(filtersCopy).forEach((prop) => {
        if (SUBCLASSES.includes(prop)) {
          subClassFilters = filtersCopy[prop];
          delete filtersCopy[prop];
        }
      });

      newSpells = newSpells.filter((spell) => {
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
          return spellsSubClasses.reduce((accumulator, subclass) => {
            if (bothContain(spell[subclass], subClassFilters)) {
              spell.isSubClassSpell = true;
              return true;
            }
            return accumulator;
          }, false);
        }

        return false;
      });
    }

    // Next, do exclusive filtering
    if (Object.keys(filtersCopy).length) {
      Object.keys(filtersCopy).forEach((prop) => {
        // The favorites filter checks if the spell id is in the favorites list
        if (prop === 'favorites') {
          return (newSpells = newSpells.filter((spell) => {
            return favorites.includes(spell.id);
          }));
          // The histroy filter checks if the spell id has been recently viewed
        } else if (prop === 'history') {
          return (newSpells = newSpells.filter((spell) => {
            return history.includes(spell.id);
          }));
          // The name filter allows for partial matches
        } else if (prop === 'name') {
          return (newSpells = newSpells.filter((spell) => {
            return spell[prop]
              .toLowerCase()
              .includes(filtersCopy[prop].toLowerCase());
          }));
        } else {
          // All other filters check against props in the spell object
          return (newSpells = newSpells.filter((spell) => {
            if (prop === 'castingTimes') {
              // Long matches casting times that cannot be used in combat (not reaction, bonus action, or action)
              if (filtersCopy[prop] === 'Long') {
                return spell['casting_time'].match(/^((?!action).)*$/gi);
              }

              return spell['casting_time'].includes(
                filtersCopy[prop].toLowerCase()
              );
            }

            if (spell[prop] === undefined) {
              return false;
            }

            if (typeof filtersCopy[prop] === 'boolean') {
              return !!spell[prop];
            }

            switch (typeof spell[prop]) {
              case 'string':
                return filtersCopy[prop].includes(spell[prop]);
              case 'object': // (Really an array)
                return bothContain(spell[prop], filtersCopy[prop]);
              default:
                return spell[prop] === filtersCopy[prop];
            }
          }));
        }
      });
    }

    return newSpells;
  }
);

export const selectSortedResults = createSelector(
  [selectFilteredSpells, selectSortingState],
  (spells, sorting) => {
    const direction = sorting.reverse === true ? -1 : null;
    const sortedSpells = [...spells];

    if (sorting.field === 'name') {
      return sortedSpells.sort(
        firstBy('name', { ignoreCase: true, direction: direction })
      );
    }

    if (sorting.field === 'level') {
      return sortedSpells.sort(
        firstBy('level', { direction }).thenBy('name', { ignoreCase: true })
      );
    }
  }
);
