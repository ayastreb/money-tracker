import pick from 'lodash/pick'
import { handleActions } from 'redux-actions'
import {
  loadSettingsSuccess,
  changeSettingsCurrency,
  updateExchangeRateSuccess,
  toggleSectionCollapse,
  completeSetup
} from '../actions/settings'
import { signOutComplete } from '../actions/user'
import Currency from '../entities/Currency'

const initialState = {
  isLoaded: false,
  isSetupComplete: false,
  currency: { base: Currency.defaultBase, secondary: [] },
  exchangeRate: { [Currency.defaultBase]: 1.0 },
  collapsedSections: []
}

export default handleActions(
  {
    [loadSettingsSuccess]: (state, { payload }) => ({
      ...state,
      isLoaded: true,
      ...pick(payload, Object.keys(state))
    }),
    [changeSettingsCurrency]: (state, { payload }) => {
      let { base, secondary } = payload
      if (secondary.includes(base)) {
        secondary = secondary
          .concat(state.currency.base)
          .filter(code => code !== base)
      }

      return { ...state, currency: { base, secondary } }
    },
    [updateExchangeRateSuccess]: (state, { payload }) => ({
      ...state,
      exchangeRate: payload
    }),
    [toggleSectionCollapse]: (state, { payload }) => ({
      ...state,
      collapsedSections: state.collapsedSections.includes(payload)
        ? state.collapsedSections.filter(section => section !== payload)
        : state.collapsedSections.concat(payload)
    }),
    [completeSetup]: state => ({ ...state, isSetupComplete: true }),
    [signOutComplete]: () => initialState
  },
  initialState
)
