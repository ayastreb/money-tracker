import { LOAD_SETTINGS_SUCCESS, COMPLETE_SETUP } from '../../actions/settings'

export default function(state = false, action) {
  switch (action.type) {
    case LOAD_SETTINGS_SUCCESS:
      if (!action.settings || action.settings.isSetupComplete === undefined) {
        return state
      }
      return action.settings.isSetupComplete
    case COMPLETE_SETUP:
      return true
    default:
      return state
  }
}
