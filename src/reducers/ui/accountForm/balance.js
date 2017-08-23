import omit from 'lodash/omit'
import pick from 'lodash/pick'
import { REQUEST, FAILURE } from '../../../middleware/promise'
import {
  CHANGE_CURRENCY_CHECKBOX,
  CHANGE_CURRENCY_BALANCE
} from '../../../actions/ui/accountForm'
import { saveAccount } from '../../../actions/accounts'
import { changeCurrency } from '../../../actions/settings'

export default function(state = {}, action) {
  switch (action.type) {
    case CHANGE_CURRENCY_CHECKBOX:
      if (!action.isChecked && Object.keys(state).length === 1) return state
      return action.isChecked
        ? { ...state, [action.code]: '' }
        : omit(state, action.code)
    case changeCurrency.toString():
      return pick(state, [action.payload.base, ...action.payload.secondary])
    case CHANGE_CURRENCY_BALANCE:
      return { ...state, [action.code]: action.balance }
    case `${saveAccount}_${REQUEST}`:
      return {}
    case `${saveAccount}_${FAILURE}`:
      return action.meta.account.balanceToForm()
    default:
      return state
  }
}
