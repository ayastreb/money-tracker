import reducer from './accounts'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    byKey: {},
    keys: []
  })
})
