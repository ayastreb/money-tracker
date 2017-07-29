import { SYNC_REQUEST, SYNC_SUCCESS, SYNC_FAILURE } from '../../actions/sync'

export default function(state = false, action) {
  switch (action.type) {
    case SYNC_REQUEST:
      return true
    case SYNC_SUCCESS:
    case SYNC_FAILURE:
      return false
    default:
      return state
  }
}
