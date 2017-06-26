import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'
import Logo from '../components/Logo/index'
import routes from '../router/routes'
import { toggleSidebar } from '../actions/ui/sidebar'

const SidebarMenu = ({ toggleSidebar }) => (
  <nav>
    <Menu fluid color="blue" vertical icon="labeled">
      <Logo />
      {routes.map(route => (
        <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          children={({ match }) => (
            <Menu.Item
              as={Link}
              to={route.path}
              active={!!match}
              onClick={toggleSidebar}
            >
              <Icon name={route.icon} />{route.label}
            </Menu.Item>
          )}
        />
      ))}
    </Menu>
  </nav>
)

SidebarMenu.propTypes = {
  toggleSidebar: PropTypes.func
}

const mapStateToProps = state => ({
  isSidebarOpen: state.ui.isSidebarOpen
})

export default connect(mapStateToProps, { toggleSidebar })(SidebarMenu)
