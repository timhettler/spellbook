import { createSelector } from 'reselect';

const selectClassFiltersState = state => state.filters.classes;
const selectSubclassesState = state => state.subClasses;

function getSubClassLabel(selectedClass) {
  let subclass = '';

  switch (selectedClass) {
    case 'Druid':
      subclass = 'Circles';
      break;
    case 'Cleric':
      subclass = 'Domains';
      break;
    case 'Paladin':
      subclass = 'Oaths';
      break;
    case 'Warlock':
      subclass = 'Patrons';
      break;
    default:
      break;
  }

  return `All ${subclass}`;
}

export const selectSubClassFilter = createSelector(
  [selectClassFiltersState, selectSubclassesState],
  (selectedClass, subClasses) => {
    if (!selectedClass || !subClasses[selectedClass]) {
      return null;
    }

    return Object.assign(subClasses[selectedClass], {
      label: getSubClassLabel(selectedClass),
    });
  }
);
