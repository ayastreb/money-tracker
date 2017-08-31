import omit from 'lodash/omit'
import { handleActions, combineActions } from 'redux-actions'
import {
  loadAccountsSuccess,
  saveAccount,
  saveAccountFailure,
  removeAccount,
  changeBalance
} from '../actions/accounts'

export default handleActions(
  {
    [loadAccountsSuccess]: (state, { payload }) => ({
      byId: payload.reduce((result, account) => {
        result[account.id] = account.toState()
        return result
      }, {}),
      allIds: payload.map(account => account.id)
    }),
    [saveAccount]: (state, { payload }) => ({
      byId: {
        ...state.byId,
        [payload.id]: payload.toState()
      },
      allIds: state.allIds.concat(payload.id)
    }),
    [combineActions(saveAccountFailure, removeAccount)]: (state, action) => ({
      byId: omit(state.byId, action.payload),
      allIds: state.allIds.filter(id => id !== action.payload)
    }),
    [changeBalance]: (state, { payload }) => {
      const { id, currency, amount } = payload

      return {
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            balance: {
              ...state.byId[id].balance,
              [currency]:
                parseInt(state.byId[id].balance[currency], 10) + amount
            }
          }
        },
        allIds: state.allIds
      }
    }
  },
  { byId: {}, allIds: [] }
)
