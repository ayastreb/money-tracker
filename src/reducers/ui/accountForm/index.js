import { combineReducers } from 'redux'
import name from './name'
import group from './group'
import balance from './balance'

export default combineReducers({
  name,
  group,
  balance
})
