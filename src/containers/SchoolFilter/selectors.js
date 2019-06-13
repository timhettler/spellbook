import { createSelector } from 'reselect';

const selectFilterState = state => state.filters;

export function selectSchoolFilter(school) {
  return createSelector(
    [selectFilterState],
    filters => {
      return filters['school'] ? filters['school'].includes(school) : false;
    }
  );
}
