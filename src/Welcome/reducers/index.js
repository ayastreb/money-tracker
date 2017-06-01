import { combineReducers } from 'redux'
import step from './step'
import currency from './currency'
import accounts from './accounts'

export default combineReducers({
  step,
  currency,
  accounts
})
