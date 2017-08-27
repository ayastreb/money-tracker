import { createActions } from 'redux-actions'
import settings from '../util/storage/settings'
import { fetchExchangeRates } from '../util/currency'

export const {
  changeSettingsCurrency,
  loadSettingsSuccess,
  updateExchangeRateSuccess,
  toggleSectionCollapse,
  completeSetup
} = createActions(
  {
    CHANGE_SETTINGS_CURRENCY: (nextBase, secondary, currentBase) => ({
      base: nextBase,
      secondary: secondary.includes(nextBase)
        ? secondary.concat(currentBase).filter(code => code !== nextBase)
        : secondary
    })
  },
  'LOAD_SETTINGS_SUCCESS',
  'UPDATE_EXCHANGE_RATE_SUCCESS',
  'COMPLETE_SETUP',
  'TOGGLE_SECTION_COLLAPSE'
)

export function loadSettings() {
  return dispatch =>
    settings.load().then(settings => dispatch(loadSettingsSuccess(settings)))
}

export function updateExchangeRate(base, target) {
  return dispatch =>
    fetchExchangeRates(base, target).then(rates =>
      dispatch(updateExchangeRateSuccess(rates))
    )
}
