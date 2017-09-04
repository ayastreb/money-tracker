import { handleActions } from 'redux-actions'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import {
  changeCurrencyCheckbox,
  changeCurrencyBalance,
  changeGroup,
  changeName
} from '../../../actions/ui/form/account'
import {
  saveAccount,
  saveAccountFailure
} from '../../../actions/entities/accounts'
import { changeSettingsCurrency } from '../../../actions/settings'
import Account from '../../../entities/Account'

const initialState = {
  name: '',
  group: Account.defaultGroup,
  balance: {}
}
export default handleActions(
  {
    [changeGroup]: (state, { payload }) => ({ ...state, group: payload }),
    [changeName]: (state, { payload }) => ({ ...state, name: payload }),
    [changeCurrencyCheckbox]: (state, { payload }) => {
      if (!payload.isChecked && Object.keys(state).length === 1) return state
      return {
        ...state,
        balance: payload.isChecked
          ? { ...state.balance, [payload.code]: '' }
          : omit(state.balance, payload.code)
      }
    },
    [changeCurrencyBalance]: (state, { payload }) => ({
      ...state,
      balance: { ...state.balance, [payload.code]: payload.balance }
    }),
    [changeSettingsCurrency]: (state, { payload }) => ({
      ...state,
      balance: pick(state.balance, [payload.base, ...payload.secondary])
    }),
    [saveAccount]: () => initialState,
    [saveAccountFailure]: (state, { payload }) => Account.toForm(payload)
  },
  initialState
)
