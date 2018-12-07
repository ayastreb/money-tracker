import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { dismissSyncWarning } from '../actions/ui/sync';
import { isSignedIn } from 'features/user/state/User.selector';

class SyncWarning extends React.Component {
  render() {
    if (!this.props.isVisible) return null;

    return (
      <Message warning size="large" onDismiss={this.props.dismissSyncWarning}>
        <Message.Header>No Synchronization</Message.Header>
        <Message.Content>
          Your data is stored only on this device and might be lost when browser
          storage is cleared.
        </Message.Content>
        <Message.Content>
          <Link to="/auth">Sign in</Link> if you want to sync your data with the
          cloud and be able to access it from multiple devices.
        </Message.Content>
      </Message>
    );
  }
}

SyncWarning.propTypes = {
  isVisible: PropTypes.bool
};

const mapStateToProps = state => ({
  isVisible: !isSignedIn(state) && state.ui.sync.isWarningVisible
});

export default connect(
  mapStateToProps,
  { dismissSyncWarning }
)(SyncWarning);
