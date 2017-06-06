import { combineReducers } from 'redux'
import ui from './ui'
import settings from './settings'

export default combineReducers({
  ui,
  settings
})
