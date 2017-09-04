import { combineReducers } from 'redux'
import account from './account'
import auth from './auth'
import transaction from './transaction'

export default combineReducers({ account, auth, transaction })
