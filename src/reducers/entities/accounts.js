import { handleActions, combineActions } from 'redux-actions'
import {
  loadAccountsSuccess,
  saveAccount,
  saveAccountFailure,
  removeAccount
} from '../../actions/entities/accounts'
import { saveTransaction } from '../../actions/entities/transactions'
import { TRANSFER } from '../../entities/Transaction'
import Account from '../../entities/Account'
import EntityMap from '../../entities/EntityMap'

const initialState = EntityMap.fromArray([])

export default handleActions(
  {
    [loadAccountsSuccess]: (state, action) => {
      const accounts = action.payload
      return EntityMap.fromArray(accounts)
    },
    [saveAccount]: (state, action) => {
      const account = action.payload
      return EntityMap.set(state, account)
    },
    [combineActions(removeAccount, saveAccountFailure)]: (state, action) => {
      const accountId = action.payload
      return EntityMap.remove(state, accountId)
    },
    [saveTransaction]: (state, action) => {
      const transaction = action.payload
      const mutatedAccounts = [
        Account.mutateBalance(
          EntityMap.get(state, transaction.accountId),
          transaction.currency,
          transaction.amount * (transaction.kind === TRANSFER ? -1 : 1)
        )
      ]
      if (transaction.kind === TRANSFER) {
        mutatedAccounts.push(
          Account.mutateBalance(
            EntityMap.get(state, transaction.linkedAccountId),
            transaction.linkedCurrency,
            transaction.linkedAmount
          )
        )
      }

      return EntityMap.merge(state, mutatedAccounts)
    }
  },
  initialState
)
