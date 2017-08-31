import { handleActions } from 'redux-actions'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import {
  changeCurrencyCheckbox,
  changeCurrencyBalance
} from '../../../actions/ui/accountForm'
import { saveAccount, saveAccountFailure } from '../../../actions/accounts'
import { changeSettingsCurrency } from '../../../actions/settings'

export default handleActions(
  {
    [changeCurrencyCheckbox]: (state, { payload }) => {
      if (!payload.isChecked && Object.keys(state).length === 1) return state
      return payload.isChecked
        ? { ...state, [payload.code]: '' }
        : omit(state, payload.code)
    },
    [changeCurrencyBalance]: (state, { payload }) => ({
      ...state,
      [payload.code]: payload.balance
    }),
    [changeSettingsCurrency]: (state, { payload }) =>
      pick(state, [payload.base, ...payload.secondary]),
    [saveAccount]: () => {},
    [saveAccountFailure]: (state, { payload }) => payload.balanceToForm()
  },
  {}
)
