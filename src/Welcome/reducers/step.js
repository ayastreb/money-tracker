import { STEP } from '../constants'
import { CHANGE_STEP } from '../actions'

export default function step(state = STEP.CURRENCY, action) {
  switch (action.type) {
    case CHANGE_STEP:
      return action.nextStep
    default:
      return state
  }
}
