import { LOAD_SETTINGS_SUCCESS, CHANGE_CURRENCY } from '../../actions/settings'
import { DEFAULT_BASE_CURRENCY } from '../../constants/currency'

export default function(
  state = { base: DEFAULT_BASE_CURRENCY, secondary: [] },
  action
) {
  switch (action.type) {
    case LOAD_SETTINGS_SUCCESS:
      if (!action.settings) return state
      return {
        base: action.settings.currency.base,
        secondary: action.settings.currency.secondary
      }
    case CHANGE_CURRENCY:
      return { base: action.base, secondary: action.secondary }
    default:
      return state
  }
}
