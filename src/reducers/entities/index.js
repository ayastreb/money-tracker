import { combineReducers } from 'redux'
import accounts from './accounts'
import tags from './tags'
import transactions from './transactions'

export default combineReducers({ accounts, tags, transactions })
