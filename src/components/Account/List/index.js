import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Group from './Group'
import './index.css'

class AccountsWidget extends React.Component {
  toggle = group => () => this.props.toggleSectionCollapse(group)

  render() {
    const groups = Object.keys(this.props.groups)

    return (
      <div>
        {groups.length > 0 && (
          <div className="account-widget">
            {groups.map(group => (
              <Group
                key={group}
                baseCurrency={this.props.baseCurrency}
                group={this.props.groups[group]}
                isCollapsed={this.props.collapsedGroups.includes(group)}
                toggleGroupCollapse={this.toggle(group)}
              />
            ))}
          </div>
        )}
        {this.props.withNewButton && (
          <div className="account-widget__new">
            <Button as={Link} to="/accounts/details/new">
              Create New Account
            </Button>
          </div>
        )}
      </div>
    )
  }
}

AccountsWidget.propTypes = {
  withNewButton: PropTypes.bool,
  baseCurrency: PropTypes.string.isRequired,
  groups: PropTypes.objectOf(PropTypes.object).isRequired,
  collapsedGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleSectionCollapse: PropTypes.func.isRequired
}

export default AccountsWidget
