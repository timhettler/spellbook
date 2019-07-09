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
} from './actionTypes';

import toKebabCase from './utilities/toKebabCase';

export function filters(state = {}, action) {
  switch (action.type) {
    case TOGGLE_FILTER:
      const newState = Object.assign({}, state);

      if (!!action.filter.value === false) {
        delete newState[action.filter.type];

        return newState;
      }

      if (!action.isInclusive) {
        newState[action.filter.type] = action.filter.value;

        return newState;
      }

      // Always create a new array
      if (newState[action.filter.type]) {
        newState[action.filter.type] = [...newState[action.filter.type]];
      } else {
        newState[action.filter.type] = [];
      }

      // Check if the value if in the filter...
      if (newState[action.filter.type].includes(action.filter.value)) {
        //...remove it if yes
        newState[action.filter.type] = newState[action.filter.type].filter(
          i => i !== action.filter.value
        );
      } else {
        // ...add it if no
        newState[action.filter.type].push(action.filter.value);
      }

      // if the resulting array is empty, delete it
      if (newState[action.filter.type].length === 0) {
        delete newState[action.filter.type];
      }

      return newState;
    case RESET_FILTERS:
      return {};
    default:
      return state;
  }
}

export function sorting(state = { field: 'name', reverse: false }, action) {
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

export function transformSpell(spell) {
  return {
    ...spell,
    id: toKebabCase(spell.name),
    cost:
      spell.material &&
      spell.material.search(/[\d\s][csegp]p(?![a-zA-Z])/g) > -1,
  };
}

export function spells(state = [], action) {
  switch (action.type) {
    case LOAD_SPELLS:
      return action.spells.map(transformSpell);
    default:
      return state;
  }
}

export function currentSpellId(state = '', action) {
  switch (action.type) {
    case VIEW_SPELL:
      return action.id;
    default:
      return state;
  }
}

export function classes(state = [], action) {
  switch (action.type) {
    case LOAD_CLASSES:
      return action.classes;
    default:
      return state;
  }
}

export function subClasses(state = {}, action) {
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

export function schools(state = [], action) {
  switch (action.type) {
    case LOAD_SCHOOLS:
      return action.schools;
    default:
      return state;
  }
}

export function favorites(state = [], action) {
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
