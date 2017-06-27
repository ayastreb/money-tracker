import { combineReducers } from 'redux'
import ui from './ui'
import settings from './settings'
import accounts from './accounts'
import transactions from './transactions'
import tags from './tags'

export default combineReducers({
  ui,
  settings,
  accounts,
  transactions,
  tags
})
