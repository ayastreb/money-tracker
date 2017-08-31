import { createActions } from 'redux-actions'

export const {
  loadSettingsSuccess,
  changeSettingsCurrency,
  updateExchangeRateSuccess,
  toggleSectionCollapse,
  completeSetup
} = createActions(
  'LOAD_SETTINGS_SUCCESS',
  'CHANGE_SETTINGS_CURRENCY',
  'UPDATE_EXCHANGE_RATE_SUCCESS',
  'COMPLETE_SETUP',
  'TOGGLE_SECTION_COLLAPSE'
)
