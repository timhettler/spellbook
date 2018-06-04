import { createSelector } from 'reselect';

const selectClassFiltersState = state => state.filters.classes;
const selectSubclassesState = state => state.subClasses;

export const selectSubClassFilter = createSelector(
  [selectClassFiltersState, selectSubclassesState],
  (selectedClass, subClasses) => {
    if (!selectedClass || !subClasses[selectedClass]) {
      return null;
    }

    return subClasses[selectedClass];
  }
);
