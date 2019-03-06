import { combineReducers } from 'redux';
import {
  LOAD_SPELLS,
  LOAD_CLASSES,
  LOAD_SCHOOLS,
  ADD_SUBCLASS,
  TOGGLE_FILTER,
  RESET_FILTERS,
  SET_SORTING,
  VIEW_SPELL,
  TOGGLE_FAVORITE,
  RESET_FAVORITES,
} from './actions';

import toKebabCase from './utilities/toKebabCase';

function filters(state = {}, action) {
  switch (action.type) {
    case TOGGLE_FILTER:
      const newState = Object.assign({}, state);

      if (!action.filter.value) {
        delete newState[action.filter.type];
      } else {
        newState[action.filter.type] = action.filter.value;
      }

      return newState;
    case RESET_FILTERS:
      return {};
    default:
      return state;
  }
}

function sorting(state = { field: 'name', reverse: false }, action) {
  switch (action.type) {
    case SET_SORTING:
      return {
        field: action.sorting.field,
        reverse: state.field === action.sorting.field ? !state.reverse : false,
      };
    default:
      return state;
  }
}

function transformSpell(spell, index) {
  return {
    ...spell,
    id: toKebabCase(spell.name),
    cost:
      spell.material &&
      spell.material.search(/[\d\s][csegp]p(?![a-zA-Z])/g) > -1,
  };
}

function spells(state = [], action) {
  switch (action.type) {
    case LOAD_SPELLS:
      return action.spells.map(transformSpell);
    default:
      return state;
  }
}

function currentSpellId(state = '', action) {
  switch (action.type) {
    case VIEW_SPELL:
      return action.id;
    default:
      return state;
  }
}

function classes(state = [], action) {
  switch (action.type) {
    case LOAD_CLASSES:
      return action.classes;
    default:
      return state;
  }
}

function subClasses(state = {}, action) {
  switch (action.type) {
    case ADD_SUBCLASS:
      return {
        ...state,
        [action.payload.parent]: {
          type: action.payload.type,
          options: action.payload.options,
        },
      };
    default:
      return state;
  }
}

function schools(state = [], action) {
  switch (action.type) {
    case LOAD_SCHOOLS:
      return action.schools;
    default:
      return state;
  }
}

function favorites(state = [], action) {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      if (state.includes(action.id)) {
        const idIndex = state.indexOf(action.id);
        return state.slice(0, idIndex).concat(state.slice(idIndex + 1));
      } else {
        return state.concat(action.id);
      }
    case RESET_FAVORITES:
      return [];
    default:
      return state;
  }
}

const spellbookApp = combineReducers({
  filters,
  sorting,
  spells,
  currentSpellId,
  classes,
  subClasses,
  schools,
  favorites,
});

export default spellbookApp;
