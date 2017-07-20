import { sendAuthCode, verifyAuthCode, parseHash } from '../../util/auth'
import { retrieveSettings } from '../../util/storage/settings'
import { LOAD_SETTINGS_SUCCESS } from '../settings'

export const CHANGE_EMAIL = 'CHANGE_EMAIL'
export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email
  }
}

export const CHANGE_CODE = 'CHANGE_CODE'
export function changeCode(code) {
  return {
    type: CHANGE_CODE,
    code
  }
}

export const SEND_CODE_REQUEST = 'SEND_CODE_REQUEST'
export const SEND_CODE_SUCCESS = 'SEND_CODE_SUCCESS'
export const SEND_CODE_FAILURE = 'SEND_CODE_FAILURE'
export function sendCode(email) {
  return async dispatch => {
    dispatch({ type: SEND_CODE_REQUEST })
    try {
      const response = await sendAuthCode(email)
      dispatch({ type: SEND_CODE_SUCCESS, response })
    } catch (error) {
      dispatch({
        type: SEND_CODE_FAILURE,
        error: error.description || error.message
      })
    }
  }
}

export const VERIFY_CODE_REQUEST = 'VERIFY_CODE_REQUEST'
export const VERIFY_CODE_SUCCESS = 'VERIFY_CODE_SUCCESS'
export const VERIFY_CODE_FAILURE = 'VERIFY_CODE_FAILURE'
export function verifyCode(email, code) {
  return async dispatch => {
    dispatch({ type: VERIFY_CODE_REQUEST })
    try {
      const response = await verifyAuthCode(email, code)
      dispatch({ type: VERIFY_CODE_SUCCESS, response })
    } catch (error) {
      dispatch({
        type: VERIFY_CODE_FAILURE,
        error: error.description || error.message
      })
    }
  }
}

export const FINISH_AUTH_SUCCESS = 'FINISH_AUTH_SUCCESS'
export const FINISH_AUTH_FAILURE = 'FINISH_AUTH_FAILURE'
export function finishAuth(hash) {
  return async dispatch => {
    try {
      await parseHash(hash)
      const settings = await retrieveSettings()
      dispatch({ type: LOAD_SETTINGS_SUCCESS, settings })
      dispatch({ type: FINISH_AUTH_SUCCESS })
    } catch (error) {
      dispatch({
        type: FINISH_AUTH_FAILURE,
        error: error.description || error.message
      })
    }
  }
}
