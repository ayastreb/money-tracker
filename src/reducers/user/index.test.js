import reducer from './'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({ isAuthenticated: false })
})
