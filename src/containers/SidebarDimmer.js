import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer } from 'semantic-ui-react'
import { toggleSidebar } from '../actions/ui/sidebar'

const SidebarDimmer = ({ isMobile, isSidebarOpen, toggleSidebar }) => (
  <Dimmer active={isMobile && isSidebarOpen} onClick={toggleSidebar} />
)

SidebarDimmer.propTypes = {
  isMobile: PropTypes.bool,
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func
}

const mapStateToProps = state => ({
  isMobile: state.ui.isMobile,
  isSidebarOpen: state.ui.isSidebarOpen
})

export default connect(mapStateToProps, { toggleSidebar })(SidebarDimmer)
