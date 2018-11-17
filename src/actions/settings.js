import { createActions } from 'redux-actions';

export const {
  loadSettingsSuccess,
  changeSettingsCurrency,
  updateExchangeRate,
  updateExchangeRateSuccess,
  updateExchangeRateFailure,
  toggleSectionCollapse,
  completeSetup
} = createActions(
  'LOAD_SETTINGS_SUCCESS',
  'CHANGE_SETTINGS_CURRENCY',
  'UPDATE_EXCHANGE_RATE',
  'UPDATE_EXCHANGE_RATE_SUCCESS',
  'UPDATE_EXCHANGE_RATE_FAILURE',
  'COMPLETE_SETUP',
  'TOGGLE_SECTION_COLLAPSE'
);
