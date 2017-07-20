import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Popup, Header } from 'semantic-ui-react'
import { toggleSidebar } from '../../actions/ui/sidebar'
import './index.css'

const AppHeader = ({ label, isMobile, isSyncRunning, toggleSidebar }) => (
  <header>
    <Header>
      {isMobile && <Icon name="bars" onClick={toggleSidebar} />}
      <Header.Content as="h2">{label}</Header.Content>
      <Popup
        hideOnScroll
        trigger={<Icon name={isSyncRunning ? 'world' : 'warning circle'} />}
        content={isSyncRunning ? 'Sync is online' : 'Sync is offline'}
      />
    </Header>
  </header>
)

AppHeader.propTypes = {
  label: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
  isSyncRunning: PropTypes.bool,
  toggleSidebar: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isMobile: state.ui.isMobile,
  isSyncRunning: state.ui.isSyncRunning
})

export default connect(mapStateToProps, { toggleSidebar })(AppHeader)
