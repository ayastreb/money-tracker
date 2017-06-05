import { CHANGE_CURRENCY } from '../../actions/settings'

export default function(state = { base: 'USD', secondary: [] }, action) {
  return action.type === CHANGE_CURRENCY
    ? { base: action.base, secondary: action.secondary }
    : state
}
