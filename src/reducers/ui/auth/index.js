import {
  CHANGE_EMAIL,
  CHANGE_CODE,
  SEND_CODE_REQUEST,
  SEND_CODE_SUCCESS,
  SEND_CODE_FAILURE,
  VERIFY_CODE_REQUEST,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAILURE
} from '../../../actions/ui/auth'

export default function(
  state = {
    error: null,
    email: '',
    code: '',
    isSendingCode: false,
    isCodeSent: false,
    isVerifyingCode: false,
    isCodeValid: false
  },
  action
) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return { ...state, email: action.email }
    case CHANGE_CODE:
      return { ...state, code: action.code }
    case SEND_CODE_REQUEST:
      return { ...state, isSendingCode: true }
    case SEND_CODE_SUCCESS:
      return { ...state, isSendingCode: false, isCodeSent: true }
    case SEND_CODE_FAILURE:
      return { ...state, isSendingCode: false, error: action.error }
    case VERIFY_CODE_REQUEST:
      return { ...state, isVerifyingCode: true }
    case VERIFY_CODE_SUCCESS:
      return { ...state, isVerifyingCode: false, isCodeValid: true }
    case VERIFY_CODE_FAILURE:
      return { ...state, isVerifyingCode: false, error: action.error }
    default:
      return state
  }
}
