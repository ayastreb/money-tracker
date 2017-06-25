import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Header } from 'semantic-ui-react'
import { toggleSidebar } from '../../actions/ui/sidebar'
import './index.css'

const AppHeader = ({ label, isMobile, toggleSidebar }) => (
  <header>
    <Header>
      {isMobile && <Icon name="bars" onClick={toggleSidebar} />}
      <Header.Content as="h2">{label}</Header.Content>
    </Header>
  </header>
)

AppHeader.propTypes = {
  label: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
  toggleSidebar: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isMobile: state.ui.isMobile
})

export default connect(mapStateToProps, { toggleSidebar })(AppHeader)
