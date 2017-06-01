import { CHANGE_STEP, STEPS } from '../constants'

export default function step(state = STEPS.CURRENCY, action) {
  switch (action.type) {
    case CHANGE_STEP:
      return action.nextStep
    default:
      return state
  }
}
