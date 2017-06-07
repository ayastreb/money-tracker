import { CHANGE_CURRENCY } from '../../actions/settings'
import { DEFAULT_BASE_CURRENCY } from '../../constants/currency'

export default function(
  state = { base: DEFAULT_BASE_CURRENCY, secondary: [] },
  action
) {
  return action.type === CHANGE_CURRENCY
    ? { base: action.base, secondary: action.secondary }
    : state
}
