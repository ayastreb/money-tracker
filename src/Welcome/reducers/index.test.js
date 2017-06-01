import reducer from './'
import { STEPS } from '../constants/'

it('should return initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    step: STEPS.CURRENCY,
    currency: {
      base: 'USD',
      secondary: []
    },
    accounts: []
  })
})
