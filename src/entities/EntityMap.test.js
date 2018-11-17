import EntityMap from './EntityMap';

describe('create map from array of entities', () => {
  it('creats empty map from empty array', () => {
    const map = EntityMap.fromArray([]);
    expect(map).toEqual({
      byKey: {},
      keys: []
    });
  });

  it('creates map from given array', () => {
    const map = EntityMap.fromArray([
      { id: 'foo', name: 'Foo' },
      { id: 'bar', name: 'Bar' }
    ]);
    expect(map).toEqual({
      byKey: {
        foo: { id: 'foo', name: 'Foo' },
        bar: { id: 'bar', name: 'Bar' }
      },
      keys: ['foo', 'bar']
    });
  });

  it('skips duplicates from given array', () => {
    const map = EntityMap.fromArray([
      { id: 'foo', name: 'Foo' },
      { id: 'bar', name: 'Bar' },
      { id: 'bar', name: 'BarDup' }
    ]);
    expect(map).toEqual({
      byKey: {
        foo: { id: 'foo', name: 'Foo' },
        bar: { id: 'bar', name: 'BarDup' }
      },
      keys: ['foo', 'bar']
    });
  });
});

describe('merge array of entities into existing map', () => {
  const map = {
    byKey: {
      foo: { id: 'foo', name: 'Foo' },
      bar: { id: 'bar', name: 'Bar' }
    },
    keys: ['foo', 'bar']
  };
  const original = { ...map };

  it('merges new entity', () => {
    const mapWithBaz = EntityMap.merge(map, [{ id: 'baz', name: 'Baz' }]);
    expect(map === mapWithBaz).toBeFalsy();
    expect(map).toEqual(original);
    expect(mapWithBaz).toEqual({
      byKey: {
        foo: { id: 'foo', name: 'Foo' },
        bar: { id: 'bar', name: 'Bar' },
        baz: { id: 'baz', name: 'Baz' }
      },
      keys: ['baz', 'foo', 'bar']
    });
  });

  it('merges and replaces entities', () => {
    const mapWithBax = EntityMap.merge(map, [
      { id: 'bax', name: 'Bax' },
      { id: 'foo', name: 'Foo with bax' }
    ]);
    expect(map === mapWithBax).toBeFalsy();
    expect(map).toEqual(original);
    expect(mapWithBax).toEqual({
      byKey: {
        foo: { id: 'foo', name: 'Foo with bax' },
        bar: { id: 'bar', name: 'Bar' },
        bax: { id: 'bax', name: 'Bax' }
      },
      keys: ['bax', 'foo', 'bar']
    });
  });
});

describe('set entity in map', () => {
  const map = {
    byKey: {
      foo: { id: 'foo', name: 'Foo' },
      bar: { id: 'bar', name: 'Bar' }
    },
    keys: ['foo', 'bar']
  };
  const original = { ...map };

  it('sets new entity', () => {
    const mapWithBaz = EntityMap.set(map, { id: 'baz', name: 'Baz' });
    expect(map === mapWithBaz).toBeFalsy();
    expect(map).toEqual(original);
    expect(mapWithBaz).toEqual({
      byKey: {
        foo: { id: 'foo', name: 'Foo' },
        bar: { id: 'bar', name: 'Bar' },
        baz: { id: 'baz', name: 'Baz' }
      },
      keys: ['baz', 'foo', 'bar']
    });
  });

  it('updates existing value with given key', () => {
    const mapUpdated = EntityMap.set(map, { id: 'bar', name: 'Bar Updated' });
    expect(map === mapUpdated).toBeFalsy();
    expect(map).toEqual(original);
    expect(mapUpdated).toEqual({
      byKey: {
        foo: { id: 'foo', name: 'Foo' },
        bar: { id: 'bar', name: 'Bar Updated' }
      },
      keys: ['foo', 'bar']
    });
  });
});

describe('remove value by key', () => {
  const map = {
    byKey: {
      foo: { id: 'foo', name: 'Foo' },
      bar: { id: 'bar', name: 'Bar' }
    },
    keys: ['foo', 'bar']
  };
  const original = { ...map };

  it('removes original map if key not found', () => {
    const removedMap = EntityMap.remove(map, 'baz');
    expect(map === removedMap).toBeTruthy();
    expect(map).toEqual(original);
  });

  it('removes value by given key', () => {
    const mapWithoutBar = EntityMap.remove(map, 'bar');
    expect(map === mapWithoutBar).toBeFalsy();
    expect(map).toEqual(original);
    expect(mapWithoutBar).toEqual({
      byKey: {
        foo: { id: 'foo', name: 'Foo' }
      },
      keys: ['foo']
    });
  });
});

describe('get value from map', () => {
  const map = {
    byKey: {
      foo: { id: 'foo', name: 'Foo' },
      bar: { id: 'bar', name: 'Bar' }
    },
    keys: ['foo', 'bar']
  };

  it('returns default fallback when key is not found', () => {
    expect(EntityMap.get(map, 'baz')).toEqual({});
  });

  it('returns given fallback when key is not found', () => {
    expect(EntityMap.get(map, 'baz', 'no baz')).toEqual('no baz');
  });

  it('returns entity for given key', () => {
    expect(EntityMap.get(map, 'bar')).toEqual({ id: 'bar', name: 'Bar' });
    expect(EntityMap.get(map, 'bar') === map.byKey.bar).toBeTruthy();
  });
});

describe('map function to values', () => {
  const map = {
    byKey: {
      foo: { id: 'foo', name: 'Foo' },
      bar: { id: 'bar', name: 'Bar' }
    },
    keys: ['foo', 'bar']
  };

  it('maps values with given function', () => {
    const idWithNameArray = EntityMap.map(
      map,
      (value, key) => `${key}_${value.name}`
    );
    expect(idWithNameArray).toEqual(['foo_Foo', 'bar_Bar']);
  });
});

describe('filter values', () => {
  const map = {
    byKey: {
      foo: { id: 'foo', name: 'Foo' },
      bar: { id: 'bar', name: 'Bar' }
    },
    keys: ['foo', 'bar']
  };
  const original = { ...map };

  it('filters values with given function', () => {
    expect(map).toEqual(original);
    const onlyFoo = EntityMap.filter(map, entity => entity.name === 'Foo');
    expect(onlyFoo).toEqual([{ id: 'foo', name: 'Foo' }]);
    const onlyBar = EntityMap.filter(map, entity => entity.name === 'Bar');
    expect(onlyBar).toEqual([{ id: 'bar', name: 'Bar' }]);
  });
});

describe('appliy function to values', () => {
  const ref = Object.create({ iAmDeep: true });
  const map = {
    byKey: {
      foo: { id: 'foo', deep: { prop: ref }, name: 'Foo' },
      bar: { id: 'bar', name: 'Bar' }
    },
    keys: ['foo', 'bar']
  };
  const original = { ...map };

  it('applies given function to map', () => {
    const upperCaseNames = EntityMap.apply(map, value => {
      value.name = `${value.name} update`;
      value.nameToUpper = value.name.toUpperCase();
      return value;
    });
    expect(upperCaseNames === map).toBeFalsy();
    expect(map).toEqual(original);
    expect(upperCaseNames).toEqual({
      byKey: {
        foo: {
          id: 'foo',
          deep: { prop: ref },
          name: 'Foo update',
          nameToUpper: 'FOO UPDATE'
        },
        bar: { id: 'bar', name: 'Bar update', nameToUpper: 'BAR UPDATE' }
      },
      keys: ['foo', 'bar']
    });
  });
});
