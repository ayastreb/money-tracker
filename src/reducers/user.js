import { handleActions } from 'redux-actions'
import { authSuccess } from '../actions/ui/auth'

export default handleActions(
  {
    [authSuccess]: state => ({ ...state, isAuthenticated: true })
  },
  {
    // @TODO: check if user is authenticated in bootstrap
    isAuthenticated: false
  }
)
