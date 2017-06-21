import { combineReducers } from 'redux'
import accountForm from './accountForm'
import transactionForm from './transactionForm'
import accountsWidget from './accountsWidget'
import isMobile from './isMobile'
import isSidebarOpen from './isSidebarOpen'

export default combineReducers({
  accountForm,
  transactionForm,
  accountsWidget,
  isMobile,
  isSidebarOpen
})
