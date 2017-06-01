import reducer from './step'
import { CHANGE_STEP, STEPS } from '../constants/'

it('should return initial state', () => {
  expect(reducer(undefined, {})).toEqual(STEPS.CURRENCY)
})

it('should handle step change', () => {
  expect(
    reducer(
      { step: STEPS.CURRENCY },
      { type: CHANGE_STEP, nextStep: STEPS.ACCOUNT }
    )
  ).toEqual(STEPS.ACCOUNT)
})
