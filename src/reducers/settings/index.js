import { combineReducers } from 'redux'
import isSetupComplete from './isSetupComplete'
import isLoaded from './isLoaded'
import currency from './currency'
import exchangeRate from './exchangeRate'

export default combineReducers({
  isLoaded,
  isSetupComplete,
  currency,
  exchangeRate
})
