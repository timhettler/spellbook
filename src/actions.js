import * as types from './actionTypes.js';

export function loadSpells(spells) {
  return { type: types.LOAD_SPELLS, spells };
}

export function loadCastingTimes(castingTimes) {
  return { type: types.LOAD_CASTING_TIMES, castingTimes };
}

export function loadClasses(classes) {
  return { type: types.LOAD_CLASSES, classes };
}

export function loadSchools(schools) {
  return { type: types.LOAD_SCHOOLS, schools };
}

export function addSubclass(parent, type, options) {
  return { type: types.ADD_SUBCLASS, payload: { parent, type, options } };
}

export function toggleFilter(filter, isInclusive) {
  return { type: types.TOGGLE_FILTER, filter, isInclusive };
}

export function resetFilters() {
  return { type: types.RESET_FILTERS };
}

export function setSorting(sorting) {
  return { type: types.SET_SORTING, sorting };
}

export function viewSpell(id) {
  return { type: types.VIEW_SPELL, id };
}

export function toggleFavorite(id) {
  return { type: types.TOGGLE_FAVORITE, id };
}

export function resetFavorites() {
  return { type: types.RESET_FAVORITES };
}

export function setBanner(banner) {
  return { type: types.SET_BANNER, banner };
}
