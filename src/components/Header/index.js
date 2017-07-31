import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Header } from 'semantic-ui-react'
import { toggleSidebar } from '../../actions/ui/sidebar'
import { startSync } from '../../actions/sync'
import './index.css'

const AppHeader = ({
  label,
  isMobile,
  isAuthenticated,
  isSyncRunning,
  hasPendingChanges,
  toggleSidebar,
  startSync
}) => (
  <header>
    <Header>
      {isMobile && <Icon name="bars" onClick={toggleSidebar} />}
      <Header.Content as="h2">{label}</Header.Content>
      {isAuthenticated &&
        (isSyncRunning
          ? <Icon name="refresh" loading />
          : <Icon
              name="refresh"
              color={hasPendingChanges ? 'olive' : undefined}
              onClick={startSync}
              style={{ cursor: 'pointer' }}
            />)}
    </Header>
  </header>
)

AppHeader.propTypes = {
  label: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  isSyncRunning: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  startSync: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isMobile: state.ui.isMobile,
  isAuthenticated: state.user.isAuthenticated,
  isSyncRunning: state.sync.isRunning,
  hasPendingChanges: state.sync.hasPendingChanges
})

export default connect(mapStateToProps, { toggleSidebar, startSync })(AppHeader)
