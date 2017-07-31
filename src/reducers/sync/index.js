import {
  SYNC_REQUEST,
  SYNC_SUCCESS,
  SYNC_FAILURE,
  DISMISS_SYNC_WARNING,
  SET_PENDING_CHANGES_FLAG,
  UNSET_PENDING_CHANGES_FLAG
} from '../../actions/sync'

export default function(
  state = {
    isRunning: false,
    isWarningVisible: true,
    hasPendingChanges: false
  },
  action
) {
  switch (action.type) {
    case SYNC_REQUEST:
      return { ...state, isRunning: true }
    case SYNC_SUCCESS:
    case SYNC_FAILURE:
      return { ...state, isRunning: false }
    case DISMISS_SYNC_WARNING:
      return { ...state, isWarningVisible: false }
    case SET_PENDING_CHANGES_FLAG:
      return { ...state, hasPendingChanges: true }
    case UNSET_PENDING_CHANGES_FLAG:
      return { ...state, hasPendingChanges: false }
    default:
      return state
  }
}
