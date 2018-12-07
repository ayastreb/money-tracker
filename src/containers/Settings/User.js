import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Popup, Button } from 'semantic-ui-react';
import { signOut } from 'features/user/state/ui/SignOut.action';
import { isSignedIn, isDemoUser } from 'features/user/state/User.selector';

class User extends React.Component {
  render() {
    if (this.props.isSignOutComplete) return <Redirect to="/" />;

    return (
      <Popup
        on="click"
        trigger={
          <Button
            content={this.signOutButtonLabel()}
            icon={this.signOutButtonIcon()}
            labelPosition="right"
          />
        }
        header="Local data will de deleted!"
        content={
          <Button
            content="Confirm"
            negative
            style={{ marginTop: '1em' }}
            floated="right"
            loading={this.props.isSignOutRunning}
            disabled={this.props.isSignOutRunning}
            onClick={this.props.signOut}
          />
        }
      />
    );
  }

  signOutButtonLabel() {
    if (this.props.isDemo) return 'Reset demo';

    return this.props.isAuthenticated ? 'Sign out' : 'Delete data';
  }

  signOutButtonIcon() {
    if (this.props.isDemo) return 'refresh';

    return this.props.isAuthenticated ? 'sign out' : 'trash';
  }
}

User.propTypes = {
  isDemo: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  isSignOutRunning: PropTypes.bool,
  isSignOutComplete: PropTypes.bool,
  signOut: PropTypes.func
};

const mapStateToProps = state => ({
  isDemo: isDemoUser(state),
  isAuthenticated: isSignedIn(state),
  isSignOutRunning: state.user.ui.signOut.signOutState === 'REQUEST',
  isSignOutComplete: state.user.ui.signOut.signOutState === 'COMPLETE'
});

export default connect(
  mapStateToProps,
  { signOut }
)(User);
