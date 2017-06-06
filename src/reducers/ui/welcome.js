import { CHANGE_STEP } from '../../actions/ui/welcome'
import { STEP } from '../../constants/ui/welcome'

export default function(state = { step: STEP.CURRENCY }, action) {
  return action.type === CHANGE_STEP ? { step: action.nextStep } : state
}
