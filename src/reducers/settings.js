import pick from 'lodash/pick'
import { handleActions } from 'redux-actions'
import {
  changeCurrency,
  loadSettingsSuccess,
  updateExchangeRateSuccess,
  toggleSectionCollapse,
  completeSetup
} from '../actions/settings'
import { DEFAULT_BASE_CURRENCY } from '../constants/currency'

export default handleActions(
  {
    [loadSettingsSuccess]: (state, action) => ({
      ...state,
      isLoaded: true,
      ...pick(action.payload, Object.keys(state))
    }),
    [updateExchangeRateSuccess]: (state, action) => ({
      ...state,
      exchangeRate: action.payload
    }),
    [changeCurrency]: (state, action) => ({
      ...state,
      currency: action.payload
    }),
    [toggleSectionCollapse]: (state, action) => ({
      ...state,
      collapsedSections: state.collapsedSections.includes(action.payload)
        ? state.collapsedSections.filter(section => section !== action.payload)
        : state.collapsedSections.concat(action.payload)
    }),
    [completeSetup]: state => ({ ...state, isSetupComplete: true })
  },
  {
    isLoaded: false,
    isSetupComplete: false,
    currency: { base: DEFAULT_BASE_CURRENCY, secondary: [] },
    exchangeRate: { [DEFAULT_BASE_CURRENCY]: 1.0 },
    collapsedSections: []
  }
)
