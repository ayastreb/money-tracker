import { CHANGE_STEP } from '../constants/step'

export function changeStep(nextStep) {
  return {
    type: CHANGE_STEP,
    nextStep
  }
}
