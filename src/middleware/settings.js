import { persistLocalSettings, persistSettings } from '../util/storage/settings'
import {
  COMPLETE_SETUP,
  UPDATE_EXCHANGE_RATE_SUCCESS,
  CHANGE_CURRENCY,
  TOGGLE_SECTION_COLLAPSE
} from '../actions/settings'

export default store => next => action => {
  const result = next(action)
  switch (action.type) {
    case COMPLETE_SETUP:
    case CHANGE_CURRENCY:
    case UPDATE_EXCHANGE_RATE_SUCCESS:
      const {
        isSetupComplete,
        currency,
        exchangeRate
      } = store.getState().settings
      persistSettings({ isSetupComplete, currency, exchangeRate })

      return result
    case TOGGLE_SECTION_COLLAPSE:
      const { collapsedSections } = store.getState().settings
      persistLocalSettings({ collapsedSections })

      return result
    default:
      return result
  }
}
