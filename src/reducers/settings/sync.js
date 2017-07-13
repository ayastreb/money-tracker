import {
  LOAD_SETTINGS_SUCCESS,
  UPDATE_SYNC_SETTINGS
} from '../../actions/settings'

export default function(
  state = { databases: {}, host: '', key: '', password: '' },
  action
) {
  switch (action.type) {
    case LOAD_SETTINGS_SUCCESS:
      if (!action.settings || action.settings.sync === undefined) {
        return state
      }
      return action.settings.sync
    case UPDATE_SYNC_SETTINGS:
      return action.settings
    default:
      return state
  }
}
