import { combineReducers } from 'redux'
import form from './form'
import dataImport from './dataImport'
import isMobile from './isMobile'
import isSidebarOpen from './isSidebarOpen'
import sync from './sync'

export default combineReducers({
  form,
  dataImport,
  sync,
  isMobile,
  isSidebarOpen
})
