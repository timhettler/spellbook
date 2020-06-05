import { createSelector } from 'reselect';

const selectClassFiltersState = (state) => state.filters.classes;
const selectSubclassesState = (state) => state.subClasses;

function getSubClassLabels(selectedClass) {
  let subclass = '';

  switch (selectedClass) {
    case 'Ranger':
      subclass = 'Archetype';
      break;
    case 'Druid':
      subclass = 'Circle';
      break;
    case 'Cleric':
      subclass = 'Domain';
      break;
    case 'Paladin':
      subclass = 'Oath';
      break;
    case 'Warlock':
      subclass = 'Patron';
      break;
    default:
      break;
  }

  return {
    label: `Add ${subclass} Spells`,
    allLabel: `No ${subclass}`,
  };
}

export const selectSubClassFilter = createSelector(
  [selectClassFiltersState, selectSubclassesState],
  (selectedClass, subClasses) => {
    const firstClass = selectedClass;

    if (!subClasses[firstClass]) {
      return null;
    }

    return {
      ...subClasses[firstClass],
      ...getSubClassLabels(firstClass),
    };
  }
);
