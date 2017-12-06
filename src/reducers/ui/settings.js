import { handleActions, combineActions } from 'redux-actions'
import {
  changeSettingsCurrency,
  updateExchangeRate,
  updateExchangeRateSuccess,
  updateExchangeRateFailure
} from '../../actions/settings'

export default handleActions(
  {
    [combineActions(changeSettingsCurrency, updateExchangeRate)]: state => ({
      ...state,
      isExchangeLoading: true
    }),
    [combineActions(
      updateExchangeRateSuccess,
      updateExchangeRateFailure
    )]: state => ({
      ...state,
      isExchangeLoading: false
    })
  },
  { isExchangeLoading: false }
)
