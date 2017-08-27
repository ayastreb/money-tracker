import omit from 'lodash/omit'
import { handleActions, combineActions } from 'redux-actions'
import {
  loadAccountsSuccess,
  saveAccountRequest,
  saveAccountFailure,
  changeBalanceRequest,
  removeAccountRequest
} from '../actions/accounts'

export default handleActions(
  {
    [loadAccountsSuccess]: (state, action) => ({
      byId: action.payload.reduce((result, account) => {
        result[account.id] = account.toState()
        return result
      }, {}),
      allIds: action.payload.map(account => account.id)
    }),
    [saveAccountRequest]: (state, action) => ({
      byId: {
        ...state.byId,
        [action.payload.id]: action.payload.toState()
      },
      allIds: state.allIds.concat(action.payload.id)
    }),
    [combineActions(saveAccountFailure, removeAccountRequest)]: (
      state,
      action
    ) => ({
      byId: omit(state.byId, action.payload),
      allIds: state.allIds.filter(id => id !== action.payload)
    }),
    [changeBalanceRequest]: (state, action) => {
      const id = action.payload.id
      const currency = action.payload.currency
      return {
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            balance: {
              ...state.byId[id].balance,
              [currency]: parseInt(state.byId[id].balance[currency], 10) +
                action.payload.amount
            }
          }
        },
        allIds: state.allIds
      }
    }
  },
  { byId: {}, allIds: [] }
)
