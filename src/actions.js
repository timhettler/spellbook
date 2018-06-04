/*
 * action types
 */

export const LOAD_SPELLS = 'LOAD_SPELLS';
export const LOAD_CLASSES = 'LOAD_CLASSES';
export const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
export const ADD_SUBCLASS = 'ADD_SUBCLASS';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const RESET_FILTERS = 'RESET_FILTERS';
export const SET_SORTING = 'SET_SORTING';
export const VIEW_SPELL = 'VIEW_SPELL';

export function loadSpells(spells) {
  return { type: LOAD_SPELLS, spells };
}

export function loadClasses(classes) {
  return { type: LOAD_CLASSES, classes };
}

export function loadSchools(schools) {
  return { type: LOAD_SCHOOLS, schools };
}

export function addSubclass(parent, type, options) {
  return { type: ADD_SUBCLASS, payload: { parent, type, options } };
}

export function toggleFilter(filter) {
  return { type: TOGGLE_FILTER, filter };
}

export function resetFilters() {
  return { type: RESET_FILTERS };
}

export function setSorting(sorting) {
  return { type: SET_SORTING, sorting };
}

export function viewSpell(id) {
  return { type: VIEW_SPELL, id };
}
