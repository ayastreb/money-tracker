import omit from 'lodash/omit'
import pick from 'lodash/pick'
import {
  CHANGE_CURRENCY_CHECKBOX,
  CHANGE_CURRENCY_BALANCE
} from '../../../actions/ui/accountForm'
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAILURE
} from '../../../actions/accounts'
import { CHANGE_CURRENCY } from '../../../actions/settings'

export default function(state = {}, action) {
  switch (action.type) {
    case CHANGE_CURRENCY_CHECKBOX:
      if (!action.isChecked && Object.keys(state).length === 1) return state
      return action.isChecked
        ? { ...state, [action.code]: '' }
        : omit(state, action.code)
    case CHANGE_CURRENCY:
      return pick(state, [action.base, ...action.secondary])
    case CHANGE_CURRENCY_BALANCE:
      if (action.balance === '') return state
      return { ...state, [action.code]: action.balance }
    case CREATE_ACCOUNT:
      return {}
    case CREATE_ACCOUNT_FAILURE:
      return action.balance
    default:
      return state
  }
}
