import { combineReducers } from 'redux'
import entities from './entities'
import ui from './ui'
import settings from './settings'
import user from './user'

export default combineReducers({
  settings,
  entities,
  user,
  ui
})
