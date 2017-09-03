import { combineReducers } from 'redux'
import entities from './entities'
import ui from './ui'
import settings from './settings'
import sync from './sync'
import user from './user'

export default combineReducers({
  entities,
  ui,
  settings,
  sync,
  user
})
