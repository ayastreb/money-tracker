import { DISMISS_SYNC_WARNING } from '../../actions/ui/syncWarning'

export default function(state = true, action) {
  switch (action.type) {
    case DISMISS_SYNC_WARNING:
      return false
    default:
      return state
  }
}
