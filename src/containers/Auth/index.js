import { connect } from 'react-redux'
import Auth from '../../components/Auth/index'
import {
  changeEmail,
  changeCode,
  sendCode,
  verifyCode,
  finishAuth
} from '../../actions/ui/auth'

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  isSendingCode: state.ui.auth.isSendingCode,
  isCodeSent: state.ui.auth.isCodeSent,
  isVerifyingCode: state.ui.auth.isVerifyingCode,
  isCodeValid: state.ui.auth.isCodeValid,
  error: state.ui.auth.error,
  email: state.ui.auth.email,
  code: state.ui.auth.code
})

export default connect(mapStateToProps, {
  changeEmail,
  changeCode,
  sendCode,
  verifyCode,
  finishAuth
})(Auth)
