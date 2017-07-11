import { combineReducers } from 'redux'
import ui from './ui'
import settings from './settings'
import accounts from './accounts'
import transactions from './transactions'
import tags from './tags'
import user from './user'

export default combineReducers({
  ui,
  settings,
  accounts,
  transactions,
  tags,
  user
})
