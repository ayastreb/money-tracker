import { createActions } from 'redux-actions'
import { syncAccounts } from './accounts'
import { syncTransactions } from './transactions'
import { syncTags } from './tags'

export const {
  dismissSyncWarning,
  setPendingChangesFlag,
  syncRequest,
  syncSuccess,
  syncFailure
} = createActions(
  'DISMISS_SYNC_WARNING',
  'SET_PENDING_CHANGES_FLAG',
  'SYNC_REQUEST',
  'SYNC_SUCCESS',
  'SYNC_FAILURE'
)

export function sync() {
  return dispatch => {
    dispatch(syncRequest())

    return Promise.all([
      dispatch(syncAccounts()),
      dispatch(syncTransactions()),
      dispatch(syncTags())
    ])
      .then(() => dispatch(syncSuccess()))
      .catch(error => dispatch(syncFailure(error)))
  }
}
