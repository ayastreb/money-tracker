import { START_SYNC } from '../../actions/settings'

export default function(state = false, action) {
  switch (action.type) {
    case START_SYNC:
      return true
    default:
      return state
  }
}
