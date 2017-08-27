import { handleActions } from 'redux-actions'
import {
  saveTransactionRequest,
  loadRecentTransactionsSuccess
} from '../../actions/transactions'

export default handleActions(
  {
    [loadRecentTransactionsSuccess]: (state, action) => ({
      byId: action.payload.reduce((result, transaction) => {
        result[transaction.id] = transaction
        return result
      }, {}),
      allIds: action.payload.map(transaction => transaction.id)
    }),
    [saveTransactionRequest]: (state, action) => ({
      byId: {
        ...state.byId,
        [action.payload.id]: action.payload
      },
      allIds: [action.payload.id, ...state.allIds]
    })
  },
  { byId: {}, allIds: [] }
)
