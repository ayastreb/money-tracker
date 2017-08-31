import { handleActions } from 'redux-actions'
import { userLoggedIn } from '../actions/user'

export default handleActions(
  {
    [userLoggedIn]: state => ({ ...state, isAuthenticated: true })
  },
  {
    isAuthenticated: false
  }
)
