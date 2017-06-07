import { combineReducers } from 'redux'
import ui from './ui'
import settings from './settings'
import accounts from './accounts'

export default combineReducers({
  ui,
  settings,
  accounts
})
