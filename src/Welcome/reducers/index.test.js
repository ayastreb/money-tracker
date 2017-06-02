import reducer from './'
import { STEP } from '../constants/'

it('should return initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    step: STEP.CURRENCY,
    currency: {
      base: 'USD',
      secondary: []
    },
    accounts: []
  })
})
