import reducer from './'

it('should return initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    isLoaded: false,
    isSetupComplete: false,
    currency: {
      base: 'USD',
      secondary: []
    },
    exchangeRate: { USD: 1.0 }
  })
})
