import omit from 'lodash/omit'
import { handleActions, combineActions } from 'redux-actions'
import { REQUEST, SUCCESS, FAILURE } from '../middleware/promise'
import {
  loadAccounts,
  syncAccounts,
  saveAccount,
  changeBalance,
  removeAccount
} from '../actions/accounts'

export default handleActions(
  {
    [combineActions(
      `${loadAccounts}_${SUCCESS}`,
      `${syncAccounts}_${SUCCESS}`
    )]: (state, action) => {
      if (!action.payload) return state
      return {
        byId: action.payload.reduce((result, account) => {
          result[account.id] = account.toState()
          return result
        }, {}),
        allIds: action.payload.map(account => account.id)
      }
    },
    [`${saveAccount}_${REQUEST}`]: (state, action) => ({
      byId: {
        ...state.byId,
        [action.meta.account.id]: action.meta.account.toState()
      },
      allIds: state.allIds.concat(action.meta.account.id)
    }),
    [`${saveAccount}_${FAILURE}`]: (state, action) => ({
      byId: omit(state.byId, action.meta.account.id),
      allIds: state.allIds.filter(id => id !== action.meta.account.id)
    }),
    [`${removeAccount}_${REQUEST}`]: (state, action) => ({
      byId: omit(state.byId, action.meta.id),
      allIds: state.allIds.filter(id => id !== action.meta.id)
    }),
    [`${changeBalance}_${REQUEST}`]: (state, action) => {
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
    }
  },
  { byId: {}, allIds: [] }
)
