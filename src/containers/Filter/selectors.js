import { createSelector } from 'reselect';

const selectClassesState = (state) => state.classes;
const selectSchoolsState = (state) => state.schools;
const selectCastingTimeState = (state) => state.castingTimes;

export const selectSortedFilter = (type) =>
  createSelector(
    [selectClassesState, selectSchoolsState, selectCastingTimeState],
    (classes, schools, castingTimes) => {
      const filters = {
        classes: classes,
        school: schools,
        castingTimes: castingTimes,
      };
      return filters[type].sort();
    }
  );
