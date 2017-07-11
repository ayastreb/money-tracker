import { combineReducers } from 'redux'
import accountForm from './accountForm'
import transactionForm from './transactionForm'
import isMobile from './isMobile'
import isSidebarOpen from './isSidebarOpen'
import isSyncWarningVisible from './isSyncWarningVisible'

export default combineReducers({
  accountForm,
  transactionForm,
  isMobile,
  isSidebarOpen,
  isSyncWarningVisible
})
