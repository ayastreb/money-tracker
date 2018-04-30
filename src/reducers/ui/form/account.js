import { handleActions, combineActions } from 'redux-actions'
import pick from 'lodash/pick'
import {
  fillInAccountForm,
  openAccountInModal,
  resetAccountForm,
  toggleOnDashboard,
  toggleCurrency,
  changeBalance,
  changeGroup,
  changeName
} from '../../../actions/ui/form/account'
import {
  saveAccountSuccess,
  removeAccountRequest,
  removeAccountStart,
  removeAccountFailure,
  removeAccountSuccess,
  removeAccountItemProcessed
} from '../../../actions/entities/accounts'
import { changeSettingsCurrency } from '../../../actions/settings'
import Account from '../../../entities/Account'

const initialState = {
  name: '',
  group: Account.defaultGroup,
  balance: {},
  currencies: [],
  on_dashboard: true,
  completed: false,
  isModalOpen: false,
  isDeleteRequest: false,
  isDeleteRunning: false,
  itemsToProcess: Infinity,
  itemsProcessed: 0
}
export default handleActions(
  {
    [changeGroup]: (state, { payload }) => ({ ...state, group: payload }),
    [changeName]: (state, { payload }) => ({ ...state, name: payload }),
    [toggleCurrency]: (state, { payload }) => {
      const isChecked = state.currencies.includes(payload)
      if (isChecked && state.currencies.length === 1) return state
      return {
        ...state,
        currencies: isChecked
          ? state.currencies.filter(code => code !== payload)
          : state.currencies.concat(payload),
        balance:
          !isChecked && state.balance[payload] === undefined
            ? { ...state.balance, [payload]: '' }
            : state.balance
      }
    },
    [changeBalance]: (state, { payload }) => ({
      ...state,
      currencies: state.currencies.includes(payload.code)
        ? state.currencies
        : state.currencies.concat(payload.code),
      balance: { ...state.balance, [payload.code]: payload.balance }
    }),
    [toggleOnDashboard]: state => ({
      ...state,
      on_dashboard: !state.on_dashboard
    }),
    [changeSettingsCurrency]: (state, { payload }) => {
      const currencies = new Set([payload.base, ...payload.secondary])
      return {
        ...state,
        currencies: state.currencies.filter(code => currencies.has(code)),
        balance: pick(state.balance, [...currencies])
      }
    },
    [openAccountInModal]: (state, { payload }) => ({
      ...state,
      ...payload,
      isModalOpen: true
    }),
    [resetAccountForm]: () => initialState,
    [combineActions(saveAccountSuccess, removeAccountSuccess)]: () => ({
      ...initialState,
      completed: true
    }),
    [fillInAccountForm]: (state, { payload }) => ({
      ...state,
      ...Account.toForm(payload)
    }),
    [removeAccountRequest]: state => ({
      ...state,
      isDeleteRequest: !state.isDeleteRequest
    }),
    [removeAccountStart]: (state, action) => ({
      ...state,
      isDeleteRunning: true,
      itemsToProcess: action.payload
    }),
    [combineActions(removeAccountSuccess, removeAccountFailure)]: state => ({
      ...state,
      isDeleteRunning: false
    }),
    [removeAccountItemProcessed]: (state, action) => ({
      ...state,
      itemsProcessed: action.payload
    })
  },
  initialState
)
