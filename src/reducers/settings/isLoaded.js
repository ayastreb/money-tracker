import { LOAD_SETTINGS_SUCCESS } from '../../actions/settings'

export default function(state = false, action) {
  return action.type === LOAD_SETTINGS_SUCCESS ? true : state
}
