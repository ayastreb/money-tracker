import {
  LOAD_SETTINGS_SUCCESS,
  UPDATE_EXCHANGE_RATE_SUCCESS
} from '../../actions/settings'

export default function(state = { USD: 1.0 }, action) {
  switch (action.type) {
    case LOAD_SETTINGS_SUCCESS:
      if (!action.settings) return state
      return action.settings.exchangeRate
    case UPDATE_EXCHANGE_RATE_SUCCESS:
      return action.exchangeRate
    default:
      return state
  }
}
