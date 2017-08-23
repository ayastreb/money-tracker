import omit from 'lodash/omit'
import { REQUEST, SUCCESS, FAILURE } from '../../middleware/promise'
import {
  loadAccounts,
  syncAccounts,
  saveAccount,
  changeBalance,
  removeAccount
} from '../../actions/accounts'

export default function(state = { byId: {}, allIds: [] }, action) {
  switch (action.type) {
    case `${loadAccounts}_${SUCCESS}`:
    case `${syncAccounts}_${SUCCESS}`:
      if (!action.payload) return state
      return {
        byId: action.payload.reduce((result, account) => {
          result[account.id] = account.toState()
          return result
        }, {}),
        allIds: action.payload.map(account => account.id)
      }
    case `${saveAccount}_${REQUEST}`:
      const account = action.meta.account
      return {
        byId: { ...state.byId, [account.id]: account.toState() },
        allIds: state.allIds.concat(account.id)
      }
    case `${saveAccount}_${FAILURE}`:
      return {
        byId: omit(state.byId, action.meta.account.id),
        allIds: state.allIds.filter(id => id !== action.meta.account.id)
      }
    case `${removeAccount}_${REQUEST}`:
      return {
        byId: omit(state.byId, action.meta.id),
        allIds: state.allIds.filter(id => id !== action.meta.id)
      }
    case `${changeBalance}_${REQUEST}`:
      const id = action.meta.id
      const currency = action.meta.currency
      return {
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            balance: {
              ...state.byId[id].balance,
              [currency]: parseInt(state.byId[id].balance[currency], 10) +
                action.meta.amount
            }
          }
        },
        allIds: state.allIds
      }
    default:
      return state
  }
}
