import { combineReducers } from 'redux'
import accountForm from './accountForm'
import accountsWidget from './accountsWidget'
import isMobile from './isMobile'
import isSidebarOpen from './isSidebarOpen'

export default combineReducers({
  accountForm,
  accountsWidget,
  isMobile,
  isSidebarOpen
})
