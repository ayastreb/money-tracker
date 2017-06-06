import reducer from './welcome'
import { STEP } from '../../constants/ui/welcome'
import { CHANGE_STEP } from '../../actions/ui/welcome'

it('should return initial state', () => {
  expect(reducer(undefined, {})).toEqual({ step: STEP.CURRENCY })
})

it('should change step', () => {
  expect(
    reducer(
      { step: STEP.CURRENCY },
      { type: CHANGE_STEP, nextStep: STEP.ACCOUNT }
    )
  ).toEqual({ step: STEP.ACCOUNT })
})
