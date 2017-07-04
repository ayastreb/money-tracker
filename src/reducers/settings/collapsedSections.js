import { TOGGLE_SECTION_COLLAPSE } from '../../actions/settings'

export default function(state = [], action) {
  switch (action.type) {
    case TOGGLE_SECTION_COLLAPSE:
      return state.includes(action.section)
        ? state.filter(section => section !== action.section)
        : state.concat(action.section)
    default:
      return state
  }
}
