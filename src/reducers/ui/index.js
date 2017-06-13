import { combineReducers } from 'redux'
import accountForm from './accountForm'
import isMobile from './isMobile'
import isSidebarOpen from './isSidebarOpen'

export default combineReducers({
  accountForm,
  isMobile,
  isSidebarOpen
})
