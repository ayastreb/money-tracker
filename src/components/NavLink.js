import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'

const NavLink = ({ label, to, icon, exact = false }) => (
  <Route
    exact={exact}
    path={to}
    children={({ match }) => (
      <Menu.Item as={Link} to={to} active={!!match}>
        <Icon name={icon} />{label}
      </Menu.Item>
    )}
  />
)

NavLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  exact: PropTypes.bool
}

export default NavLink
