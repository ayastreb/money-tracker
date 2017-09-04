import { combineReducers } from 'redux'
import form from './form'
import isMobile from './isMobile'
import isSidebarOpen from './isSidebarOpen'
import sync from './sync'

export default combineReducers({
  form,
  sync,
  isMobile,
  isSidebarOpen
})
