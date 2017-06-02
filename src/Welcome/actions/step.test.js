import { STEP } from '../constants'
import { changeStep, CHANGE_STEP } from './step'

it('should generate change step action', () => {
  const actual = changeStep(STEP.ACCOUNT)
  const expected = {
    type: CHANGE_STEP,
    nextStep: STEP.ACCOUNT
  }

  expect(actual).toEqual(expected)
})
