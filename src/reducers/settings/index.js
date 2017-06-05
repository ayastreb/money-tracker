import { combineReducers } from 'redux'
import isSetupComplete from './isSetupComplete'
import currency from './currency'
import exchangeRate from './exchangeRate'

export default combineReducers({
  isSetupComplete,
  currency,
  exchangeRate
})
