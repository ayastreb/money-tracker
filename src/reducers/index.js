import { combineReducers } from 'redux'
import entities from './entities'
import ui from './ui'
import settings from './settings'
import user from './user'
import sync from './sync'

export default combineReducers({
  entities,
  ui,
  settings,
  user,
  sync
})
