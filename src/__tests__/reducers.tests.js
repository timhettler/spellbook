import * as reducers from '../reducers';
import * as types from '../actionTypes';

describe('filters reducer', () => {
  it('should return the initial state', () => {
    expect(reducers.filters(undefined, {})).toEqual({});
  });

  it('should handle adding with TOGGLE_FILTER', () => {
    expect(
      reducers.filters(
        {},
        {
          type: types.TOGGLE_FILTER,
          filter: {
            type: 'foo',
            value: 'bar',
          },
        }
      )
    ).toEqual({
      foo: 'bar',
    });
  });

  it('should handle removing with TOGGLE_FILTER', () => {
    expect(
      reducers.filters(
        {
          foo: 'bar',
        },
        {
          type: types.TOGGLE_FILTER,
          filter: {
            type: 'foo',
          },
        }
      )
    ).toEqual({});
  });

  it('should handle RESET_FILTERS', () => {
    expect(
      reducers.filters(
        {
          foo: true,
          bar: true,
        },
        {
          type: types.RESET_FILTERS,
        }
      )
    ).toEqual({});
  });
});

describe('sorting reducer', () => {
  it('should return the initial state', () => {
    expect(reducers.sorting(undefined, {})).toEqual({
      field: 'name',
      reverse: false,
    });
  });

  it('should handle SET_SORTING', () => {
    expect(
      reducers.sorting(
        {},
        {
          type: types.SET_SORTING,
          sorting: {
            field: 'foo',
          },
        }
      )
    ).toEqual({
      field: 'foo',
      reverse: false,
    });
  });

  it('should reverse sorting', () => {
    expect(
      reducers.sorting(
        {
          field: 'foo',
          reverse: false,
        },
        {
          type: types.SET_SORTING,
          sorting: {
            field: 'foo',
          },
        }
      )
    ).toEqual({
      field: 'foo',
      reverse: true,
    });
  });
});

describe('transform spell', () => {
  it('should create additional props', () => {
    expect(
      reducers.transformSpell({
        name: "Foo's Magnificent Mock",
        material: '1 bar',
      })
    ).toEqual({
      name: "Foo's Magnificent Mock",
      material: '1 bar',
      id: 'foos-magnificent-mock',
      cost: false,
    });
  });

  it('should set cost to true if value is mentioned', () => {
    expect(
      reducers.transformSpell({
        name: "Foo's Magnificent Mock",
        material: '1 bar worth 5 cp',
      })
    ).toEqual({
      name: "Foo's Magnificent Mock",
      material: '1 bar worth 5 cp',
      id: 'foos-magnificent-mock',
      cost: true,
    });

    expect(
      reducers.transformSpell({
        name: "Foo's Magnificent Mock",
        material: '1 bar worth 5 sp',
      })
    ).toEqual({
      name: "Foo's Magnificent Mock",
      material: '1 bar worth 5 sp',
      id: 'foos-magnificent-mock',
      cost: true,
    });

    expect(
      reducers.transformSpell({
        name: "Foo's Magnificent Mock",
        material: '1 bar worth 5 ep',
      })
    ).toEqual({
      name: "Foo's Magnificent Mock",
      material: '1 bar worth 5 ep',
      id: 'foos-magnificent-mock',
      cost: true,
    });

    expect(
      reducers.transformSpell({
        name: "Foo's Magnificent Mock",
        material: '1 bar worth 5 gp',
      })
    ).toEqual({
      name: "Foo's Magnificent Mock",
      material: '1 bar worth 5 gp',
      id: 'foos-magnificent-mock',
      cost: true,
    });

    expect(
      reducers.transformSpell({
        name: "Foo's Magnificent Mock",
        material: '1 bar worth 5 pp',
      })
    ).toEqual({
      name: "Foo's Magnificent Mock",
      material: '1 bar worth 5 pp',
      id: 'foos-magnificent-mock',
      cost: true,
    });
  });
});

describe('spells reducer', () => {
  it('should return the initial state', () => {
    expect(reducers.spells(undefined, {})).toEqual([]);
  });

  it('should handle LOAD_SPELLS', () => {
    // TODO this is brittle; we shouldn't be testing the output of transformSpell, but I can't get the spy to work
    expect(
      reducers.spells([], {
        type: types.LOAD_SPELLS,
        spells: [
          {
            name: "Foo's Magnificent Mock",
            material: '1 bar',
          },
        ],
      })
    ).toEqual([
      {
        name: "Foo's Magnificent Mock",
        material: '1 bar',
        id: 'foos-magnificent-mock',
        cost: false,
      },
    ]);
  });
});

describe('currentSpellId reducer', () => {
  it('should return the initial state', () => {
    expect(reducers.currentSpellId(undefined, {})).toEqual('');
  });

  it('should handle VIEW_SPELL', () => {
    expect(
      reducers.currentSpellId('', {
        type: types.VIEW_SPELL,
        id: 'foo',
      })
    ).toEqual('foo');
  });
});

describe('classes reducer', () => {
  it('should return the initial state', () => {
    expect(reducers.classes(undefined, {})).toEqual([]);
  });

  it('should handle LOAD_CLASSES', () => {
    expect(
      reducers.classes('', {
        type: types.LOAD_CLASSES,
        classes: ['foo'],
      })
    ).toEqual(['foo']);
  });
});

describe('subClasses reducer', () => {
  it('should return the initial state', () => {
    expect(reducers.subClasses(undefined, {})).toEqual({});
  });

  it('should handle ADD_SUBCLASS', () => {
    expect(
      reducers.subClasses(
        {},
        {
          type: types.ADD_SUBCLASS,
          payload: {
            parent: 'foo',
            type: 'bar',
            options: 'qux',
          },
        }
      )
    ).toEqual({
      foo: {
        type: 'bar',
        options: 'qux',
      },
    });
  });
});

describe('schools reducer', () => {
  it('should return the initial state', () => {
    expect(reducers.schools(undefined, {})).toEqual([]);
  });

  it('should handle LOAD_SCHOOLS', () => {
    expect(
      reducers.schools([], {
        type: types.LOAD_SCHOOLS,
        schools: ['foo'],
      })
    ).toEqual(['foo']);
  });
});

describe('favorites reducer', () => {
  it('should return the initial state', () => {
    expect(reducers.favorites(undefined, {})).toEqual([]);
  });

  it('should handle adding with TOGGLE_FAVORITE', () => {
    expect(
      reducers.favorites([], {
        type: types.TOGGLE_FAVORITE,
        id: 'foo',
      })
    ).toEqual(['foo']);
  });

  it('should handle removing with TOGGLE_FAVORITE', () => {
    expect(
      reducers.favorites(['foo'], {
        type: types.TOGGLE_FAVORITE,
        id: 'foo',
      })
    ).toEqual([]);
  });

  it('should handle RESET_FAVORITES', () => {
    expect(
      reducers.favorites(['foo'], {
        type: types.RESET_FAVORITES,
      })
    ).toEqual([]);
  });
});
