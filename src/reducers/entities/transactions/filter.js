import { handleActions } from 'redux-actions'
import { loadFilterTransactionsSuccess } from '../../../actions/entities/transactions'
import { signOutComplete } from '../../../actions/user'
import EntityMap from '../../../entities/EntityMap'

const initialState = EntityMap.fromArray([])

export default handleActions(
  {
    [loadFilterTransactionsSuccess]: (state, action) => {
      const transactions = action.payload
      return EntityMap.fromArray(transactions)
    },
    [signOutComplete]: () => initialState
  },
  initialState
)
