import { handleActions } from 'redux-actions'
import {
  saveTransaction,
  loadRecentTransactionsSuccess
} from '../../actions/transactions'

export default handleActions(
  {
    [loadRecentTransactionsSuccess]: (state, { payload }) => ({
      byId: payload.reduce((result, transaction) => {
        result[transaction.id] = transaction
        return result
      }, {}),
      allIds: payload.map(transaction => transaction.id)
    }),
    [saveTransaction]: (state, { payload }) => ({
      byId: {
        ...state.byId,
        [payload.id]: payload
      },
      allIds: [payload.id, ...state.allIds]
    })
  },
  { byId: {}, allIds: [] }
)
