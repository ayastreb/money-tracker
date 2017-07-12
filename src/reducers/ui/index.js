import { combineReducers } from 'redux'
import accountForm from './accountForm'
import transactionForm from './transactionForm'
import auth from './auth'
import isMobile from './isMobile'
import isSidebarOpen from './isSidebarOpen'
import isSyncWarningVisible from './isSyncWarningVisible'

export default combineReducers({
  accountForm,
  transactionForm,
  auth,
  isMobile,
  isSidebarOpen,
  isSyncWarningVisible
})
