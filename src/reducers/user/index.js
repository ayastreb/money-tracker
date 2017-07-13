import { FINISH_AUTH_SUCCESS } from '../../actions/ui/auth'
export default function(
  state = {
    isAuthenticated: !!localStorage.getItem('accessToken')
  },
  action
) {
  switch (action.type) {
    case FINISH_AUTH_SUCCESS:
      return { ...state, isAuthenticated: true }
    default:
      return state
  }
}
