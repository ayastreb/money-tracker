import { handleActions, combineActions } from 'redux-actions'
import {
  changeSettingsCurrency,
  updateExchangeRateSuccess,
  updateExchangeRateFailure
} from '../../actions/settings'

export default handleActions(
  {
    [changeSettingsCurrency]: state => ({ ...state, isExchangeLoading: true }),
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
