import { handleActions, combineActions } from 'redux-actions'
import {
  loadAccountsSuccess,
  saveAccount,
  saveAccountFailure,
  updateAccount,
  removeAccount
} from '../../actions/entities/accounts'
import EntityMap from '../../entities/EntityMap'

const initialState = EntityMap.fromArray([])

export default handleActions(
  {
    [loadAccountsSuccess]: (state, action) => {
      const accounts = action.payload
      return EntityMap.fromArray(accounts)
    },
    [combineActions(saveAccount, updateAccount)]: (state, action) => {
      const account = action.payload
      return EntityMap.set(state, account)
    },
    [combineActions(removeAccount, saveAccountFailure)]: (state, action) => {
      const accountId = action.payload
      return EntityMap.remove(state, accountId)
    }
  },
  initialState
)
