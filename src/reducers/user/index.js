import { PARSE_HASH_SUCCESS } from '../../actions/ui/auth'
export default function(
  state = {
    isAuthenticated: !!localStorage.getItem('accessToken')
  },
  action
) {
  switch (action.type) {
    case PARSE_HASH_SUCCESS:
      return { ...state, isAuthenticated: true }
    default:
      return state
  }
}
