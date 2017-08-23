import { startSync } from '../sync'
import {
  sendAuthCode,
  verifyAuthCode,
  parseHash,
  getSyncCredentials
} from '../../util/auth'
import { loadSettings } from '../settings'

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
      const accessToken = await parseHash(hash)
      const couchDB = await getSyncCredentials(accessToken)

      localStorage.setItem('userInfo', JSON.stringify({ accessToken, couchDB }))

      dispatch(loadSettings()).then(() => {
        dispatch({ type: FINISH_AUTH_SUCCESS })
        dispatch(startSync())
      })
    } catch (error) {
      dispatch({
        type: FINISH_AUTH_FAILURE,
        error: error.description || error.message
      })
    }
  }
}
