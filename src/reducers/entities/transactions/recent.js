import { handleActions } from 'redux-actions'
import { loadRecentTransactionsSuccess } from '../../../actions/entities/transactions'
import { signOutComplete } from '../../../actions/user'
import EntityMap from '../../../entities/EntityMap'

const initialState = EntityMap.fromArray([])

export default handleActions(
  {
    [loadRecentTransactionsSuccess]: (state, action) => {
      const transactions = action.payload
      return EntityMap.fromArray(transactions)
    },
    [signOutComplete]: () => initialState
  },
  initialState
)
