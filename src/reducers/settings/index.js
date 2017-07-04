import { combineReducers } from 'redux'
import isSetupComplete from './isSetupComplete'
import isLoaded from './isLoaded'
import currency from './currency'
import exchangeRate from './exchangeRate'
import collapsedSections from './collapsedSections'

export default combineReducers({
  isLoaded,
  isSetupComplete,
  currency,
  exchangeRate,
  collapsedSections
})
