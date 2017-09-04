import { handleActions } from 'redux-actions'
import {
  dismissSyncWarning,
  setPendingChangesFlag,
  syncRequest,
  syncSuccess,
  syncFailure
} from '../../actions/ui/sync'

export default handleActions(
  {
    [syncRequest]: state => ({ ...state, isRunning: true }),
    [syncSuccess]: state => ({
      ...state,
      isRunning: false,
      hasPendingChanges: false
    }),
    [syncFailure]: state => ({ isRunning: false }),
    [dismissSyncWarning]: state => ({ ...state, isWarningVisible: false }),
    [setPendingChangesFlag]: state => ({ ...state, hasPendingChanges: true })
  },
  {
    isRunning: false,
    isWarningVisible: true,
    hasPendingChanges: false
  }
)
