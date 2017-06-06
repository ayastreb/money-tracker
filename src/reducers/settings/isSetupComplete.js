import { COMPLETE_SETUP } from '../../actions/settings'

export default function(state = false, action) {
  return action.type === COMPLETE_SETUP ? true : state
}
