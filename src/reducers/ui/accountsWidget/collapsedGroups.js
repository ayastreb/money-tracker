import { TOGGLE_GROUP_COLLAPSE } from '../../../actions/ui/accountsWidget'

export default function(state = [], action) {
  switch (action.type) {
    case TOGGLE_GROUP_COLLAPSE:
      return state.includes(action.group)
        ? state.filter(group => group !== action.group)
        : state.concat(action.group)
    default:
      return state
  }
}
