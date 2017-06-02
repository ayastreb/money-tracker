import reducer from './step'
import { STEP } from '../constants'
import { CHANGE_STEP } from '../actions'

it('should return initial state', () => {
  expect(reducer(undefined, {})).toEqual(STEP.CURRENCY)
})

it('should handle step change', () => {
  expect(
    reducer(
      { step: STEP.CURRENCY },
      { type: CHANGE_STEP, nextStep: STEP.ACCOUNT }
    )
  ).toEqual(STEP.ACCOUNT)
})
