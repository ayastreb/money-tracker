import reducer from './recent';

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    byKey: {},
    keys: []
  });
});
