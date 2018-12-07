import { connect } from 'react-redux';
import SignIn from 'features/user/components/SignIn';
import {
  changeEmail,
  changeCode,
  sendCode,
  verifyCode,
  finishAuth
} from 'features/user/state/ui/SignIn.action';
import { RootStateT } from 'reducers';

const mapStateToProps = ({ user }: RootStateT) => ({
  ...user.ui.signIn,
  isSignedIn: user.isSignedIn
});

export default connect(
  mapStateToProps,
  {
    changeEmail,
    changeCode,
    sendCode,
    verifyCode,
    finishAuth
  }
)(SignIn);
