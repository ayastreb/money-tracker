import { connect } from 'react-redux'
import Auth from '../../components/Auth'
import {
  changeEmail,
  changeCode,
  sendCode,
  verifyCode,
  finishAuth
} from '../../actions/ui/form/auth'
import { getAuthForm } from '../../selectors/ui/form/auth'
import { isUserAuthenticated } from '../../selectors/user'

const mapStateToProps = state => ({
  ...getAuthForm(state),
  isAuthenticated: isUserAuthenticated(state)
})

export default connect(mapStateToProps, {
  changeEmail,
  changeCode,
  sendCode,
  verifyCode,
  finishAuth
})(Auth)
