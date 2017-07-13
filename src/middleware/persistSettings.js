import { persistSettings } from '../util/storage/settings'
import {
  COMPLETE_SETUP,
  UPDATE_EXCHANGE_RATE_SUCCESS,
  CHANGE_CURRENCY,
  TOGGLE_SECTION_COLLAPSE,
  UPDATE_SYNC_SETTINGS
} from '../actions/settings'

export default store => next => action => {
  switch (action.type) {
    case COMPLETE_SETUP:
    case CHANGE_CURRENCY:
    case TOGGLE_SECTION_COLLAPSE:
    case UPDATE_EXCHANGE_RATE_SUCCESS:
    case UPDATE_SYNC_SETTINGS:
      const result = next(action)
      const settings = store.getState().settings
      persistSettings(settings)

      return result
    default:
      return next(action)
  }
}
