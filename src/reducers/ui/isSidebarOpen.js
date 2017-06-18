import { TOGGLE_SIDEBAR } from '../../actions/ui/sidebar'

export default function(state = false, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return !state
    default:
      return state
  }
}
