import { LOAD_SETTINGS_SUCCESS, COMPLETE_SETUP } from '../../actions/settings'

export default function(state = false, action) {
  switch (action.type) {
    case LOAD_SETTINGS_SUCCESS:
      return action.settings.isSetupComplete || state
    case COMPLETE_SETUP:
      return true
    default:
      return state
  }
}
