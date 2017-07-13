import reducer from './'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    isLoaded: false,
    isSetupComplete: false,
    currency: {
      base: 'USD',
      secondary: []
    },
    exchangeRate: { USD: 1.0 },
    collapsedSections: [],
    sync: {
      databases: {},
      host: '',
      key: '',
      password: ''
    }
  })
})
