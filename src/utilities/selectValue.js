import { createSelector } from 'reselect';

const selectFiltersState = state => state.filters;

export function selectValue(filter, type = 'string') {
  return createSelector([selectFiltersState], selectedFilters => {
    if (!selectedFilters || !selectedFilters[filter]) {
      return type === 'string' ? '' : false;
    }

    return type === 'string'
      ? selectedFilters[filter]
      : !!selectedFilters[filter];
  });
}
