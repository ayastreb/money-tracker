import { createActions } from 'redux-actions'
import settings from '../util/storage/settings'
import { fetchExchangeRates } from '../util/currency'

export const {
  loadSettings,
  completeSetup,
  changeCurrency,
  updateExchangeRate,
  toggleSectionCollapse
} = createActions({
  LOAD_SETTINGS: settings.load,
  COMPLETE_SETUP: null,
  CHANGE_CURRENCY: (nextBase, secondary, currentBase) => ({
    base: nextBase,
    secondary: secondary.includes(nextBase)
      ? secondary.concat(currentBase).filter(code => code !== nextBase)
      : secondary
  }),
  UPDATE_EXCHANGE_RATE: (base, target) => fetchExchangeRates(base, target),
  TOGGLE_SECTION_COLLAPSE: section => section
})
