import omit from 'lodash/omit'
import {
  LOAD_ACCOUNTS_SUCCESS,
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAILURE,
  REMOVE_ACCOUNT
} from '../../actions/accounts'

export default function(state = { byId: {}, allIds: [] }, action) {
  switch (action.type) {
    case LOAD_ACCOUNTS_SUCCESS:
      return {
        byId: action.accounts.reduce((result, account) => {
          result[account.id] = account
          return result
        }, {}),
        allIds: action.accounts.map(account => account.id)
      }
    case CREATE_ACCOUNT:
      return {
        byId: { ...state.byId, [action.account.id]: action.account },
        allIds: state.allIds.concat(action.account.id)
      }
    case REMOVE_ACCOUNT:
    case CREATE_ACCOUNT_FAILURE:
      return {
        byId: omit(state.byId, action.id),
        allIds: state.allIds.filter(id => id !== action.id)
      }
    default:
      return state
  }
}
