import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { dismissSyncWarning } from '../actions/ui/syncWarning'

class SyncWarning extends React.Component {
  render() {
    if (!this.props.isVisible) return null

    return (
      <Message warning size="large" onDismiss={this.props.dismissSyncWarning}>
        <Message.Header>No Synchronization</Message.Header>
        <Message.Content>
          Your data is only stored on this device and might be lost when
          browser storage is cleared.
        </Message.Content>
        <Message.Content>
          <Link to="/auth">Sign in</Link>
          {' '}
          if you want to sync your data to the cloud and be able
          to access it from multiple devices.
        </Message.Content>
      </Message>
    )
  }
}

SyncWarning.propTypes = {
  isVisible: PropTypes.bool
}

const mapStateToProps = state => ({
  isVisible: !state.ui.isSyncRunning && state.ui.isSyncWarningVisible
})

export default connect(mapStateToProps, { dismissSyncWarning })(SyncWarning)
