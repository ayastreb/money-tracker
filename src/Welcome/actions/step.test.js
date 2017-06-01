import { CHANGE_STEP, STEPS } from '../constants/'
import { changeStep } from './step'

it('should generate change step action', () => {
  const actual = changeStep(STEPS.ACCOUNT)
  const expected = {
    type: CHANGE_STEP,
    nextStep: STEPS.ACCOUNT
  }

  expect(actual).toEqual(expected)
})
