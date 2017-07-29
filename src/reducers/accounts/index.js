import omit from 'lodash/omit'
import {
  UPDATE_ACCOUNTS_LIST,
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAILURE,
  REMOVE_ACCOUNT,
  CHANGE_ACCOUNT_BALANCE
} from '../../actions/accounts'

export default function(state = { byId: {}, allIds: [] }, action) {
  switch (action.type) {
    case UPDATE_ACCOUNTS_LIST:
      return {
        byId: action.accounts.reduce((result, account) => {
          result[account.id] = account
          result[account.id]['currencies'] = Object.keys(account.balance)
          return result
        }, {}),
        allIds: action.accounts.map(account => account.id)
      }
    case CREATE_ACCOUNT:
      return {
        byId: {
          ...state.byId,
          [action.account.id]: {
            ...action.account,
            currencies: Object.keys(action.account.balance)
          }
        },
        allIds: state.allIds.concat(action.account.id)
      }
    case REMOVE_ACCOUNT:
    case CREATE_ACCOUNT_FAILURE:
      return {
        byId: omit(state.byId, action.id),
        allIds: state.allIds.filter(id => id !== action.id)
      }
    case CHANGE_ACCOUNT_BALANCE:
      const id = action.id
      const currency = action.currency
      return {
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            balance: {
              ...state.byId[id].balance,
              [currency]: parseInt(state.byId[id].balance[currency], 10) +
                action.amount
            }
          }
        },
        allIds: state.allIds
      }
    default:
      return state
  }
}
