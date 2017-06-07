import { retrieveSettings, persistSettings } from '../util/storage/settings'
import { fetchExchangeRates } from '../util/currency'

export const LOAD_SETTINGS_REQUEST = 'LOAD_SETTINGS_REQUEST'
export const LOAD_SETTINGS_SUCCESS = 'LOAD_SETTINGS_SUCCESS'
export const LOAD_SETTINGS_FAILURE = 'LOAD_SETTINGS_FAILURE'
export function loadSettings() {
  return async dispatch => {
    dispatch({ type: LOAD_SETTINGS_REQUEST })
    try {
      const settings = await retrieveSettings()
      dispatch({ type: LOAD_SETTINGS_SUCCESS, settings })
    } catch (error) {
      dispatch({ type: LOAD_SETTINGS_FAILURE, error })
    }
  }
}

export const UPDATE_SETTINGS_REQUEST = 'UPDATE_SETTINGS_REQUEST'
export const UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS'
export const UPDATE_SETTINGS_FAILURE = 'UPDATE_SETTINGS_FAILURE'
export function updateSettings(settings) {
  return async dispatch => {
    dispatch({ type: UPDATE_SETTINGS_REQUEST })
    try {
      await persistSettings(settings)
      dispatch({ type: UPDATE_SETTINGS_SUCCESS })
    } catch (error) {
      dispatch({ type: UPDATE_SETTINGS_FAILURE, error })
    }
  }
}

export const UPDATE_EXCHANGE_RATE_REQUEST = 'UPDATE_EXCHANGE_RATE_REQUEST'
export const UPDATE_EXCHANGE_RATE_SUCCESS = 'UPDATE_EXCHANGE_RATE_SUCCESS'
export const UPDATE_EXCHANGE_RATE_FAILURE = 'UPDATE_EXCHANGE_RATE_FAILURE'
export function updateExchangeRate(base, secondary) {
  return async dispatch => {
    dispatch({ type: UPDATE_EXCHANGE_RATE_REQUEST })
    try {
      const exchangeRate = await fetchExchangeRates(base, secondary)
      dispatch({ type: UPDATE_EXCHANGE_RATE_SUCCESS, exchangeRate })
      dispatch(updateSettings({ currency: { base, secondary }, exchangeRate }))
    } catch (error) {
      dispatch({ type: UPDATE_EXCHANGE_RATE_FAILURE, error })
    }
  }
}

export const COMPLETE_SETUP = 'COMPLETE_SETUP'
export function completeSetup() {
  return async dispatch => {
    dispatch({ type: COMPLETE_SETUP })
    dispatch(updateSettings({ isSetupComplete: true }))
  }
}

export const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
export function changeCurrency(base, secondary) {
  return async dispatch => {
    const secondaryWithoutBase = secondary.filter(code => code !== base)
    dispatch({
      type: CHANGE_CURRENCY,
      base,
      secondary: secondaryWithoutBase
    })
    dispatch(updateExchangeRate(base, secondaryWithoutBase))
  }
}
