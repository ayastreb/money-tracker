import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'
import Logo from '../components/Logo/index'
import routes from '../router/routes'

const SidebarMenu = () => (
  <nav>
    <Menu fluid color="blue" vertical icon="labeled">
      <Logo />
      {routes.map(route => (
        <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          children={({ match }) => (
            <Menu.Item as={Link} to={route.link || route.path} active={!!match}>
              <Icon name={route.icon} />
              {route.label}
            </Menu.Item>
          )}
        />
      ))}
    </Menu>
  </nav>
)

export default SidebarMenu
