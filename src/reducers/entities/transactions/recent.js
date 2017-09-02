import { handleActions } from 'redux-actions'
import {
  loadRecentTransactionsSuccess,
  saveTransaction
} from '../../../actions/transactions'
import EntityMap from '../../../entities/EntityMap'

const initialState = EntityMap.fromArray([])

export default handleActions(
  {
    [loadRecentTransactionsSuccess]: (state, action) => {
      const transactions = action.payload
      return EntityMap.fromArray(transactions)
    },
    [saveTransaction]: (state, action) => {
      const transaction = action.payload
      return EntityMap.set(state, transaction)
    }
  },
  initialState
)
