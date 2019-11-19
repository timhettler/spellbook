import { createSelector } from 'reselect';

const selectFilterState = state => state.filters.school;

export function selectSchoolFilter(school) {
  return createSelector([selectFilterState], filters => {
    return filters ? filters.includes(school) : false;
  });
}
