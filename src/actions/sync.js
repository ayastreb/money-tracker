import { syncAccounts } from '../util/storage/accounts'
import { syncTransactions } from '../util/storage/transactions'
import { updateAccountsList } from './accounts'
import { updateRecentTransactionsList } from './transactions'

export const DISMISS_SYNC_WARNING = 'DISMISS_SYNC_WARNING'
export function dismissSyncWarning() {
  return {
    type: DISMISS_SYNC_WARNING
  }
}

export const SET_PENDING_CHANGES_FLAG = 'SET_PENDING_CHANGES_FLAG'
export function setPendingChangesFlag() {
  return {
    type: SET_PENDING_CHANGES_FLAG
  }
}

export const UNSET_PENDING_CHANGES_FLAG = 'UNSET_PENDING_CHANGES_FLAG'
export function unsetPendingChangesFlag() {
  return {
    type: UNSET_PENDING_CHANGES_FLAG
  }
}

export const SYNC_REQUEST = 'SYNC_REQUEST'
export const SYNC_SUCCESS = 'SYNC_SUCCESS'
export const SYNC_FAILURE = 'SYNC_FAILURE'
export function startSync() {
  return async dispatch => {
    dispatch({ type: SYNC_REQUEST })
    try {
      const accounts = await syncAccounts()
      if (accounts) dispatch(updateAccountsList(accounts))
      const transactions = await syncTransactions()
      if (transactions) dispatch(updateRecentTransactionsList(transactions))
      dispatch({ type: SYNC_SUCCESS })
    } catch (error) {
      dispatch({ type: SYNC_FAILURE, error })
    }
  }
}
