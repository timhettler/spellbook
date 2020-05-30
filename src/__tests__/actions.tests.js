import * as actions from 'actions';
import * as types from 'actionTypes';

describe('actions', () => {
  it('should create an action to load spells', () => {
    const spells = { foo: 'foo', bar: 'bar' };
    const expectedAction = {
      type: types.LOAD_SPELLS,
      spells,
    };
    expect(actions.loadSpells(spells)).toEqual(expectedAction);
  });

  it('should create an action to load casting times', () => {
    const casting_times = { foo: 'foo', bar: 'bar' };
    const expectedAction = {
      type: types.LOAD_CASTING_TIMES,
      castingTimes: casting_times,
    };
    expect(actions.loadCastingTimes(casting_times)).toEqual(expectedAction);
  });

  it('should create an action to load classes', () => {
    const classes = { foo: 'foo', bar: 'bar' };
    const expectedAction = {
      type: types.LOAD_CLASSES,
      classes,
    };
    expect(actions.loadClasses(classes)).toEqual(expectedAction);
  });

  it('should create an action to load schools', () => {
    const schools = { foo: 'foo', bar: 'bar' };
    const expectedAction = {
      type: types.LOAD_SCHOOLS,
      schools,
    };
    expect(actions.loadSchools(schools)).toEqual(expectedAction);
  });

  it('should create an action to add a subclass', () => {
    const payload = {
      parent: 'foo',
      type: 'bar',
      options: 'qux',
    };
    const expectedAction = {
      type: types.ADD_SUBCLASS,
      payload,
    };
    expect(
      actions.addSubclass(payload.parent, payload.type, payload.options)
    ).toEqual(expectedAction);
  });

  it('should create an action to toggle a filter', () => {
    const filter = { foo: true };
    const expectedAction = {
      type: types.TOGGLE_FILTER,
      filter,
    };
    expect(actions.toggleFilter(filter)).toEqual(expectedAction);
  });

  it('should create an action to reset filters', () => {
    const expectedAction = {
      type: types.RESET_FILTERS,
    };
    expect(actions.resetFilters()).toEqual(expectedAction);
  });

  it('should create an action to set sorting', () => {
    const sorting = { foo: true };
    const expectedAction = {
      type: types.SET_SORTING,
      sorting,
    };
    expect(actions.setSorting(sorting)).toEqual(expectedAction);
  });

  it('should create an action to view a spell', () => {
    const id = 1;
    const expectedAction = {
      type: types.VIEW_SPELL,
      id,
    };
    expect(actions.viewSpell(id)).toEqual(expectedAction);
  });

  it('should create an action to toggle a spell favorite', () => {
    const id = 1;
    const expectedAction = {
      type: types.TOGGLE_FAVORITE,
      id,
    };
    expect(actions.toggleFavorite(id)).toEqual(expectedAction);
  });

  it('should create an action to reset spell favorites', () => {
    const expectedAction = {
      type: types.RESET_FAVORITES,
    };
    expect(actions.resetFavorites()).toEqual(expectedAction);
  });

  it('should create an action to set banner', () => {
    const banner = 'foo';
    const expectedAction = {
      type: types.SET_BANNER,
      banner,
    };
    expect(actions.setBanner(banner)).toEqual(expectedAction);
  });
});
