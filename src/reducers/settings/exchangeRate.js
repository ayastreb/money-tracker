import { UPDATE_EXCHANGE_RATE_SUCCESS } from '../../actions/settings'

export default function(state = { USD: 1.0 }, action) {
  return action.type === UPDATE_EXCHANGE_RATE_SUCCESS
    ? action.exchangeRate
    : state
}
