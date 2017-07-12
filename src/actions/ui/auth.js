import { sendAuthCode, verifyAuthCode, parseAuthHash } from '../../util/auth'

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
      console.log(response)
      dispatch({ type: VERIFY_CODE_SUCCESS, response })
    } catch (error) {
      dispatch({
        type: VERIFY_CODE_FAILURE,
        error: error.description || error.message
      })
    }
  }
}

export const PARSE_HASH_SUCCESS = 'PARSE_HASH_SUCCESS'
export const PARSE_HASH_FAILURE = 'PARSE_HASH_FAILURE'
export function parseHash(hash) {
  return async dispatch => {
    try {
      const response = await parseAuthHash(hash)
      localStorage.setItem('accessToken', response.accessToken)
      dispatch({ type: PARSE_HASH_SUCCESS, response })
    } catch (error) {
      dispatch({
        type: PARSE_HASH_FAILURE,
        error: error.description || error.message
      })
    }
  }
}
