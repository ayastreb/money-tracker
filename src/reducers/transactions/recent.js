import {
  SAVE_TRANSACTION,
  LOAD_RECENT_TRANSACTIONS
} from '../../actions/transactions'

export default function(state = { byId: {}, allIds: [] }, action) {
  switch (action.type) {
    case LOAD_RECENT_TRANSACTIONS:
      return {
        byId: action.transactions.reduce((result, transaction) => {
          result[transaction.id] = transaction
          return result
        }, {}),
        allIds: action.transactions.map(transaction => transaction.id)
      }
    case SAVE_TRANSACTION:
      return {
        byId: { ...state.byId, [action.transaction.id]: action.transaction },
        allIds: [action.transaction.id, ...state.allIds]
      }
    default:
      return state
  }
}
