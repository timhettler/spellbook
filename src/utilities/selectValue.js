import { createSelector } from 'reselect';

const selectFiltersState = state => state.filters;

export function selectValue(filter) {
  return createSelector(
    [selectFiltersState],
    selectedFilters => {
      if (!selectedFilters || !selectedFilters[filter]) {
        return '';
      }

      return selectedFilters[filter][0];
    }
  );
}

export function selectBoolValue(filter) {
  return createSelector(
    [selectFiltersState],
    selectedFilters => {
      return selectedFilters ? !!selectedFilters[filter] : false;
    }
  );
}
